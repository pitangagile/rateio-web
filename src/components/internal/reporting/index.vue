<template>
  <b-row class="page">
    <b-col cols="12">
      <h1 class="page--title"><span class="icon-cog h4"></span> Reportagem</h1>
    </b-col>
    <b-col cols="12">
    <div>
      <b-form inline>
        <label class="mr-sm-2" for="inlineFormCustomSelectPref">Período</label>
        <v-select label="text" v-model="selected" :options="periods"></v-select>
      </b-form>
    </div>
      <v-client-table ref="grid" class="mt-5 mb-2" :data="getCenterData(selected)" :columns="columns" :options="options">
        <span style="width: 2px; height: 2px; line-height: 2px; margin-right: 1px; margin-left: 1px" slot="h__period">Período</span>
        <span style="width: 2px; height: 2px; line-height: 2px; margin-right: 1px; margin-left: 1px" slot="h__costCenter">Centro de custo</span>
        <span slot="h__hours">Horas</span>
        <span id="test" slot="h__buttons"></span>
        <div slot="buttons" slot-scope="props" class="btn-toolbar">
          <edit v-bind:table="reportingsList" :row="props.index" style="margin:1px 1px 2px -5px"/>
          <erase hidden=true v-bind:table="reportingsList" :row="props.index" style="margin:20px 12px 12px 10px"/>
        </div>
      </v-client-table>
    </b-col>
  </b-row>
</template>

<script>
import { ClientTable } from 'vue-tables-2';
import Vue from 'vue';
import vSelect from 'vue-select';
import options from './../../../commons/helpers/grid.config';
import edit from './edit';
import erase from './erase';

Vue.use(ClientTable, options, false, 'bootstrap4', 'default');
Vue.component('v-select', vSelect);

export default {
  name: 'Reporting',
  removable: false,
  components: {
    edit,
    erase,
  },
  showLoading: true,
  data() {
    return {
      selected: null,
      columns: ['period', 'costCenter', 'hours', 'buttons'],
      reportingsList: [],
      periods: ['January/2018', 'February/2018', 'March/2018'],
      options: {
      },
    };
  },
  mounted() {
    this.getInitialData();
  },
  methods: {
    getCenterData(period) {
      let table;
      if (period === null) {
        table = this.reportingsList;
      } else {
        table = this.reportingsList.filter(u => u.period === period);
      }
      return table;
    },
    getUserData(id) {
      return this.reportingsList.filter(u => u.id === id)[0];
    },
    getInitialData() {
      const url = 'reporting';

      this.$http().get(url).then((response) => {
        this.periods = response.data.periods;
      });
    },
    doSearch() {
      const url = 'reporting/search';

      this.$http().post(url, { period: this.selected }).then((response) => {
        console.log(response); // eslint-disable-line
        this.reportingsList = response.data;
      },
      (err) => {
        console.error('> sign-in.AllCenters() error!', err); // eslint-disable-line
      });
    },
    changeValue(id, prop, value) {
      this.getUserData(id)[prop] = value;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
