<template>
  <div class="candidates">
    <Row style="text-align:center">
      <Col span="24">
        <Col span="6" v-for="object in objects">
          <div style="width: 200px; margin: 10px;" >
            <i-circle :percent="object.percent">
              <span class="demo-Circle-inner" style="font-size:24px">{{ object.percent }}</span>
            </i-circle>
            <h3>{{ object.name}}</h3>
          </div>
        </Col>
      </Col>
      <Col span="24">
        <Page :total="candidates.length" :page-size="pageSize" size="small" @on-change="update" style="margin-top: 10px"></Page>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'Candidates',
  props: ['candidates'],
  data () {
    return {
      pageSize: 4,
      objects: []
    }
  },
  watch: {
    candidates () {
      this.update(1)
    }
  },
  methods: {
    update (page) {
      this.objects = this.candidates.slice((page - 1) * 4, page * 4)
    }
  }
}
</script>