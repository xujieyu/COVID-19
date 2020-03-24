<!-- 底部预防须知 -->

<template>
  <div class="foot">
    <p class="p-prevention">新型肺炎预防须知</p>
    <div class="prevention_card">
      <div v-for="knowledge in all_knowledge">
        <div class="prevention_title_warp">
          <img class="prevention_icon" :src="knowledge.icon" alt=""/>
          <div class="prevention_title">{{knowledge.title}}</div>
        </div>
        <div class="prevention_item" v-for="item in knowledge.items">
          <div class="prevention_item_point"></div>
          <div class="prevention_item_text">{{item}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "preventionKnowledge",
    data() {
      return {
        all_knowledge: [
          {
            icon: "https://xujieyu-1301584958.cos.ap-guangzhou.myqcloud.com/1.png",
            title: "个人清洁",
            items: [
              "经常保持双手清洁，尤其在触摸口、鼻或眼之前。",
              "经用洗手液和清水清洗双手，搓手最少20秒，并用纸巾擦干。",
              "打喷嚏或咳嗽时应用纸巾掩盖口鼻，把用过的纸巾弃置于有盖垃圾箱内，然后彻底清洁双手。",
            ],
          },
          {
            icon: "https://xujieyu-1301584958.cos.ap-guangzhou.myqcloud.com/2.png",
            title: "尽量避免",
            items: [
              "减少前往人流密集的场所。如不可避免，应戴上外科口罩。",
              "避免到访医院。如有必要到访医院，应佩戴外科口罩及时刻注重个人和手部卫生。",
              "避免接触动物（包括野味）、禽鸟或其粪便；避免到海鲜、活禽市场或农场。",
              "切勿进食野味及切勿光顾有提供野味的餐馆。",
              "注意食物安全和卫生，避免进食或饮用生或未熟透的动物产品，包括奶类、蛋类和肉类。"
            ],
          },
          {
            icon: "https://xujieyu-1301584958.cos.ap-guangzhou.myqcloud.com/3.png",
            title: "尽快就诊",
            items: [
              "如有身体不适，特别是有发烧或咳嗽，应戴上外科口罩并尽快就诊。",
            ],
          },
        ]
      }
    },
  }
</script>

<style lang="stylus">

  .foot
    padding 15px 15px
    background-color #ffffff
    margin-bottom: 30px

    .p-prevention
      color #222222
      font-size 28px
      width 100%
      margin 10px 0 0 0
      text-align left
      font-weight 600

    .prevention_title_warp
      display flex
      justify-content flex-start
      padding-top 32px
      padding-bottom 16px
      text-align center

      .prevention_icon
        width 32px
        height 32px

      .prevention_title
        font-size 20px
        font-weight 500
        margin-left 20px


    .prevention_item
      margin-top 16px

      .prevention_item_point
        width 8px
        height 8px
        background #005DFF
        border-radius 4px
        margin-top 14px
        margin-right 16px
        position absolute

      .prevention_item_text
        width 95%
        text-align left
        font-weight normal
        font-size 16px
        line-height 26px
        color #222222
        margin-left 24px

</style>