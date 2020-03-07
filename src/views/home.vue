<template>
    <div id="home" v-cloak v-if="information.allselect.length">
      <div class="photo data-statement">
        <div style="padding-top: 20px">
          <div style="color: #ede3e6;font-size: 20Px">新型冠状病毒</div>
          <div class="threed"><span>肺炎疫情实时监控</span></div>
          <div class="update-time">截止 {{information.china_info.time}}</div>
          <div class="shuoming">
            <button class="back" @click="showSelect" style="color: rgba(0,0,0,0.98);padding: 0 5px;background-color: #c0d7ff">切换城市</button>
          </div>
        </div>
      </div>
      <div class="information">
        <TabControl class="tabcotrol1" @itemClick="tabClick" :titles="['疫情详情', '疫情趋势', '医疗信息']"></TabControl>
        <div id="page1">
          <div class="city-tab" style="margin-top: 0;">
            <div class="total-statement">
              <div class="total-title"><span style="color: #2b70c7">全国</span>疫情状况</div>
              <div class="total-info">
                <span class="qs" @click="handleModal">数据说明</span>
              </div>

            </div>
            <div class="summary">
                <div class="confirm item">
                  <div class="tip">昨日<span class="small-number">+{{information.china_info.china_add.confirmed}}</span></div>
                  <div class="number">{{information.china_info.china_total.confirmed}}</div>
                  <div class="tag"><span>确诊病例</span></div>
                </div>
                <div class="suspect item">
                  <div class="tip">昨日<span class="small-number"><span v-if="information.china_info.china_add.suspected > 0">+</span>{{information.china_info.china_add.suspected}}</span></div>
                  <div class="number">{{information.china_info.china_total.suspected}}</div>
                  <div class="tag"><span>疑似病例</span></div>
                </div>
                <div class="heal item">
                  <div class="tip">昨日<span class="small-number">+{{information.china_info.china_add.cured}}</span></div>
                  <div class="number">{{information.china_info.china_total.cured}}</div>
                  <div class="tag"><span>治愈人数</span></div>
                </div>
                <div class="dead item">
                  <div class="tip">昨日<span class="small-number">+{{information.china_info.china_add.dead}}</span></div>
                  <div class="number">{{information.china_info.china_total.dead}}</div>
                  <div class="tag"><span>死亡人数</span></div>
                </div>
              </div>

            <van-popup v-model="show"  position="bottom">
              <van-picker show-toolbar title="选择城市" :columns="information.allselect" @cancel="onCancel" @confirm="onConfirm" @change="onChange" />
            </van-popup>

            <van-popup v-model="isShow" position="center" closeable close-icon="close" :style="{width: '80%'}">
              <div style="text-align: left; font-size: 12Px; padding-left: 2px ">
                <div style="color: #2b70c7;">1. 数据来源：</div>
                <div>数据同步获取自(<a href="https://github.com/canghailan/Wuhan-2019-nCoV">[Wuhan-2019-nCoV]</a>项目</div><br>
                <div style="color: #2b70c7">2. 数据描述:</div>
                <div>
                  a) 每日精确到国家、省、市的确诊、疑似、治愈、死亡人数。<br>

                  b) 2019-12-01至2020-01-02数据来自asycns提供的实验室确诊数据。<br>

                  c) 2020-01-02至2020-01-10数据无变化。<br>

                  d) 2020-01-10至2020-02-06数据来自国家、各省、武汉市卫健委疫情通告。<br>

                  e) 2020-02-07后数据从今日头条接口采集，每小时57分自动更新。<br>

                  d) 国家、省级历史数据会根据卫健委数据更新，市级历史数据有差异（略小于）。
                </div>
              </div>
            </van-popup>
            <div v-if="currentType == 0">
              <div class="mapTitle">现有确诊分布（人）</div>
              <myMap :map-value="information.mapInfo"></myMap>
              <mytable :mychildren = information.children></mytable>
            </div>
            <div v-else-if="currentType == 1">
              <all-line :province="information.province"></all-line>
            </div>
            <div v-else-if="currentType == 2">
              <hospital></hospital>
            </div>

          </div>

        </div>
      </div>
    </div>
</template>

