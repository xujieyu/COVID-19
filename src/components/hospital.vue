<template>
  <div id="prevent" v-if="provincesList.length">
    <div class="title sectionTitle titleQg">
      <div class="statement-title">医疗救治医院查询</div>
      <div class="healthIcon"></div>
    </div>
    <div v-for="(item, index) in provincesList" >
      <div class="hotelItemWrap" province="${item.provinceName}" :class="{'current': currentList[index]}" v-on:click="getCity(index)" :key="item.provinceName">
        <div class="hotelProvince" data-province="${item.provinceName}" data-count="${item.cityCnt}">
          <div class="name">{{item.provinceName}}</div>
          <div class="count"></div>
        </div>
        <div class="hotelCity" v-if="currentList[index]" v-for="item1 in cityList[index]">
          <div class="name">{{item1.cityName}}</div>
          <div class="count">{{item1.count}}家<span>进入查询</span></div>
          <a class="healthlink" :href="item1.link.url"/>
        </div>

      </div>
    </div>
    <div class="foot">
      <div class="div-hospital">
      </div>
      <!-- 底部预防须知 -->
      <p class="p-fanghu">新型肺炎预防须知</p>
      <div class="fanghu_card">
        <div class="fanghu_title_warp">
          <img class="fanghu_icon" src="https://puui.qpic.cn/vupload/0/1580113954413_67dj6qw9r34.png/0"></img>
          <div class="fanghu_title">个人清洁</div>
        </div>
        <div class="fanghu_item">
          <div class="fanghu_item_point"></div>
          <div class="fanghu_item_text">经常保持双手清洁，尤其在触摸口、鼻或眼之前。</div>
        </div>
        <div class="fanghu_item">
          <div class="fanghu_item_point"></div>
          <div class="fanghu_item_text">经用洗手液和清水清洗双手，搓手最少20秒，并用纸巾擦干。</div>
        </div>
        <div class="fanghu_item">
          <div class="fanghu_item_point"></div>
          <div class="fanghu_item_text">打喷嚏或咳嗽时应用纸巾掩盖口鼻，把用过的纸巾弃置于有盖垃圾箱内，然后彻底清洁双手。</div>
        </div>
        <div class="fanghu_title_warp">
          <img class="fanghu_icon" src="https://puui.qpic.cn/vupload/0/1580113954413_b3dr1w759hr.png/0"></img>
          <div class="fanghu_title">尽量避免</div>
        </div>
        <div class="fanghu_item">
          <div class="fanghu_item_point"></div>
          <div class="fanghu_item_text">减少前往人流密集的场所。如不可避免，应戴上外科口罩。</div>
        </div>
        <div class="fanghu_item">
          <div class="fanghu_item_point"></div>
          <div class="fanghu_item_text">避免到访医院。如有必要到访医院，应佩戴外科口罩及时刻注重个人和手部卫生。</div>
        </div>
        <div class="fanghu_item">
          <div class="fanghu_item_point"></div>
          <div class="fanghu_item_text">避免接触动物（包括野味）、禽鸟或其粪便；避免到海鲜、活禽市场或农场。</div>
        </div>
        <div class="fanghu_item">
          <div class="fanghu_item_point"></div>
          <div class="fanghu_item_text">切勿进食野味及切勿光顾有提供野味的餐馆。</div>
        </div>
        <div class="fanghu_item">
          <div class="fanghu_item_point"></div>
          <div class="fanghu_item_text">注意食物安全和卫生，避免进食或饮用生或未熟透的动物产品，包括奶类、蛋类和肉类。</div>
        </div>
        <div class="fanghu_title_warp">
          <img class="fanghu_icon" src="https://puui.qpic.cn/vupload/0/1580113954413_qs8jz3v8m7.png/0"></img>
          <div class="fanghu_title">尽快就诊</div>
        </div>
        <div class="fanghu_item">
          <div class="fanghu_item_point"></div>
          <div class="fanghu_item_text">如有身体不适，特别是有发烧或咳嗽，应戴上外科口罩并尽快就诊。</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getHospitalMultidata, getHospitalCitydata} from "../network/home";

  export default {
    name: "hospital",
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
              if (res.args.rsp.result.code == 0) {
                this.provincesList = res.args.rsp.provinces;
                this.provincesList.forEach((item,index) =>{
                  this.currentList.push(false);
                  this.cityList.push([]);
                  getHospitalCitydata(item.provinceName)
                      .then(res=>{
                        if (res.args.rsp.result.code == 0) {
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
        //let index = this.currentList.findIndex(ele => ele === province);
        //if(index === -1) this.currentList.push(province);
        //else this.currentList.splice(index,1);

      }
    }
  }
</script>

<style scoped>
  #prevent{
    max-width: 750Px;
  }
  .sectionTitle {
    display: flex;
    position: relative;
    text-align: left;
    padding: 2vw 2vw;
  }

  .statement-title{
    color: #005dff;
    position: relative;
    text-align:left;
    font-size: 24px;
    height: 70px;
    line-height: 70px;
  }

  .healthIcon {
    position: absolute;
    display: inline-block;
    right: 36px;
    width: 156px;
    height: 70px;
    background: url('https://puui.qpic.cn/vupload/0/1580302315181_7z5pmnq6q4c.png/0');
    background-size: 100% 100%;
  }

  .hotelItemWrap {
    border-bottom: 1px solid #e9e9e9;
  }
  .current .hotelItemWrap {
    border-bottom: 0px solid #e9e9e9;
  }
  .hotelItemWrap:last-child {
    border-bottom: 0px solid #e9e9e9;
    border-bottom: 2px solid #e9e9e9;
  }
  .current .hotelItemWrap {
    border-bottom: none;
  }
  .hotelItemWrap:last-child {
    border-bottom: none;
  }
  .hotelProvince {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 94px;
    background: #f8f8f8;
    padding: 0 46px 0 60px;
    height: 84px;
    background: #f8f8f8;
    padding: 0 46px 0 40px;
  }
  .hotelProvince .name {
    height: 84px;
    line-height: 84px;
    font-size: 20px;
    color: #222;
    text-align: center;
    font-weight: 400;
  }
  .hotelProvince .count {
    position: relative;
    height: 84px;
    line-height: 84px;
    font-size: 18px;
    color: #222;
    text-align: center;
    font-weight: 500;
    padding-right: 30px;
  }
  .hotelProvince .count::after {
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
  }

  .current .hotelProvince .count::after {
    border-width: 0 8px 8px 8px;
    border-color: transparent transparent #737373 transparent;
  }

  .hotelCity {
    display: none;
    height: 90px;
    /* background:rgba(248, 248, 248, 0.3); */
    /* margin: 0 60px; */
    border-bottom: solid 1px #e9e9e9;
    padding: 0 40px;
    border-bottom: solid 2px #e9e9e9;
  }
  .hotelCity:last-child {
    border: none;
  }
  .hotelCity .name {
    height: 70px;
    line-height: 70px;
    font-size: 18px;
    color: #737373;
    text-align: center;
    font-weight: normal;
  }
  .hotelCity .count {
    height: 70px;
    line-height: 70px;
    font-size: 18px;
    color: #096bff;
    color: #737373;
    text-align: center;
    font-weight: normal;
    position: relative;
    padding-right: 114px;
  }

  .hotelCity .count span {
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
  }

  .current .hotelCity {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }



  .healthlink {
    position: absolute;
    width: 100%;
    height: 70px;
  }
  .hotelItemWrap {
    border-bottom: 1px solid #e9e9e9;
  }
  .hotelProvince{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 94px;
    background: #f8f8f8;
    padding: 0 46px 0 60px;
    height: 84px;
    background: #f8f8f8;
    padding: 0 46px 0 40px;
  }
  .name {
    height: 84px;
    line-height: 84px;
    font-size: 32px;
    color: #222;
    text-align: center;
    font-weight: 400;
  }

  .foot {
    padding:  15px 15px;
  }

  .p-fanghu {
    color: #222222;
    font-size: 28px;
    width: 100%;
    margin: 80px 0px 0px 0px;
    text-align: left;
    font-weight: 600;
  }
  .fanghu_item{
    margin-top:16px;
  }
  .fanghu_title_warp{
    display:flex;
    justify-content: flex-start;
    padding-top: 32px;
    padding-bottom: 16px;
    text-align: center;
  }
  .fanghu_icon{
    width:32px;
    height:32px;
  }
  .fanghu_title{
    font-size: 20px;
    font-weight: 500;
    margin-left:20px;
  }

  .fanghu_item_point{
    width: 8px;
    height: 8px;
    background: #005DFF;
    border-radius: 4px;
    margin-top: 14px;
    margin-right: 16px;
    position: absolute;
  }
  .fanghu_item_text{
    width: 490px;
    text-align:left;
    font-weight: normal;
    font-size: 16px;
    line-height: 36px;
    color: #222222;
    margin-left: 24px;
  }

</style>