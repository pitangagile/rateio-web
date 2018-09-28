<template>
  <b-container fluid class="px-0">
    <router-view/>
    <vue-snotify/>
    <span v-show="false">App version: {{ $env.app.version }}</span>
  </b-container>
</template>

<script>
  /* eslint-disable */
  export default {
    name: 'App',
    showLoading: true,
  };
</script>

<style lang="scss">
  @import './assets/styles/variables.scss';

  html, body {
    height: 100%;
    width: 100%;
  }
</style>
