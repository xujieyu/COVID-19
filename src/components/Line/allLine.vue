<template>
  <div id="allLine">
    <div v-if="province == '全国'">
      <div class="myLine" ref="map" ></div>
      <div class="myLine" ref="map1" ></div>
      <div class="myLine" ref="map2" ></div>
      <div class="myLine" ref="map3" ></div>
      <div class="myLine" ref="map4" ></div>
    </div>
    <div v-else="province != '全国'">
      <div class="myLine" ref="map11" ></div>
    </div>


  </div>
  
</template>

<script>
  import echarts from "echarts";
  import {getHomeMultidata, getLineMultidata} from "../../network/home";
  import {buildLineConfig,buildLineAdd,buildLineAHubei,buildHealConfig,buildAddHubei,buildLineProvince} from "./config_line"
  export default {
    name: "allLine",
    props:{
      province: {
        type: String,
        default: '全国'
      }
    },
    data(){
      return{
        chinaOption:{},
        chinaAddOption:{},
        hubeiOption:{},
        addHubeiOption:{},
        deadOption:{},
        provinceOption:{},

      }
    },
    mounted() {
      this.mapEchartsInit();
    },
    methods: {
      mapEchartsInit(){
        //getLineMultidata()
         //   .then(res => {
        let res = require('../../data/Wuhan-2019-nCoV');
        if(this.province == '全国'){
          let date = [];
          let dataConfirm = [];
          let dataSuspect = [];
          let dataDead = [];
          let dataHeal = [];
          let addDate = [];
          let addConfirm = [];
          let addSuspect = [];
          let addDead = [];
          let addHeal = [];
          let hubeiDate = [];
          let hubei = [];
          let notHubei = [];
          let addHubeiDate = [];
          let addHubei = [];
          let addNotHubei = [];
          res.forEach(item =>{
            if (item.countryCode == "CN" && item.provinceCode == ''){
              date.push(item.date);
              dataConfirm.push(item.confirmed);
              dataSuspect.push(item.suspected);
              dataDead.push(item.dead);
              dataHeal.push(item.cured);
            }
            if(item.countryCode == "CN" && item.provinceCode == '420000' && item.city == ''){
              hubeiDate.push(item.date);
              hubei.push(item.confirmed);
            }
          });
          addDate.push(date[0]);
          addConfirm.push(dataConfirm[0]);
          addSuspect.push(dataSuspect[0]);
          addDead.push(dataDead[0]);
          addHeal.push(dataHeal[0]);
          for(let i = 1; i<date.length; i = i+1){
            addDate.push(date[i]);
            addConfirm.push(dataConfirm[i] - dataConfirm[i-1]);
            addSuspect.push(dataSuspect[i] - dataSuspect[i-1]);
            addDead.push(dataDead[i] - dataDead[i-1]);
            addHeal.push(dataHeal[i] - dataHeal[i-1]);
          }
          addHubeiDate.push(hubeiDate[0]);
          addHubei.push(hubei[0]);
          addNotHubei.push(notHubei[0]);
          for(let i = 0;i<hubeiDate.length;i=i+1){
            let index = date.findIndex(ele => ele === hubeiDate[i]);
            notHubei.push(dataConfirm[index] - hubei[i]);
            if(i >0){
              addHubeiDate.push(hubeiDate[i]);
              addHubei.push(hubei[i] - hubei[i-1]);
              addNotHubei.push(notHubei[i] - notHubei[i-1]);
            }
          }
          this.chinaOption = buildLineConfig(date, dataConfirm, dataSuspect, dataDead);
          let myChart=echarts.init(this.$refs.map);
          myChart.hideLoading();
          myChart.setOption(this.chinaOption);

          this.deadOption = buildHealConfig(date, dataHeal, dataDead);
          let myChart3=echarts.init(this.$refs.map1);
          myChart3.hideLoading();
          myChart3.setOption(this.deadOption);

          this.chinaAddOption = buildLineAdd(addDate,addConfirm,addSuspect,addDead);
          let myChart1=echarts.init(this.$refs.map2);
          myChart1.hideLoading();
          myChart1.setOption(this.chinaAddOption);

          this.hubeiOption = buildLineAHubei(hubeiDate,hubei,notHubei);
          let myChart2=echarts.init(this.$refs.map3);
          myChart2.hideLoading();
          myChart2.setOption(this.hubeiOption);

          //map4
          this.addHubeiOption = buildAddHubei(addHubeiDate,addHubei,addNotHubei);
          let myChart4=echarts.init(this.$refs.map4);
          myChart4.hideLoading();
          myChart4.setOption(this.addHubeiOption);
        }


        if(this.province != '全国'){
          let provinceDate = [];
          let provinceConfirm = [];
          let provinceSuspect = [];
          let provinceDead = [];
          let provinceHeal = [];
          res.forEach(item =>{
            if(this.province === '黑龙江' || this.province === '内蒙古'){
              if(item.countryCode === "CN" && item.province.substring(0,3) === this.province && item.city === ''){
                provinceDate.push(item.date);
                provinceConfirm.push(item.confirmed);
                provinceSuspect.push(item.suspected);
                provinceHeal.push(item.cured);
                provinceDead.push(item.dead);
              }
            }
            else{
              if(item.countryCode === "CN" && item.province.substring(0,2) === this.province && item.city === ''){
                provinceDate.push(item.date);
                provinceConfirm.push(item.confirmed);
                provinceSuspect.push(item.suspected);
                provinceHeal.push(item.cured);
                provinceDead.push(item.dead);
              }
            }

          });
          let provinceAddConfirm = [];
          provinceAddConfirm.push(provinceConfirm[0]);
          let provinceAddSuspect = [];
          provinceAddSuspect.push(provinceSuspect[0]);
          let provinceAddDead = [];
          provinceAddDead.push(provinceDead[0]);
          let provinceAddHeal = [];
          provinceAddHeal.push(provinceHeal[0]);
          for(let i = 1; i<provinceDate.length; i = i+1){
            provinceAddConfirm.push(provinceConfirm[i] - provinceConfirm[i-1]);
            provinceAddSuspect.push(provinceSuspect[i] - provinceSuspect[i-1]);
            provinceAddHeal.push(provinceHeal[i] - provinceHeal[i-1]);
            provinceAddDead.push(provinceDead[i] - provinceDead[i-1]);
          };
          this.provinceOption = buildLineProvince(provinceDate, provinceAddConfirm, provinceAddHeal,provinceAddDead);
          let myChart11=echarts.init(this.$refs.map11);
          myChart11.hideLoading();
          myChart11.setOption(this.provinceOption);
        }
           // })

      }
    }
  }
</script>

<style scoped>
  #allLine {
    padding:  15px 15px;
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