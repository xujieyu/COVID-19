<template>
  <div id="mytable" >
    <ul class="table-header">
      <li class="item-stress">地区</li>
      <li class="item-stress">昨日新增</li>
      <li>累计确诊</li>
      <li>累计治愈</li>
      <li>累计死亡</li>
    </ul>
    <ul class="table-body">
      <li v-for="item in mychildren" class="table-province" >
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
    name: "mytable",
    props:{
      mychildren:{
          type: Array,
          default: []
      }
    }
  }
</script>

<style lang="stylus">
  #mytable
    padding  0 15px;
  .table-header
    // padding: 0 15px
    display flex
    > li
      flex 1
      text-align center
      font-size 14px
      height 45px
      line-height 45px
  .table-body
    li
      width 100%
      border-bottom 1px solid #F8F8F8
      font-size 0
      > div
        display inline-block
        width 20%
        text-align center
        font-size 12px
        height 40px
        line-height 40px
    .table-province
      background-color #F8F8F8
      // padding: 0 15px
      > div
        font-size 14px
  .item-stress
    color #005DFF

</style>