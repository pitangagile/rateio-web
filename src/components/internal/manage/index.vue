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
  import Vue from 'vue';
  import options from './../../../commons/helpers/grid.config';

  export default {
    showLoading: true,
    data() {
      return {
        title: 'Rateio',
      };
    },
    mounted() {
    },
    methods: {
    },
  };
</script>

<style lang="scss" scoped>
</style>
