<template>
  <div class="home">
    <Row>
      <Col :xs="24" :sm="24" :md="8">
        <Card style="margin: 10px">
          <p slot="title">投票狀態</p>
          <VoteStatus :voted="voted"></VoteStatus>
        </Card>
      </Col>
      <Col :xs="24" :sm="24" :md="16">
        <Card style="margin: 10px">
          <p slot="title">得票狀況</p>
          <Candidates :candidates="candidates"
                      ref="candidates">
          </Candidates>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col :xs="24" :sm="24" :md="24">
        <Card style="margin: 10px">
          <p slot="title">錢包</p>
          <List :accounts="list.accounts"
                :loading="list.loading"
                :candidates="candidates"
                @updateVoteStatus="getList"
                @updateCandidate="getCandidates">
          </List>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import List from '@/components/List'
import Candidates from '@/components/Candidates'
import VoteStatus from '@/components/VoteStatus'
import axios from 'axios'

export default {
  name: 'Home',
  data () {
    return {
      candidates: [],
      count: {
        voted: 0
      },
      list: {
        loading: false,
        accounts: []
      },
      voted: {
        yes: 0,
        no: 0,
        percent: 0
      }
    }
  },
  mounted () {
    this.getList()
    this.getCandidates()
  },
  methods: {
    getList () {
      this.list.loading = true
      let no = 0
      let yes = 0
      axios.get(`${process.env.API_HOST}/voters`)
        .then((response) => {
          if (response.data.status === 'Success') {
            this.list.loading = false
            this.list.accounts = response.data.result
            for (let index = 0; index < this.list.accounts.length; index++) {
              if (this.list.accounts[index].voted === true) yes += 1
              else no += 1
            }
            console.log()
            this.voted.percent = parseFloat((yes / (yes + no) * 100).toFixed(2))
            this.voted.yes = yes
            this.voted.no = no
            this.updateVoteStatus()
            this.success('錢包載入成功!', '')
          } else {
            this.error('錢包資訊載入失敗..', '')
          }
        })
        .catch((error) => {
          const errorCode = error.response.status
          if (errorCode === 404) this.error('錢包資訊載入失敗..', 'API 無法正常回應')
        })
    },
    getCandidates () {
      axios.get(`${process.env.API_HOST}/candidate/all`)
        .then((response) => {
          if (response.data.status === 'Success') {
            let votedCount = 0
            let percent = 0
            let candidates = []
            for (let index = 0; index < response.data.result.length; index++) {
              votedCount += response.data.result[index].count
            }
            this.count.voted = votedCount
            for (let index = 0; index < response.data.result.length; index++) {
              if (votedCount === 0) percent = 0
              else percent = parseFloat(((response.data.result[index].count / votedCount) * 100).toFixed(2))
              candidates.push({
                'name': response.data.result[index].name,
                'percent': percent
              })
            }
            this.candidates = candidates
            this.success('得票狀況載入成功!', '')
          } else {
            this.error('得票狀況載入失敗..', 'API 回應狀態錯誤')
          }
        })
        .catch((error) => {
          const errorCode = error.response.status
          if (errorCode === 404) this.error('得票狀況載入失敗..', 'API 無法正常回應')
        })
    },
    success (title, desc) {
      this.$Notice.success({
        title: title,
        desc: desc
      })
    },
    error (title, desc) {
      this.$Notice.error({
        title: title,
        desc: desc
      })
    }
  },
  components: {
    List,
    Candidates,
    VoteStatus
  }
}
</script>
