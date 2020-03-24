<template>
  <div>
    <div class="city-tab">
      <div class="total-statement">
        <div class="total-title">
          <span class="total-title-area">{{province}}</span> 疫情状况
          <span class="data-source-icon" @click="openDataSource"></span>
        </div>
        <citySelection :items="allSelect" @selectedCity="selectedCity"></citySelection>
      </div>
      <dataSource v-bind:show="isOpenDataSource" @openShow="closeDataSource"></dataSource>
      <div v-if="province === '全国'">
        <div class="summary">
          <div class="confirm item">
            <summaryCard :is-show= true title="确诊" v-bind:increase=chinaInfo.china_add.confirmed v-bind:total=chinaInfo.china_total.confirmed></summaryCard>
          </div>
          <div class="suspect item">
            <summaryCard :is-show= true title="疑似" v-bind:increase=chinaInfo.china_add.suspected v-bind:total=chinaInfo.china_total.suspected></summaryCard>
          </div>
          <div class="heal item">
            <summaryCard :is-show= true title="治愈" v-bind:increase=chinaInfo.china_add.cured v-bind:total=chinaInfo.china_total.cured></summaryCard>
          </div>
          <div class="dead item">
            <summaryCard :is-show= true title="死亡" v-bind:increase=chinaInfo.china_add.dead v-bind:total=chinaInfo.china_total.dead></summaryCard>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="summary">
          <div class="confirm">
            <summaryCard :is-show= false title="新增确诊" v-bind:total=total.addNum></summaryCard>
          </div>
          <div class="suspect">
            <summaryCard :is-show= false title="累计确诊" v-bind:total=total.confirm></summaryCard>
          </div>
          <div class="heal">
            <summaryCard :is-show= false title="累计治愈" v-bind:total=total.heal></summaryCard>
          </div>
          <div class="dead">
            <summaryCard :is-show= false title="累计死亡" v-bind:total=total.dead></summaryCard>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import summaryCard from "./summaryCard";
  import dataSource from "./dataSource";
  import citySelection from "./citySelection";

  export default {
    name: "summaryTable",
    components: {
      summaryCard,
      dataSource,
      citySelection,
    },
    props:{
      allSelect:{
        type: Array,
        default:[]
      },
      total:{
        type: Object,
        default: {}
      },
      chinaInfo:{
        type: Object,
        default: {}
      },
      province:{
        type: String,
        default: '全国'
      }
    },
    data() {
      return {
        currentCity: "全国",
        definite: {
          total: 0,
          increase: 0,
        },
        suspected: {
          total: 0,
          increase: 0,
        },
        heal: {
          total: 0,
          increase: 0,
        },
        dead: {
          total: 0,
          increase: 0,
        },
        isOpenDataSource: false,
      }
    },
    mounted() {
      window.addEventListener('scroll', this.changeWidth)
    },
    methods: {
      openDataSource() {
        this.isOpenDataSource = true;
      },
      closeDataSource(data) {
        this.isOpenDataSource = data;
      },
      selectedCity(data) {
        console.log(data);
        this.currentCity = data;
        this.$emit('selectChange', data);
      },
      changeWidth(){

      }
    }
  }
</script>

<style lang="stylus">
  .city-tab
    margin-top: 20px

  .total-statement
    display flex
    justify-content space-between
    margin 15px 15px

    .total-title
      height 28Px
      font-size 24px
      line-height 28Px

      .total-title-area
        color #2b70c7

    .switch-city-btn:after
      display inline-block
      margin-left .255em
      vertical-align .255em
      content ""
      border-top .3em solid
      border-right .3em solid transparent
      border-bottom 0
      border-left .3em solid transparent


    .switch-city-btn
      border 1px solid transparent
      padding .375rem .75rem
      font-size 0.8rem
      color #fff
      background-color #4b7ac7
      border-radius .25rem

    .data-source-icon
      transform: translate(0, -50%)
      top: 20px
      white-space: nowrap
      color: #737373
      margin-left: 1px
      padding-left 16px
      background: url(https://xujieyu-1301584958.cos.ap-guangzhou.myqcloud.com/icon_qs.png) no-repeat left center
      background-size: 12Px 12Px

  .summary
    display flex
    flex-wrap wrap
    padding 20px 20px

    .number
      font-size 20px
      font-weight bold
      padding 8px 5px 5px 5px

    .small-number
      font-size 12px

    .tag
      height 35px
      line-height 35px
      font-size 20px

    .tip
      font-size 12px
      padding-top 10px
      color #8B8989

    .confirm
      background-color #FDF1F1
      border-radius 8px 0 0 8px
      margin-right 2px

      .tag
        background-color #fde4e1

      .number, .small-number
        color #d84641

    .suspect
      background-color #FFF7ED
      margin-right 2px

      .tag
        background-color #FFEED9

      .number, .small-number
        color #F7AB1A

    .heal
      background-color #F1F8F4
      margin-right 2px

      .tag
        background-color #DFEEE6

      .number, .small-number
        color #49708b

    .dead
      background-color #F8F8F8
      border-radius 0 8px 8px 0

      .tag
        background-color #EEEEEE

      .number, .small-number
        color #66666C
    > div
      flex 1
      text-align center
      overflow hidden

</style>