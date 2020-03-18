<template>
  <div id="allLine">
    <div v-if="province == '全国'">
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
    <div v-else="province != '全国'">
      <div class="myLine" ref="map11" ></div>
    </div>


  </div>
  
</template>

<script>
  import {getLineMultidata, getProvinceMultidata, getHubeiMultidata} from '../../network/home';
  import {buildLineConfig,buildLineAdd,buildLineAHubei,buildHealConfig,buildAddHubei,buildLineProvince,buildTodayConfig,buildDeadHubei,buildHealHubei} from "./config_line"
  import {getPinyinByName} from "../zhen";
  export default {
    name: "allLine",
    props: {
      province: {
        type: String,
        default: '全国'
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
      mapEchartsInit() {
        if (this.province == '全国') {
          getHubeiMultidata()
              .then(res => {
                if (this.province == '全国') {
                  let date = [];
                  let dataConfirm = [];
                  let dataSuspect = [];
                  let dataDead = [];
                  let dataHeal = [];
                  let todayConfirm = [];
                  let todaySuspect = [];
                  let addDate = [];
                  let addConfirm = [];
                  let addSuspect = [];
                  let addDead = [];
                  let addHeal = [];
                  let hubeiAllConfirm = [];
                  let hubeiAddConfirm = [];
                  let hubeiAllDead = [];
                  let hubeiAllHeal = [];
                  let hubeiDate = [];
                  let hubei = [];
                  let notHubei = [];
                  let hubeiDead = [];
                  let notHubeiDead = [];
                  let hubeiHeal = [];
                  let notHubeiHeal = [];
                  let addHubeiDate = [];
                  let addHubei = [];
                  let addNotHubei = [];
                  res.forEach(item => {
                    if (item.countryCode == "CN" && item.provinceCode == '') {
                      date.push(item.date);
                      dataConfirm.push(item.confirmed);
                      dataSuspect.push(item.suspected);
                      dataDead.push(item.dead);
                      dataHeal.push(item.cured);
                      todayConfirm.push(item.confirmed - item.dead - item.cured);
                      todaySuspect.push(item.suspected);
                    }
                    if (item.countryCode == "CN" && item.provinceCode == '420000' && item.city == '') {
                      hubeiDate.push(item.date);
                      hubei.push(item.confirmed);
                      hubeiDead.push(item.dead);
                      hubeiHeal.push(item.cured);
                    }
                  });
                  for (let i = 1; i < date.length; i = i + 1) {
                    addDate.push(date[i]);
                    addConfirm.push(dataConfirm[i] - dataConfirm[i - 1]);
                    addSuspect.push(dataSuspect[i] - dataSuspect[i - 1]);
                    addDead.push(dataDead[i] - dataDead[i - 1]);
                    addHeal.push(dataHeal[i] - dataHeal[i - 1]);
                  }

                  for (let i = 0; i < hubeiDate.length; i = i + 1) {
                    let index = date.findIndex(ele => ele === hubeiDate[i]);
                    notHubei.push(dataConfirm[index] - hubei[i]);
                    notHubeiDead.push(dataDead[index] - hubeiDead[i]);
                    notHubeiHeal.push(dataHeal[index] - hubeiHeal[i]);
                    hubeiAddConfirm.push(addConfirm[index]);
                    hubeiAllConfirm.push(dataConfirm[index]);
                    hubeiAllDead.push(dataDead[index]);
                    hubeiAllHeal.push(dataHeal[index]);
                    if (i > 0) {
                      addHubeiDate.push(hubeiDate[i]);
                      addHubei.push(hubei[i] - hubei[i - 1]);
                      addNotHubei.push(notHubei[i] - notHubei[i - 1]);
                    }
                  }
                  this.chinaOption = buildLineConfig(date, dataConfirm, dataDead, dataHeal);
                  this.todayOption = buildTodayConfig(date, todayConfirm, todaySuspect);
                  this.deadOption = buildHealConfig(date, dataHeal, dataDead);
                  this.chinaAddOption = buildLineAdd(addDate, addConfirm, addSuspect, addDead, addHeal);
                  this.hubeiOption = buildLineAHubei(hubeiDate, hubeiAllConfirm, hubei, notHubei);
                  let myChart1 = echarts.init(this.$refs.map);
                  myChart1.hideLoading();
                  myChart1.setOption(this.chinaAddOption);


                  //map4
                  this.addHubeiOption = buildAddHubei(addHubeiDate, hubeiAddConfirm, addHubei, addNotHubei);
                  let myChart4 = echarts.init(this.$refs.map2);
                  myChart4.hideLoading();
                  myChart4.setOption(this.addHubeiOption);

                  this.hubeiDeadOption = buildDeadHubei(hubeiDate, hubeiAllDead, hubeiDead, notHubeiDead);
                  this.hubeiHealOption = buildHealHubei(hubeiDate, hubeiAllHeal, hubeiHeal, notHubeiHeal);
                }
              })
              .catch(function (error) { // 请求失败处理
                console.log(error);
              });
        }
        if (this.province != '全国') {
          getProvinceMultidata(getPinyinByName(this.province))
              .then(res => {
                let provinceDate = [];
                let provinceConfirm = [];
                let provinceSuspect = [];
                let provinceDead = [];
                let provinceHeal = [];
                res.forEach(item => {
                  if (this.province === '黑龙江' || this.province === '内蒙古') {
                    if (item.countryCode === "CN" && item.province.substring(0, 3) === this.province && item.city === '') {
                      provinceDate.push(item.date);
                      provinceConfirm.push(item.confirmed);
                      provinceSuspect.push(item.suspected);
                      provinceHeal.push(item.cured);
                      provinceDead.push(item.dead);
                    }
                  } else {
                    if (item.countryCode === "CN" && item.province.substring(0, 2) === this.province && item.city === '') {
                      provinceDate.push(item.date);
                      provinceConfirm.push(item.confirmed);
                      provinceSuspect.push(item.suspected);
                      provinceHeal.push(item.cured);
                      provinceDead.push(item.dead);
                    }
                  }

                });


                let provinceAddConfirm = [];
                //provinceAddConfirm.push(provinceConfirm[0]);
                let provinceAddSuspect = [];
                //provinceAddSuspect.push(provinceSuspect[0]);
                let provinceAddDead = [];
                //provinceAddDead.push(provinceDead[0]);
                let provinceAddHeal = [];
                //provinceAddHeal.push(provinceHeal[0]);
                console.log(provinceDate.length);
                for (let i = 1; i < provinceDate.length; i = i + 1) {
                  provinceAddConfirm.push(provinceConfirm[i] - provinceConfirm[i - 1]);
                  provinceAddSuspect.push(provinceSuspect[i] - provinceSuspect[i - 1]);
                  provinceAddHeal.push(provinceHeal[i] - provinceHeal[i - 1]);
                  provinceAddDead.push(provinceDead[i] - provinceDead[i - 1]);
                }
                ;
                provinceDate.splice(0, 1);
                this.provinceOption = buildLineProvince(provinceDate, provinceAddConfirm, provinceAddHeal, provinceAddDead);
                let myChart11 = echarts.init(this.$refs.map11);
                myChart11.hideLoading();
                myChart11.setOption(this.provinceOption);
              })
              .catch(function (error) { // 请求失败处理
                console.log(error);
              });
        }


        //})
        //.catch(function (error) { // 请求失败处理
        //console.log(error);
        //});
        // })

      }
    }
  }
</script>

<style scoped>
  #allLine {
    padding:  15px 15px;
  }

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