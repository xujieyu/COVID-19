<template>
  <div id="view" v-if="information.table.length">
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
                let today = 0;
                let yesterday = 0;
                let be_yesterday = 0;
                let times = 2;
                for(let i = res.length-1; i>=0;i=i-1){
                  let provinceSubs = '';
                  if(this.information.provinceName === '黑龙江' || this.information.provinceName === '内蒙古'){
                    provinceSubs = res[i].province.substring(0,3);
                  }
                  else{
                    provinceSubs = res[i].province.substring(0,2);
                  }
                  if(res[i].country === '中国' && provinceSubs === this.information.provinceName && !res[i].city && times === 0){
                    be_yesterday = i;
                    break;
                  }
                  if(res[i].country === '中国' && provinceSubs === this.information.provinceName && !res[i].city && times === 1){
                    yesterday = i;
                    times = 0;
                  }
                  if(res[i].country === '中国' && provinceSubs === this.information.provinceName && !res[i].city && times === 2){
                    today = i;
                    times = 1;
                  }
                }
                this.information.updateTime = res[today].date;
                this.information.total.addNum = res[yesterday].confirmed - res[be_yesterday].confirmed;
                this.information.total.confirm = res[today].confirmed;
                this.information.total.suspect = res[today].suspected;
                this.information.total.dead = res[today].dead;
                this.information.total.heal = res[today].cured;
                let list1 = [];
                let list2 = [];
                let list3 = [];
                if(this.information.provinceName === '黑龙江' || this.information.provinceName === '内蒙古') {
                  list1 = res.filter(e => e.date === res[today].date && e.province.substring(0,3) === this.information.provinceName && e.city);
                  list2 = res.filter(e => e.date === res[yesterday].date && e.province.substring(0,3) === this.information.provinceName && e.city);
                  list3 = res.filter(e => e.date === res[be_yesterday].date && e.province.substring(0,3) === this.information.provinceName && e.city);
                }
                else{
                  list1 = res.filter(e => e.date === res[today].date && e.province.substring(0,2) === this.information.provinceName && e.city);
                  list2 = res.filter(e => e.date === res[yesterday].date && e.province.substring(0,2) === this.information.provinceName && e.city);
                  list3 = res.filter(e => e.date === res[be_yesterday].date && e.province.substring(0,2) === this.information.provinceName && e.city);
                }
                this.information.table = [];
                this.information.mapInfo = [];
                list1.forEach(item => {
                  let temp = {};
                  let tempMap = {};
                  temp.name = item.city;
                  tempMap.name = item.city;
                  let yesterdayList = list2.filter(e => e.city === item.city);
                  let beYesterdayList = list3.filter(e => e.city === item.city);
                  if (yesterdayList.length === 0) temp.add = 0;
                  else if(beYesterdayList.length === 0) temp.add = yesterdayList[0].confirmed;
                  else  temp.add = yesterdayList[0].confirmed - beYesterdayList[0].confirmed;
                  temp.confirm = item.confirmed;
                  temp.dead = item.dead;
                  temp.heal = item.cured;
                  tempMap.value = item.confirmed - item.dead - item.cured;
                  this.information.mapInfo.push(tempMap);
                  if(temp.name.length < 4){
                    this.information.table.push(temp);
                  }
                });
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