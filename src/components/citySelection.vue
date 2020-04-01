<template>
  <div id="city-selection">
    <button class="switch-city-btn" @click="openSwitchCity">切换城市</button>
    <van-popup class="popup-picker" :style="{width: ''+ picker_width + 'px'}" v-model="isOpen" position="bottom" get-container="#index">
      <van-picker class="picker"
                  show-toolbar
                  title="选择城市"
                  :overlay="false"
                  :columns="items"
                  :style="{ height: '400px',width: ''+ picker_width + 'px'}"
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
        isOpen: false,
        picker_width: 0,
      }
    },
    watch: {
      show(val) {
        this.isOpen = val
      }
    },
    mounted() {
      let index_width = document.getElementById('tab-control');
      this.picker_width = index_width.offsetWidth;
      window.addEventListener("resize", this.handleChange);
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
      handleChange(){
        let index_width = document.getElementById('tab-control');
        console.log(index_width.offsetWidth);
        this.picker_width = index_width.offsetWidth;
      }
    },
    beforeDestroy() {
      window.removeEventListener("resize", this.handleChange);
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
  .van-overlay {
    position: absolute;
  }
  .van-popup {
    position: absolute;
  }
  .popup-picker
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;

</style>