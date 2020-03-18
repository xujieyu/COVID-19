<template>
  <div v-if="info.table.length">
    <div class="photo data-statement">
      <div style="padding-top: 25Px">
        <div style="color: #ede3e6;font-size: 20Px">新型冠状病毒</div>
        <div class="threed"><span>肺炎疫情实时监控</span></div>
        <div class="update-time">截止 {{info.updateTime}}</div>
        <div class="shuoming">
          <button class="back" @click="backClick" style="color: rgba(0,0,0,0.98);padding: 0 5px;background-color: #c0d7ff">返回首页</button>
        </div>
      </div>
    </div>
    <div class="information">
      <div class="data-statement">
        <div class="statement-title">{{info.provinceName}} | 疫情状况</div>
      </div>
      <div class="summary">
        <div class="confirm">
          <div class="number">{{info.total.addNum}}</div>
          <div class="tag"><span>新增确诊</span></div>
        </div>
        <div class="suspect">
          <div class="number">{{info.total.confirm}}</div>
          <div class="tag"><span>累计确诊</span></div>
        </div>
        <div class="heal">
          <div class="number">{{info.total.heal}}</div>
          <div class="tag"><span>累计治愈</span></div>
        </div>
        <div class="dead">
          <div class="number">{{info.total.dead}}</div>
          <div class="tag"><span>累计死亡</span></div>
        </div>
      </div>

      <myMap :mapProvince="info.provinceName" :mapValue="info.mapInfo"></myMap>
      <allLine :province="info.provinceName"></allLine>
      <mytable :mychildren = info.table :isHome="false"></mytable>
    </div>

  </div>
</template>

<script>
  import {getProvinceMultidata} from "../network/home";
  import mytable from "../components/mytable";
  import myMap from "../components/Map/myMap";
  import allLine from "../components/Line/allLine";
  import { getNameByPinyin, getPinyinByName,getName} from "../components/zhen"

  export default {
    components: {
      mytable,
      myMap,
      allLine,
    },
    data () {
      return {
        info:{
          updateTime: '',
          allselect:[],
          total: {},
          table: [],
          provinceName: '',
          mapInfo:[]
        }
      }
    },

    created () {
      this.getData();
    },
    methods:{
      handleClick (params) {
        let provincePinyin = getPinyinByName(this.info.provinceName)
        this.$router.push(`/${provincePinyin}`)
      },
      backClick(){
        this.$router.back();
      },
      getData(){
        let province = this.$route.path.substr(1);
        this.info.provinceName = getNameByPinyin(province);
        getProvinceMultidata(province)
            .then(res => {
              let today = 0;
              let yesterday = 0;
              let be_yesterday = 0;
              let times = 2;
              for(let i = res.length-1; i>=0;i=i-1){
                let provinceSubs = '';
                if(this.info.provinceName === '黑龙江' || this.info.provinceName === '内蒙古'){
                  provinceSubs = res[i].province.substring(0,3);
                }
                else{
                  provinceSubs = res[i].province.substring(0,2);
                }
                if(res[i].country === '中国' && provinceSubs === this.info.provinceName && !res[i].city && times === 0){
                  be_yesterday = i;
                  break;
                }
                if(res[i].country === '中国' && provinceSubs === this.info.provinceName && !res[i].city && times === 1){
                  yesterday = i;
                  times = 0;
                }
                if(res[i].country === '中国' && provinceSubs === this.info.provinceName && !res[i].city && times === 2){
                  today = i;
                  times = 1;
                }
              }
              this.info.updateTime = res[today].date;
              this.info.total.addNum = res[yesterday].confirmed - res[be_yesterday].confirmed;
              this.info.total.confirm = res[today].confirmed;
              this.info.total.suspect = res[today].suspected;
              this.info.total.dead = res[today].dead;
              this.info.total.heal = res[today].cured;
              let list1 = [];
              let list2 = [];
              let list3 = [];
              if(this.info.provinceName === '黑龙江' || this.info.provinceName === '内蒙古') {
                list1 = res.filter(e => e.date === res[today].date && e.province.substring(0,3) === this.info.provinceName && e.city);
                list2 = res.filter(e => e.date === res[yesterday].date && e.province.substring(0,3) === this.info.provinceName && e.city);
                list3 = res.filter(e => e.date === res[be_yesterday].date && e.province.substring(0,3) === this.info.provinceName && e.city);
              }
              else{
                list1 = res.filter(e => e.date === res[today].date && e.province.substring(0,2) === this.info.provinceName && e.city);
                list2 = res.filter(e => e.date === res[yesterday].date && e.province.substring(0,2) === this.info.provinceName && e.city);
                list3 = res.filter(e => e.date === res[be_yesterday].date && e.province.substring(0,2) === this.info.provinceName && e.city);
              }
              this.info.table = [];
              this.info.mapInfo = [];
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
                this.info.mapInfo.push(tempMap);
                if(temp.name.length < 4){
                  this.info.table.push(temp);
                }
              });
            })
            .catch(function (error) { // 请求失败处理
              console.log(error);
            });
      }
    },
    watch: {
      '$route'(to,from){
        this.getData();
      }
    },


  }
</script>


<style lang="stylus">

</style>
