<template>
  <div id="myLine" ref="map" ></div>
</template>

<script>
  import echarts from "echarts";
  import {getHomeMultidata} from "../../network/home";
  import {buildLineConfig} from "./config_line"
  //import option from "./config_line";

  export default {
    name: "myLine",
    data() {
      return {
      }
    },
    props:{
      option: Object,
    },
    mounted() {
      this.mapEchartsInit();
    },
    methods:{
      mapEchartsInit(){
        let myChart=echarts.init(this.$refs.map);
        myChart.hideLoading();
        console.log(this.option.series);
        myChart.setOption(this.option);
      }
    }
  }
</script>

<style scoped>
  #myLine {
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