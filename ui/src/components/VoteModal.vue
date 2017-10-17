<template>
  <div class="voteModal">
    <modal
      v-model="modal"
      title="投票"
      ok-text="確定"
      cancel-text="取消"
      @on-ok="exec"
      @on-cancel="cancel"
      :loading="true">
      <Form :label-width="80">
        <FormItem label="錢包帳號：">
          <Input type="text" v-model="voter.account" :readonly="true"></Input>
        </FormItem>
        <FormItem label="密碼：">
          <Input type="password" v-model="voter.password"></Input>
        </FormItem>
        <FormItem label="候選人">
          <Select v-model="voter.candidate" placeholder="請選擇">
            <Option v-for="candidate in candidates" :value="candidate.name">{{ candidate.name }}</Option>
          </Select>
        </FormItem>
      </Form>
    </modal>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'VoteModal',
  props: ['candidates'],
  data () {
    return {
      modal: false,
      voter: {
        account: '',
        password: '',
        candidate: ''
      }
    }
  },
  methods: {
    exec () {
      axios.post(`${process.env.API_HOST}/vote`, {
        account: this.voter.account,
        candidateName: this.voter.candidate,
        password: this.voter.password
      }, {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
      .then((response) => {
        if (response.data.status === 'Success') {
          this.success('投票成功!', '')
          this.modal = false
          this.$emit('updateCandidate')
          this.$emit('updateVoteStatus')
        } else {
          this.error('投票失敗..', 'API 回應狀態錯誤!')
        }
        this.init()
      })
      .catch((error) => {
        const errorCode = error.response.status
        if (errorCode === 401) this.error('投票失敗..', '錢包驗證錯誤!')
        else if (errorCode === 409) this.error('投票失敗..', '你已經投過票了!')
        else if (errorCode === 404) this.error('投票失敗..', '錢包餘額不足!')
        this.modal = false
        this.init()
      })
    },
    cancel () {
      this.init()
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
    },
    init () {
      this.voter.candidate = ''
      this.voter.password = ''
    }
  }
}
</script>