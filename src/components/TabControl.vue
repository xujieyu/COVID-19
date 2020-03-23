<!-- 控制显示的 Tab-->

<template>
  <div id="tab-control">
    <div class="tab-control" :class="{'floatType': isFloat}">
      <div class="tab-control-item"
           v-for="(tab,index) in tabs"
           v-bind:key="tab.name"
           v-bind:class="[{ active: currentTab === tab.name}]"
           v-on:click="changeLoc(index)">
        <span>{{tab.value}}</span>
      </div>
    </div>
    <summaryTable :allSelect="info.allselect" :total="info.total" :china-info="info.china_info" :province="info.provinceName" @selectChange="selectCity"></summaryTable>
    <tabDetail :childInfo="info" class="tab" id="page0"></tabDetail>
    <tabTrend :childInfo="info" class="tab" id="page1"></tabTrend>
    <div id="page2"  class="tab">
      <tabHospital :childInfo="info" ></tabHospital>
      <preventionKnowledge></preventionKnowledge>
    </div>


  </div>
</template>

<script>
  import summaryTable from "./summaryTable";
  import tabDetail from "./tabDetail"
  import tabTrend from "./tabTrend.vue"
  import tabHospital from "./tabHospital";
  import preventionKnowledge from "./preventionKnowledge";


  export default {
    name: "tabControl",
    components: {
      summaryTable,
      tabDetail,
      tabTrend,
      tabHospital,
      preventionKnowledge
    },
    props: {
      info:{
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        isFloat: false,
        currentTab: 'detail',
        tabTopOffset: 0,
        tabs: [
          {
            name: 'detail',
            value: "疫情详情",
          },
          {
            name: 'trend',
            value: "疫情趋势",
          },
          {
            name: 'hospital',
            value: "医疗信息",
          }
        ],
        detailInfo:{},
        trendInfo:{},
        childrenInfo:{},
      }
    },
    computed: {
      currentTabComponent: function () {
        switch (this.currentTab) {
          case "detail":
            this.detailInfo.mapInfo = this.info.mapInfo;
            this.detailInfo.children = this.info.children;
            this.childrenInfo = this.detailInfo;
            return tabDetail;
          case "trend":
            this.trendInfo.province = this.info.province;
            this.childrenInfo = this.trendInfo;
            return tabTrend;
          default:
            return tabHospital
        }
      }
    },
    mounted() {
      this.tabTopOffset = document.querySelector('.tab-control').offsetTop;
      window.addEventListener('scroll', this.handleScroll)

    },
    methods:{
      selectCity(city){
          this.$emit('changeProvince', city);
      },
      changeLoc(index){
        this.currentTab = this.tabs[index].name;
        let PageId = document.querySelector('#page' + index);
        window.scrollTo({
          'top': PageId.offsetTop - 40,
          'behavior': 'smooth'
        })
      },
      handleScroll () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        let TabId = document.querySelector('.tab-control');
        let Page1Id = document.querySelector('#page1' );
        let Page2Id = document.querySelector('#page2');
        if(scrollTop > this.tabTopOffset){
          this.isFloat = true;
        }
        else{
          this.isFloat = false;
        }
        if(scrollTop < (Page1Id.offsetTop - 40)){
          this.currentTab = this.tabs[0].name;
        }
        else if(scrollTop >= (Page1Id.offsetTop - 40) && scrollTop < (Page2Id.offsetTop - 40) ){
          this.currentTab = this.tabs[1].name;
        }
        else if(scrollTop >= (Page2Id.offsetTop - 40)){
          this.currentTab = this.tabs[2].name;
        }
      },
    }
  }
</script>

<style lang="stylus">
  .tab-control
    position sticky
    top 0
    display flex
    text-align center
    height 40px
    line-height 40px
    font-size 24px
    background-color #fff
    z-index 10
    margin-top 10px

    .tab-control-item
      flex 1

      span
        padding 5px

    .active
      color #2b70c7

      span
        border-bottom 2px solid #2b70c7

  .floatType
    background-color #2b70c7
    .tab-control-item
      color #fff
    .active
      color #fff
      span
        border-bottom 2px solid #fff

  .tabControl2
    top 40px
    z-index 9

  .tab-content
    background-color #fff
    /*position relative*/
    border-radius 10px
    margin -10px 0 15px
    padding 10px 10px 18px
  #page0
    margin-bottom 40px
  #page1
    padding  15px 15px

</style>