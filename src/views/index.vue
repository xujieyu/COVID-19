<template>
  <div id="index" v-if="information.table.length">
    <headerDiagram :time="information.updateTime"></headerDiagram>
    <tabControl :info="information" @changeProvince="changeCity"></tabControl>
  </div>
</template>

<script>
  import headerDiagram from "../components/headerDiagram"
  import tabControl from "../components/tabControl"
  import preventionKnowledge from "../components/preventionKnowledge";
  import {getLineMultidata,getProvinceMultidata} from "../network/home";
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
                let today = 0;
                let yesterday = 0;
                let be_yesterday = 0;
                let times = 2;
                for(let i = res.length-1; i>=0;i=i-1){
                  if(res[i].country === '中国' && res[i].province === '' && times === 0){
                    be_yesterday = i;
                    break;
                  }
                  if(res[i].country === '中国' && res[i].province === '' && times === 1){
                    yesterday = i;
                    times = 0;
                  }
                  if(res[i].country === '中国' && res[i].province === '' && times === 2){
                    today = i;
                    times = 1;
                  }
                }
                this.information.updateTime = res[today].date;
                this.information.china_info.china_total = res[today];
                let add_data = {};
                add_data.confirmed = res[yesterday].confirmed - res[be_yesterday].confirmed;
                add_data.suspected = res[yesterday].suspected - res[be_yesterday].suspected;
                add_data.cured = res[yesterday].cured - res[be_yesterday].cured;
                add_data.dead = res[yesterday].dead - res[be_yesterday].dead;
                this.information.china_info.china_add = add_data;
                let list = res.filter(e => e.date === res[today].date && e.province && !e.city);
                let list2 = res.filter(e => e.date === res[yesterday].date && e.province && !e.city);
                let list3 = res.filter(e => e.date === res[be_yesterday].date && e.province && !e.city);
                this.information.table = [];
                this.information.mapInfo = [];
                list.forEach(item => {
                  let temp_children = {};
                  let temp_map = {};
                  if(item.province.substring(0,3) === '黑龙江' || item.province.substring(0,3) === '内蒙古'){
                    temp_children.name = item.province.substring(0,3);
                    temp_map.name = item.province.substring(0,3);
                  }
                  else{
                    temp_children.name = item.province.substring(0,2);
                    temp_map.name = item.province.substring(0,2);
                  }
                  let yesterdayList = list2.filter(e => e.province === item.province);
                  let beYesterdayList = list3.filter(e => e.province === item.province);
                  temp_children.add = yesterdayList[0].confirmed - beYesterdayList[0].confirmed;
                  temp_children.confirm = item.confirmed;
                  temp_children.dead = item.dead;
                  temp_children.heal = item.cured;
                  temp_map.value = item.confirmed - item.dead - item.cured;
                  this.information.table.push(temp_children);
                  this.information.mapInfo.push(temp_map);
                });
              })
              .catch(function (error) { // 请求失败处理
                console.log(error);
              });
      },
      changeCity(city){
        this.information.provinceName = city;
        if(city != '全国'){
          let provincePinyin = getPinyinByName(this.information.provinceName);
          this.$router.push(`/${provincePinyin}`)
        }

      }
    }
  }
</script>

<style lang="stylus">

</style>