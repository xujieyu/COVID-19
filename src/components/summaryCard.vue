<template>
  <div>
    <div class="tip" v-if="isShow">昨日
      <span class="small-number">
      <span v-if="increase > 0">+</span>
      {{increase}}
    </span>
    </div>
    <div class="number">{{total}}</div>
    <div class="tag"><span>{{title}}</span></div>
  </div>
</template>

<script>
  export default {
    name: "summaryCard",
    props: ['title', 'total', 'increase','isShow'],
    data() {
      return {}
    }
  }
</script>

<style scoped>

</style>