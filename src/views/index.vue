<template>
  <div id="index" v-if="information.table.length">
    <headerDiagram :time="information.updateTime"></headerDiagram>
    <tabControl :info="information" @changeProvince="changeCity"></tabControl>
  </div>
</template>

<script>
  import headerDiagram from "../components/headerDiagram"
  import tabControl from "../components/tabControl"
  import {getLineMultidata} from "../network/home";
  import {getName,getPinyinByName} from "../network/zhen";

  export default {
    name: "index",
    data () {
      return {
        information:{
          provinceName: '全国',
          updateTime: '',
          china_info:{
            china_total:{},
            china_add:{}
          },
          total:{},
          allselect:[],
          table: [],
          mapInfo:[]
        }
      }
    },
    components: {
      headerDiagram,
      tabControl,
    },
    created () {
      this.getData();
    },
    methods:{
      getData() {
        this.information.allselect = getName();
          getLineMultidata()
              .then(res => {
                this.information.updateTime = res.updateTime;
                this.information.table = res.table;
                this.information.mapInfo = res.mapInfo;
                this.information.china_info.china_add = res.china_add;
                this.information.china_info.china_total = res.china_total;
              })
              .catch(function (error) { // 请求失败处理
                console.log(error);
              });
      },
      changeCity(city){
        this.information.provinceName = city;
        if(city !== '全国'){
          let provincePinyin = getPinyinByName(this.information.provinceName);
          this.$router.push(`/${provincePinyin}`)
        }

      }
    }
  }
</script>

<style lang="stylus">

</style>