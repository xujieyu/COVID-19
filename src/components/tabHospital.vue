<template>
  <div id="prevent" v-if="provincesList.length">
    <div class="section-title">
      <div class="statement-title">医疗救治医院查询</div>
      <div class="health-icon"></div>
    </div>
    <div v-for="(item, index) in provincesList">
      <div class="hotel-item-wrap"  v-on:click="getCity(index)" :key="item.provinceName">
        <div class="hotel-province">
          <div class="hotel-province-name">{{item.provinceName}}</div>
          <div class="count"  :class="{'current': currentList[index]}"></div>
        </div>
        <div class="hotel-city" v-if="currentList[index]" v-for="city in cityList[index]">
          <div class="hotel-city-name">{{city.cityName}}</div>
          <a class="hotel-city-count" :href="city.link.url">{{city.count}}家<span>进入查询</span></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getHospitalMultidata, getHospitalCitydata} from "../network/home";

  export default {
    name: "tabHospital",
    props:{
      childInfo:{
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        provincesList:[],
        currentList:[],
        cityList:[],
      }
    },
    created() {
      this.getData();
    },
    methods:{
      getData(){
        getHospitalMultidata()
            .then(res => {
              if (res.args.rsp.result.code === 0) {
                this.provincesList = res.args.rsp.provinces;
                this.provincesList.forEach((item,index) =>{
                  this.currentList.push(false);
                  this.cityList.push([]);
                  getHospitalCitydata(item.provinceName)
                      .then(res=>{
                        if (res.args.rsp.result.code === 0) {
                          this.cityList[index] = res.args.rsp.info.citys;
                        }

                      }).catch(function (error) { // 请求失败处理
                    console.log(error);
                  });
                });
              }
            })
            .catch(function (error) { // 请求失败处理
              console.log(error);
            });
      },
      getCity(index){
        let temp = this.currentList[index];
        this.currentList.splice(index,1,!temp);

      }
    }
  }
</script>

<style lang="stylus">

  .section-title
    display flex
    position relative
    text-align left
    padding 2vw 2vw

    .statement-title
      color #005dff
      position relative
      text-align left
      font-size 24px
      height 70px
      line-height 70px

    .health-icon
      position absolute
      display inline-block
      right 10px
      width 220px
      height 70px
      background url('https://xujieyu-1301584958.cos.ap-guangzhou.myqcloud.com/icon_health.png')
      background-size 100% 100%

  .hotel-item-wrap
    border-bottom 1px solid #e9e9e9

    .hotel-province
      display flex
      justify-content space-between
      align-items center
      background #f8f8f8
      height 84px
      padding 0 46px 0 40px
      text-align left

      .hotel-province-name
        height 84px
        line-height 84px
        font-size 18px
        color #222
        text-align center
        font-weight 400

      .count
        position relative
        height 84px
        line-height 84px
        font-size 18px
        color #222;
        text-align center
        font-weight 500
        padding-right 30px

      .count::after
        content: '.';
        display: block;
        position: absolute;
        font-size: 0;
        line-height: 0;
        width: 0;
        height: 0;
        border-width: 8px 8px 0 8px;
        border-style: solid;
        border-color: #737373 transparent transparent transparent;
        right: 0px;
        top: 50%;
        transform: translate(0, -50%);

      .current::after
        border-width: 0 8px 8px 8px;
        border-color: transparent transparent #737373 transparent;





    .hotel-city
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 90px;
      border-bottom: solid 1px #e9e9e9;
      padding: 0 40px;
      border-bottom: solid 2px #e9e9e9;

      .hotel-city-name
        height 70px
        line-height 70px
        font-size 16px
        color #737373
        text-align center
        font-weight normal

      .hotel-city-count
        height: 70px;
        line-height: 70px;
        font-size: 18px;
        color: #737373;
        text-align: center;
        font-weight: normal;
        position: relative;
        padding-right: 114px;

        span
          position: absolute;
          right: 0;
          top: 50%;
          transform: translate(0, -50%);
          width: 100px;
          text-align: center;
          height: 32px;
          line-height: 32px;
          border: 1px solid #9cc0ff;
          color: #9cc0ff;
          font-size: 18px;
          border-radius: 32px;

  .current .hotelItemWrap
    border-bottom: 0px solid #e9e9e9;
  .current .hotelItemWrap
    border-bottom: none;



  .health-link
      position absolute
      height 70px


</style>