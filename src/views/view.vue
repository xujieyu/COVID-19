<template>
  <div v-if="info.table.length">
    <div class="data-statement">
      <div class="statement-title">{{info.provinceName}} | 疫情状况</div>
      <div class="update-time">截止 {{info.updateTime}}</div>
      <div class="shuoming" style="color: #000000; padding-right: 15px;" @click="backClick">
        <button class="back" style="color: rgba(0,0,0,0.98);padding: 0 5px">返回首页</button>

      </div>

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
    <mytable :mychildren = info.table></mytable>
  </div>
</template>

<script>
  import {getHomeMultidata,getLineMultidata} from "../network/home";
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
        //getLineMultidata()
            //.then(res => {
        let res = require("../data/Wuhan-2019-nCoV");
              let province = this.$route.path.substr(1);
              this.info.provinceName = getNameByPinyin(province);

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
                if(beYesterdayList.length === 0) temp.add = yesterdayList[0].confirmed;
                else  temp.add = yesterdayList[0].confirmed - beYesterdayList[0].confirmed;
                temp.confirm = item.confirmed;
                temp.dead = item.dead;
                temp.heal = item.cured;
                tempMap.value = item.confirmed - item.dead - item.cured;
                this.info.mapInfo.push(tempMap);
                this.info.table.push(temp);
              });
            //})
            //.catch(function (error) { // 请求失败处理
            //  console.log(error);
            //});
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
  .back
    height: 28Px
    line-height 28Px
  .summary
    display flex
    padding  0 20px
    justify-content space-between
    .number
      font-size 24px
      font-weight bold
      padding: 8px 5px 5px 5px
    .small-number
      font-size 12px
    .tag
      height 35px
      line-height 35px
      font-size 12px
      font-weight bold
    .tip
      font-size 12px
      padding-top 10px
      color: #8B8989
    .confirm
      background-color #FDF1F1
      border-radius 8px 0 0 8px
      margin-right 2px
      .tag
        background-color #FFE0E0
      .number, .small-number
        color: #D81D1B
    .suspect
      background-color #FFF7ED
      margin-right 2px
      .tag
        background-color #FFEED9
      .number, .small-number
        color: #F7AB1A
    .heal
      background-color #F1F8F4
      margin-right 2px
      .tag
        background-color #DFEEE6
      .number, .small-number
        color: #178B50
    .dead
      background-color #F8F8F8
      border-radius 0 8px 8px 0
      .tag
        background-color #EEEEEE
      .number, .small-number
        color: #66666C

    > div
      flex 1
      text-align center
      overflow hidden
  // padding 15px 0
</style>
