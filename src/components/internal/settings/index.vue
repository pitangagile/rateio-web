<template>
  <div>
    <b-row nam="title" class="page">
      <b-col cols="12">
        <h1 class="page--title">{{title}}</h1>
      </b-col>
    </b-row>
    <b-row nam="basic_information">
      <b-col cols="12">
        <basic v-bind:user="user"></basic>
      </b-col>
    </b-row>
    <b-row name="coast_centers">
      <b-col cols="12">
        <cc></cc>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  /* eslint-disable */
  import Vue from 'vue';
  import Basic from './basic';
  import Cc from './cc';

  export default {
    components: {
      Basic,
      Cc,
    },
    name: 'Settings',
    showLoading: true,
    data() {
      return {
        title: 'Configurações do colaborador',
      }
    },
    computed: {
      user() {
        return this.$store.getters['auth/user'];
      },
    },
  };
</script>

<style lang="scss" scoped>
  .page--title {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .add-button {
    float: left;
    margin-left: 15px;
  }

  /deep/ td.action-column {
    width: 200px;
  }

  .multiselect--active {
    z-index: 100;
  }

  .control-label {
    float: left;
    width: 155px;
    top: 7px;
    padding-left: 0px;
    padding-right: 0px;
  }

  .form-control {
    width: 60px;
    padding-bottom: 4px;
    padding-top: 4px;
  }

  .coastcenter {
    width: 550px;
  }

</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
