<template>
  <van-popup class="popup"
          v-model="openShow"
          position="center"
          @close="doClose"
          closeable
          close-icon="close">
    <div class="popup-content" v-for="item in dataSource">
      <div class="popup-title">{{item.title}}</div>
      <div v-for="detail in item.content">
        <div v-html="detail">{{detail}}</div>
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
        openShow: this.show,
        dataSource: [
          {
            'title': '1. 数据来源：',
            'content': ['数据同步获取自(<a href="https://github.com/canghailan/Wuhan-2019-nCoV">[Wuhan-2019-nCoV]</a>项目'],
          },
          {
            'title': '2. 数据描述:',
            'content': [
              'a) 每日精确到国家、省、市的确诊、疑似、治愈、死亡人数。',
              'b) 2019-12-01至2020-01-02数据来自asycns提供的实验室确诊数据。 ',
              'c) 2020-01-02至2020-01-10数据无变化。',
              'd) 2020-01-10至2020-02-06数据来自国家、各省、武汉市卫健委疫情通告。',
              'e) 2020-02-07后数据从今日头条接口采集，每小时57分自动更新。',
              'd) 国家、省级历史数据会根据卫健委数据更新，市级历史数据有差异（略小于）。',
            ],
          }
        ]
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
  .popup
    width 80%
    height 30%
    max-width 400px !important
    .popup-content
      text-align left
      font-size 14px
      padding 5Px 5Px
      a
        color #005dff

    .popup-title
      color #005dff
      font-size 18px
</style>