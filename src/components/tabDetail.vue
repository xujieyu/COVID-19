<template>
  <div>
    <distributionMap :map-value="childInfo.mapInfo" :map-province="childInfo.provinceName"></distributionMap>
    <distributionTable :mychildren="childInfo.table"></distributionTable>
  </div>
</template>

<script>
  import distributionTable from "./distributionTable";
  import distributionMap from "./distributionMap";

  export default {
    name: "tabDetail",
    components: {
      distributionTable,
      distributionMap,
    },
    props:{
      childInfo:{
        type: Object,
        default: {}
      }
    }
  }
</script>

<style scoped>

</style>