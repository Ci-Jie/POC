<template>
  <div class="table">
    <Table :loading="loading"
            :columns="titles"
            :data="accounts">
    </Table>
    <VoteModal :candidates="candidates"
                @updateCandidate="updateCandidate"
                @updateVoteStatus="updateVoteStatus"
                ref="voteModal">
    </VoteModal>
    <CandidateModal @updateCandidate="updateCandidate"
                    ref="candidateModal">
    </CandidateModal>
  </div>
</template>

<script>
import VoteModal from '@/components/VoteModal'
import CandidateModal from '@/components/CandidateModal'

export default {
  name: 'List',
  props: ['accounts', 'candidates', 'loading'],
  data () {
    return {
      showVote: false,
      titles: [{
        title: '節點',
        key: 'node',
        width: '100px'
      },
      {
        title: '錢包',
        key: 'account',
        width: '400px'
      },
      {
        title: '餘額',
        key: 'balance'
      },
      {
        title: '狀態',
        key: 'voted',
        render: (h, params) => {
          const row = params.row
          const color = row.voted === true ? 'green' : 'red'
          const text = row.voted === true ? '已投票' : '尚未投票'
          return h('Tag', {
            props: {
              type: 'dot',
              color: color
            }
          }, text)
        }
      }, {
        title: '操作',
        key: 'action',
        width: '250px',
        align: 'center',
        render: (h, params) => {
          const row = params.row
          const disabled = row.voted
          return h('div', [
            h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.$refs.candidateModal.account = this.accounts[params.index].account
                  this.$refs.candidateModal.modal = true
                }
              }
            }, '新增候選人'),
            h('Button', {
              props: {
                type: 'primary',
                size: 'small',
                disabled: disabled
              },
              on: {
                click: () => {
                  this.$refs.voteModal.voter.account = this.accounts[params.index].account
                  this.$refs.voteModal.modal = true
                }
              }
            }, '投票')
          ])
        }
      }]
    }
  },
  methods: {
    updateCandidate () {
      this.$emit('updateCandidate')
    },
    updateVoteStatus () {
      this.$emit('updateVoteStatus')
    }
  },
  components: {
    VoteModal,
    CandidateModal
  }
}
</script>
