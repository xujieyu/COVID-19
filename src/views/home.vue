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

            <van-popup v-model="isShow" position="center" closeable close-icon="close" style="width: 80%; height: 30%">
              <div style="text-align: left; font-size: 20px; padding-left: 2px ">
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
  import {getLineMultidata} from '../network/home'
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
            getLineMultidata()
                .then(res => {
            this.information.province ='全国';
            //let res = require("../data/resultHome");
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
                })
                .catch(function (error) { // 请求失败处理
                  console.log(error);
                });

          }
        }


    }
</script>

<style lang="stylus">
  [v-cloak] {
    display: none;
  }



  // padding 15px 0
</style>