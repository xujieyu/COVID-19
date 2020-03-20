<template>
  <van-popup
          v-model="openShow"
          position="center"
          @close="doClose"
          closeable
          close-icon="close"
          :style="{width: '80%'}">
    <div style="text-align: left; font-size: 20px; padding-left: 2px ">
      <div style="color: #2b70c7;">1. 数据来源：</div>
      <div>数据同步获取自(<a href="https://github.com/canghailan/Wuhan-2019-nCoV">[Wuhan-2019-nCoV]</a>项目</div>
      <br>
      <div style="color: #2b70c7">2. 数据描述:</div>
      <div>
        a) 每日精确到国家、省、市的确诊、疑似、治愈、死亡人数。<br>

        b) 2019-12-01至2020-01-02数据来自asycns提供的实验室确诊数据。<br>

        c) 2020-01-02至2020-01-10数据无变化。<br>

        d) 2020-01-10至2020-02-06数据来自国家、各省、武汉市卫健委疫情通告。<br>

        e) 2020-02-07后数据从今日头条接口采集，每小时57分自动更新。<br>

        d) 国家、省级历史数据会根据卫健委数据更新，市级历史数据有差异（略小于）。
      </div>
    </div>
  </van-popup>
</template>

<script>
  export default {
    name: "dataSource",
    props: ["show"],
    data() {
      return {
        openShow: this.show
      }
    },
    watch: {
      show(val) {
        this.openShow = val
      }
    },
    methods: {
      doClose() {
        console.log("close")
        this.$emit('openShow', false)
      }
    }
  }
</script>

<style lang="stylus">

</style>