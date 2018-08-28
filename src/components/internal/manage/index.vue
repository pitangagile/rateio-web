<template>
  <b-row class="page">
    <b-col cols="12">
      <h1 class="page--title"><span class="icon-archive h4"></span> {{title}}</h1>
    </b-col>
    <b-col cols="12">
    </b-col>
  </b-row>
</template>

<script>
  /* eslint-disable */
  import Vue from "vue";
  import {ServerTable} from "vue-tables-2";
  import options from "../../../commons/helpers/grid.config";

  Vue.use(ServerTable, options, false, "bootstrap4", "default");

  export default {
    showLoading: true,
    data() {
      return {
        title: 'Rateio',
      };
    }
  }
</script>

<style lang="scss" scoped>
</style>