<script>
  import mytable from "../components/mytable";
  import allLine from "../components/Line/allLine";
  import myMap from "../components/Map/myMap";
  import TabControl from "../components/TabControl";
  import hospital from "../components/hospital";
  import { getNameByPinyin, getPinyinByName, getName } from "../components/zhen"
  export default {
        name: "home",
        data () {
            return {
              currentType:0,
              show: false,
              isShow: false,
              information:{
                china_info:{
                  time:'',
                  china_total:{},
                  china_add:{}
                },
                province: '全国',
                addNum: 0,
                allselect:[],
                total_info:{},
                children: [],
                mapInfo:[]
              }
            }
            },
        components: {
          TabControl,
          mytable,
          allLine,
          myMap,
          hospital,
        },

        created () {
          this.getData();
        },
        methods:{
          showSelect(){
            this.show = true;
          },
          onChange(picker, value, index){
            this.information.province = value;
          },
          onCancel(){
            this.show = false;
          },
          onConfirm(picker, value, index){
            this.show = false;
            console.log(value);
            this.information.province = this.information.allselect[value];
            let provincePinyin = getPinyinByName(this.information.province)
            this.$router.push(`/${provincePinyin}`)
          },
          handleClick (params) {
            let provincePinyin = getPinyinByName(this.information.province)
            this.$router.push(`/${provincePinyin}`)
          },
          tabClick(index) {
            this.currentType = index;
          },
          handleModal () {
            this.isShow = true;
          },
          getData() {
            //getLineMultidata()
            //    .then(res => {
            this.information.province ='全国';
            let res = require("../data/resultHome");
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
            this.information.china_info.time = res[today].date;
            this.information.china_info.china_total = res[today];
            let add_data = {};
            add_data.confirmed = res[yesterday].confirmed - res[be_yesterday].confirmed;
            add_data.suspected = res[yesterday].suspected - res[be_yesterday].suspected;
            add_data.cured = res[yesterday].cured - res[be_yesterday].cured;
            add_data.dead = res[yesterday].dead - res[be_yesterday].dead;
            this.information.china_info.china_add = add_data;
            this.information.allselect = getName();
            let list = res.filter(e => e.date === res[today].date && e.province && !e.city);
            let list2 = res.filter(e => e.date === res[yesterday].date && e.province && !e.city);
            let list3 = res.filter(e => e.date === res[be_yesterday].date && e.province && !e.city);
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
              this.information.children.push(temp_children);
              this.information.mapInfo.push(temp_map);
            });
                //})
                //.catch(function (error) { // 请求失败处理
                  //console.log(error);
                //});

          }
        }


    }
</script>

<style lang="stylus">
  [v-cloak] {
    display: none;
  }

  .photo
    text-align left;
    margin 0px 10px
    height 150Px
    background url("../img/virus.png") no-repeat
    background-position right
    background-size 140Px 140Px

  .threed
    font-size: 30Px;
    font-weight: bold;
    background-image: linear-gradient(#ede3e6, #79749b);
    -webkit-background-clip: text;
    color: transparent ;

  .information
    background-color: #fff;
    position: relative;
    border-radius: 10px;
    margin: -10px 0 15px;
    padding 10px 10px 18px;

  .back
    height: 28Px
    line-height 28Px

  .total-statement
    display: flex;
    justify-content: space-between;
    margin 15px 15px

  .total-title
    height: 28Px;
    font-size 24Px;
    line-height 28Px;

  .tabcotrol1
    position sticky
    top 0px
  .navTabs
    display: flex;
    justify-content: space-around;
    width: 100%;
  .navTab
    position: relative;
    color: #000;
    padding-bottom: .475rem;
    border-bottom: 3px solid

  #select-area
    position: absolute;
    top: 0;
    right: 17px;
    max-width: 100Px;
    display: inline-block;
    height: 28Px;
    padding: 0 8px;
    line-height: 28px;
    opacity: .76;
    background: #e5feff;
    border-radius: 51px;
    text-align: center;
    font-size: 14Px;
    color: #104345;

  .mapTitle
    position: relative;
    text-align: left;
    font-size: 18Px;
    margin-top 15px;
    padding  0 15px

  .total-info
    height: 28px;
    line-height: 28px;

  .qs
    transform: translate(0, -50%);
    top: 20px;
    white-space: nowrap;
    color: #737373;
    font-size: 14Px;
    margin-left: 20px;
    padding-left 15px;
    background: url(https://mat1.gtimg.com/news/zhishiguan/page/icon_qs.png) no-repeat left center;
    background-size: 12Px 12Px;

  .summary
    display: flex;
    flex-wrap: wrap;
    padding  20px 20px
    .number
      font-size 20Px
      font-weight bold
      padding: 8px 5px 5px 5px
    .small-number
      font-size 12Px
    .tag
      height 35px
      line-height 35px
      font-size 14Px
    .tip
      font-size 12Px
      padding-top 10px
      color: #8B8989
    .confirm
      background-color #FDF1F1
      border-radius 8px 0 0 8px
      margin-right 2px
      .tag
        background-color #fde4e1
      .number, .small-number
        color: #d84641
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
        color: #49708b
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