<!--全国疫情分布表格-->

<template>
  <div id="distribution-table">
    <ul class="table-header tab-control tabControl2">
      <li class="item-stress tab-control-item tab-area">地区</li>
      <li class="item-stress tab-control-item tab-increase">新增</li>
      <li class="tab-control-item tab-definite">确诊</li>
      <li class="tab-control-item tab-heal">治愈</li>
      <li class="tab-control-item tab-dead">死亡</li>
    </ul>
    <ul class="table-body">
      <li v-for="item in mychildren" class="table-province">
        <div class="item-stress">{{item.name}}</div>
        <div class="item-stress">{{item.add}}</div>
        <div>{{item.confirm}}</div>
        <div>{{item.heal}}</div>
        <div>{{item.dead}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "distributionTable",
    props:{
      mychildren:{
        type: Array,
        default: []
      }
    }
  }
</script>

<style lang="stylus">
  #distribution-table
    padding 0 15px;

  .table-header
    display flex

    > li
      flex 1
      text-align center
      font-size 14px
      height 35px
      line-height 35px
      margin-right 2px

    .tab-area
      background-color #DBEFF8

    .tab-increase
      background-color #ffeed9

    .tab-definite
      background-color #fde4e1

    .tab-heal
      background-color #dfeee6

    .tab-dead
      background-color #eee

  .table-body
    > li
      width 100%
      border-bottom 1px solid #F8F8F8
      font-size 0

      > div
        display inline-block
        width 20%
        text-align center
        font-size 14px
        height 40px
        line-height 40px

    .table-province
      background-color #F8F8F8

      > div
        font-size 14px

  .item-stress
    color #005DFF

</style>