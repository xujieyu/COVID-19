<template>
  <div id="myMap"ref="map" ></div>
</template>

<script>
  //import 'echarts/map/js/province/henan.js';
  //import option from "./config_map.js";
  //import echarts from 'echarts'
  import {getChinaJsonData, getProvinceJsonData} from "../../network/home";
  import buildMapConfig from "./config_map";
  import { getNameByPinyin, getPinyinByName } from "../zhen"
  export default {
    name: "myMap",
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
        let myChart= echarts.init(this.$refs.map);
              if (this.mapProvince == '全国') {
                getChinaJsonData()
                    .then(res => {
                //let dataJson = require('../../data/china.json');
                myChart.hideLoading();
                echarts.registerMap('china', res);

                //require();
                let option = buildMapConfig('', this.mapValue);
                myChart.setOption(option);
                    })
                    .catch(function (error) { // 请求失败处理
                      console.log(error);
                    });
              } else {
                getProvinceJsonData(provincePinyin)
                    .then(res => {
                //let dataJson = require('../../data/province/' + provincePinyin + '.json');
                myChart.hideLoading();
                echarts.registerMap(provincePinyin, res);
                //require(`echarts/map/js/province/${provincePinyin}.js`);
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
    height:600px;
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