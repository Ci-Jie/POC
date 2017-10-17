<template>
  <div class="candidateModal">
    <modal
      v-model="modal"
      title="新增候選人"
      ok-text="確定"
      cancel-text="取消"
      @on-ok="exec"
      @on-cancel="cancel"
      :loading="loading">
      <Form :label-width="100">
        <FormItem label="錢包帳號：">
          <Input type="text" v-model="account" :readonly="true"></Input>
        </FormItem>
        <FormItem label="錢包密碼：">
          <Input type="password" v-model="voter.password"></Input>
        </FormItem>
        <FormItem label="候選人姓名：">
          <Input type="text" v-model="candidate.name"></Input>
        </FormItem>
      </Form>
    </modal>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CandidateModal',
  data () {
    return {
      loading: true,
      modal: false,
      account: '',
      voter: {
        password: ''
      },
      candidate: {
        name: ''
      }
    }
  },
  methods: {
    exec () {
      axios.post(`${process.env.API_HOST}/candidate/add`, {
        account: this.account,
        candidateName: this.candidate.name,
        password: this.voter.password
      }, {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
      .then((response) => {
        if (response.data.status === 'Success') {
          this.success('新增候選人成功!', '')
          this.modal = false
          this.$emit('updateCandidate')
        } else {
          this.error('新增候選人失敗..', 'API 回應狀態錯誤!')
        }
        this.init()
      })
      .catch((error) => {
        const errorCode = error.response.status
        if (errorCode === 401) this.error('新增候選人失敗..', '錢包驗證錯誤!')
        else if (errorCode === 409) this.error('新增候選人失敗..', '候選人名稱重複!')
        else if (errorCode === 404) this.error('新增候選人失敗..', '錢包餘額不足!')
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
      this.candidate.name = ''
      this.voter.password = ''
    }
  }
}
</script>