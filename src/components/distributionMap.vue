<template>
  <div id="myMap"ref="map" ></div>
</template>

<script>
  import {getChinaJsonData, getProvinceJsonData} from "../network/home";
  import buildMapConfig from "./config_map";
  import { getNameByPinyin, getPinyinByName } from "../network/zhen"
  export default {
    name: "distributionMap",
    props:{
      mapProvince: {
        type: String,
        default: '全国'
      },
      mapValue: {
        type: Array,
        default: []
      }
    },
    mounted() {
      this.mapEchartsInit();
    },
    methods:{
      mapEchartsInit(){
        const provincePinyin = getPinyinByName(this.mapProvince);
        if (this.mapProvince == '全国') {
          getChinaJsonData()
              .then(res => {
                echarts.registerMap('china', res);
                let option = buildMapConfig('', this.mapValue);
                console.log(option);
                let myChart= echarts.init(this.$refs.map);
                myChart.hideLoading();
                myChart.setOption(option);
              })
              .catch(function (error) { // 请求失败处理
                console.log(error);
              });
        } else {
          getProvinceJsonData(provincePinyin)
              .then(res => {
                let myChart= echarts.init(this.$refs.map);
                myChart.hideLoading();
                echarts.registerMap(provincePinyin, res);
                let option = buildMapConfig(provincePinyin, this.mapValue);
                myChart.setOption(option);
              })
              .catch(function (error) { // 请求失败处理
                console.log(error);
              });
        }
      }
    }
  }
</script>

<style scoped>
  #myMap {
    table-layout: fixed;
    width: 100%;
    height:500px;
    padding:  0 15px;
    text-align: center;
    border-spacing: 2px 6px;
    color: #4d5054;
    border-collapse: collapse;

  }
  [v-cloak] {
    display: none;
  }
</style>