<template>
  <div class="tab-control">
    <div class="tab-control-item"
         :class="{active: currentIndex === index}"
         @click="itemClick(index)"
         v-for="(item, index) in titles">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
	export default {
		name: "TabControl",
    props: {
		  titles: {
		    type: Array,
        default() {
		      return []
        }
      }
    },
    data: function () {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick: function (index) {
        // 1.改变currentIndex
        this.currentIndex = index;

        // 2.发出事件
        this.$emit('itemClick', index)
      }
    }
	}
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;

    font-size: 24px;
    background-color: #fff;
    z-index: 9;
  }

  .tab-control-item {
    flex: 1;
    height: 40Px;
    line-height: 40Px;
  }

  .tab-control-item span {
    padding: 5px;
  }

  .active {
    color: #2b70c7;
  }

  .active span {
    border-bottom: 2px solid #2b70c7;
  }
</style>
