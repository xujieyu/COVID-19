<template>
  <div>
    <button class="switch-city-btn" @click="openSwitchCity">切换城市</button>
    <van-popup v-model="isOpen" position="bottom">
      <van-picker class="picker"
                  show-toolbar
                  title="选择城市"
                  :overlay="false"
                  :columns="items"
                  :style="{ height: '500px'}"
                  @cancel="onCancel"
                  @confirm="onConfirm"
                  @change="onChange"/>
    </van-popup>
  </div>
</template>

<script>
  export default {
    name: "citySelection",
    props:{
      items: {
        type: Array,
        default:[]
      },
    },
    data() {
      return {
        isOpen: false
      }
    },
    watch: {
      show(val) {
        this.isOpen = val
      }
    },
    methods: {
      openSwitchCity() {
        this.isOpen = true;
      },
      onConfirm(picker, value, index) {
        this.isOpen = false;
        if (value < this.items.length) {
          this.$emit('selectedCity', this.items[value]);
        }
      },
      onChange(picker, value, index) {
        if (value < this.items.length) {
          this.$emit('selectedCity', this.items[value]);
        }
      },
      onCancel() {
        this.isOpen = false;
        this.$emit('openShow', false)
      },
    }
  }
</script>

<style lang="stylus">
  .picker .van-picker-column,
  .picker .van-picker__toolbar,
  .picker .van-picker__confirm,
  .picker .van-picker__title,
  .picker .van-picker__cancel
    font-size 20px !important

</style>