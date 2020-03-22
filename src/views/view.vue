<template>
  <div id="view" v-if="information.mapInfo.length">
    <headerDiagram :time="information.updateTime"></headerDiagram>
    <tabControl :info="information" @changeProvince="changeCity"></tabControl>
  </div>
</template>

<script>
  import headerDiagram from "../components/headerDiagram"
  import tabControl from "../components/tabControl"
  import preventionKnowledge from "../components/preventionKnowledge";
  import {getLineMultidata,getProvinceMultidata} from "../network/home";
  import {getName,getPinyinByName,getNameByPinyin} from "../network/zhen";

  export default {
    name: "view",
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
        let province = this.$route.path.substr(1);
        this.information.provinceName = getNameByPinyin(province);
          getProvinceMultidata(province)
              .then(res => {
                this.information.updateTime = res.updateTime;
                this.information.total = res.total;
                this.information.table = res.table;
                this.information.mapInfo = res.mapInfo;
              })
              .catch(function (error) { // 请求失败处理
                console.log(error);
              });

      },
      changeCity(city){
        this.information.provinceName = city;
        if(city === '全国'){
          this.$router.push('/');
        }
        else {
          let provincePinyin = getPinyinByName(this.information.provinceName);
          console.log(provincePinyin);
          this.$router.push(`/${provincePinyin}`)
        }
      }
    },
    watch: {
      '$route'(to,from){
        this.information.table = [];
        this.information.mapInfo = [];
        this.getData();
      }
    },
  }
</script>

<style lang="stylus">

</style>