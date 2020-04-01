<template>
  <div id="tabTrend">
    <div v-if="childInfo.provinceName === '全国'">
      <div class="myLine" ref="map" ></div>
      <div class="china-info">
        <div class="china-item"
             :class="{active: currentIndex === index}"
             @click="itemClick(index)"
             v-for="(item, index) in list1">
          <span>{{item}}</span>
        </div>
      </div>
      <div class="myLine" ref="map2" ></div>
      <div class="china-info">
        <div class="hubei-item"
             :class="{active: hubeiIndex === index}"
             @click="hubeiClick(index)"
             v-for="(item, index) in list2">
          <span>{{item}}</span>
        </div>
      </div>

    </div>
    <div v-else>
      <div class="myLine" ref="map11" ></div>
    </div>


  </div>

</template>

<script>
  import {getProvinceMultidata, getHubeiMultidata} from '../network/home';
  import {buildLineConfig,buildLineAdd,buildLineAHubei,buildHealConfig,buildAddHubei,buildLineProvince,buildTodayConfig,buildDeadHubei,buildHealHubei} from "./config_line"
  import {getPinyinByName} from "../network/zhen";
  export default {
    name: "tabTrend",
    props: {
      childInfo:{
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        currentIndex: 0,
        hubeiIndex: 0,
        list1: ['每日变化趋势', '现有变化趋势', '累计变化趋势'],
        list2: ['每日确诊', '累计确诊', '治愈病例', '死亡病例'],
        chinaOption: {},
        chinaAddOption: {},
        hubeiOption: {},
        addHubeiOption: {},
        hubeiDeadOption: {},
        hubeiHealOption: {},
        deadOption: {},
        provinceOption: {},
        todayOption: {},

      }
    },
    mounted() {
      this.mapEchartsInit();
      window.addEventListener("resize",this.changeSize);
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index;
        if (index === 0) {
          let myChart = echarts.init(this.$refs.map);
          myChart.hideLoading();
          myChart.clear();
          myChart.setOption(this.chinaAddOption);

        }
        if (index === 1) {
          let myChart1 = echarts.init(this.$refs.map);
          myChart1.hideLoading();
          myChart1.clear();
          myChart1.setOption(this.todayOption);
        } else if (index === 2) {
          let myChart2 = echarts.init(this.$refs.map);
          myChart2.hideLoading();
          myChart2.clear();
          myChart2.setOption(this.chinaOption);
        }
      },
      hubeiClick(index) {
        this.hubeiIndex = index;
        if (index === 0) {
          let myChart10 = echarts.init(this.$refs.map2);
          myChart10.hideLoading();
          myChart10.clear();
          myChart10.setOption(this.addHubeiOption);
        }
        if (index === 1) {
          let myChart11 = echarts.init(this.$refs.map2);
          myChart11.hideLoading();
          myChart11.clear();
          myChart11.setOption(this.hubeiOption);
        } else if (index === 2) {
          let myChart2 = echarts.init(this.$refs.map2);
          myChart2.hideLoading();
          myChart2.clear();
          myChart2.setOption(this.hubeiHealOption);
        } else if (index === 3) {
          let myChart3 = echarts.init(this.$refs.map2);
          myChart3.hideLoading();
          myChart3.clear();
          myChart3.setOption(this.hubeiDeadOption);
        }
      },
      changeSize(){
        if(this.childInfo.provinceName === '全国'){
          let myChart1 = echarts.init(this.$refs.map);
          myChart1.resize();
          let myChart4 = echarts.init(this.$refs.map2);
          myChart4.resize();
        }
        else{
          let myChart11 = echarts.init(this.$refs.map11);
          myChart11.resize();
        }
      },
      mapEchartsInit() {
        if (this.childInfo.provinceName === '全国') {
          getHubeiMultidata()
              .then(res => {
                  this.chinaOption = buildLineConfig(res.chinaOption.date, res.chinaOption.confirm, res.chinaOption.dead, res.chinaOption.heal);
                  this.todayOption = buildTodayConfig(res.todayOption.date, res.todayOption.confirm, res.todayOption.suspect);
                  this.deadOption = buildHealConfig(res.todayOption.date, res.todayOption.heal, res.todayOption.dead);
                  this.chinaAddOption = buildLineAdd(res.chinaAddOption.date, res.chinaAddOption.confirm, res.chinaAddOption.suspect, res.chinaAddOption.dead, res.chinaAddOption.heal);
                  this.hubeiOption = buildLineAHubei(res.hubeiConfirmOption.date, res.hubeiConfirmOption.allConfirm, res.hubeiConfirmOption.hubeiConfirm, res.hubeiConfirmOption.notHubeiConfirm);
                  let myChart1 = echarts.init(this.$refs.map);
                  myChart1.hideLoading();
                  myChart1.setOption(this.chinaAddOption);

                  //map4
                  this.addHubeiOption = buildAddHubei(res.hubeiAddConfirmOption.date, res.hubeiAddConfirmOption.allConfirm, res.hubeiAddConfirmOption.hubeiConfirm, res.hubeiAddConfirmOption.notHubeiConfirm);
                  let myChart4 = echarts.init(this.$refs.map2);
                  myChart4.hideLoading();
                  myChart4.setOption(this.addHubeiOption);

                  this.hubeiDeadOption = buildDeadHubei(res.hubeiDeadOption.date, res.hubeiDeadOption.allDead, res.hubeiDeadOption.hubeiDead, res.hubeiDeadOption.notHubeiDead);
                  this.hubeiHealOption = buildHealHubei(res.hubeiHealOption.date, res.hubeiHealOption.allHeal, res.hubeiHealOption.hubeiHeal, res.hubeiHealOptionnotHubeiHeal);
              })
              .catch(function (error) { // 请求失败处理
                console.log(error);
              });
        }
        if (this.childInfo.provinceName !== '全国') {
          getProvinceMultidata(getPinyinByName(this.childInfo.provinceName))
              .then(res => {
                let provinceDate = res.province_add_info.provinceDate;
                let provinceAddConfirm = res.province_add_info.provinceAddConfirm;
                let provinceAddDead = res.province_add_info.provinceAddDead;
                let provinceAddHeal = res.province_add_info.provinceAddHeal;
                this.provinceOption = buildLineProvince(provinceDate, provinceAddConfirm, provinceAddHeal, provinceAddDead);
                let myChart11 = echarts.init(this.$refs.map11);
                myChart11.hideLoading();
                myChart11.setOption(this.provinceOption);
              })
              .catch(function (error) { // 请求失败处理
                console.log(error);
              });
        }
      }
    },
    beforeDestroy() {
      window.removeEventListener("resize",this.changeSize);
    }
  }
</script>

<style scoped>

  .china-info{
    display: flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
  }

  .china-item {
    width: 33%;
    background-color: #f5f6f7;
    border-radius: 5px;
    color: #555;
    font-size: 16px;
    line-height: 40px;
    position: relative;
    margin-right: 5px;
    height: 40px;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }

  .hubei-item {
    width: 25%;
    background-color: #f5f6f7;
    border-radius: 5px;
    color: #555;
    font-size: 16px;
    line-height: 40px;
    position: relative;
    margin-right: 5px;
    height: 40px;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }

  .active{
    background-color: #5480c9;
    color: #fff;
  }

  .myLine {
    table-layout: fixed;
    width: 100%;
    height:600px;
    margin-top: .5rem;
    padding-bottom: .5rem;
    text-align: center;
    border-spacing: 2px 6px;
    font-size: .938rem;
    color: #4d5054;
    border-collapse: collapse;
  }
  [v-cloak] {
    display: none;
  }
</style>