<template>
  <div class="voteStatus">
    <Row>
      <Col span="12">
        <div style="width: 200px; margin: 10px; text-align:center" >
          <i-circle :percent="voted.percent" stroke-color="#ff5500">
            <span class="demo-Circle-inner" style="font-size:24px;">
              {{ voted.percent }}
            </span>
          </i-circle>
          <h3>投票率</h3>
        </div>
      </Col>
      <Col span="12">
        <div style="margin-left: 20px">
          <Tag type="dot" color="green">已投票： {{ voted.yes }} 人</Tag>
          <Tag type="dot" color="red">未投票： {{ voted.no }} 人</Tag>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'VoteStatus',
  props: ['voted'],
  data () {
    return {}
  }
}
</script>
