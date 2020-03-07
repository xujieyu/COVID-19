<template>
  <div id="myMap"ref="map" ></div>
</template>

<script>
  import echarts from "../echarts";
  //import 'echarts/map/js/province/henan.js';
  //import option from "./config_map.js";
  import {getHomeMultidata, getLineMultidata} from "../../network/home";
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
        //getLineMultidata()
          //  .then(res => {
        //let res = require('../../data/Wuhan-2019-nCoV');
              let myChart=echarts.init(this.$refs.map);
              const provincePinyin = getPinyinByName(this.mapProvince);
              if (this.mapProvince == '全国') {
                require('echarts/map/js/china.js');
                let option = buildMapConfig('', this.mapValue);
                myChart.hideLoading();
                myChart.setOption(option);
              } else {
                require(`echarts/map/js/province/${provincePinyin}.js`);
                let option = buildMapConfig(this.mapProvince, this.mapValue);
                myChart.hideLoading();
                myChart.setOption(option);
              }
            //})
            //.catch(function (error) { // 请求失败处理
              //console.log(error);
            //});
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