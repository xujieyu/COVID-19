<template>
  <div class="photo data-statement">
    <div class="name-title">新型冠状病毒</div>
    <div class="monitor-title"><span>肺炎疫情实时监控</span></div>
    <div class="update-time">截止 {{time}}</div>
  </div>
</template>

<script>
  export default {
    name: "headerDiagram",
    props: {
      time:{
        type: String,
        default: ''
      }
    },
    data() {
      return {
        show: false,
      }
    }
  }
</script>

<style lang="stylus">

  .photo
    text-align left;
    margin 0 10px
    height 150px
    background url("https://xujieyu-1301584958.cos.ap-guangzhou.myqcloud.com/virus.png") no-repeat
    background-position right
    background-size 140px 140px

  .data-statement
    background-color #215fb5
    position relative
    text-align left
    padding 15px 15px
    padding-top 40px
    width 100%
    margin 0

    .name-title
      color #ede3e6
      font-size 20px

    .statement-title
      font-size 20px
      font-weight bold

    .monitor-title
      font-size 30px
      font-weight bold
      background-image linear-gradient(#ede3e6, #79749b)
      -webkit-background-clip text
      color transparent

    .update-time
      font-size 12px
      color #B6B6B6
      font-weight normal
      vertical-align middle
</style>