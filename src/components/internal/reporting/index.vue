<template>
  <b-row class="page">
    <b-col cols="12">
      <h1 class="page--title"><span class="icon-cog h4"></span> Reportagem</h1>
    </b-col>
    <b-col cols="12">
    <div>
    <b-form inline>
      <label class="mr-sm-2" for="inlineFormCustomSelectPref">Período</label>
      <b-form-select class="mb-2 mr-sm-2 mb-sm-0"
                     :value="null"
                     :options="{ '1': 'January', '2': 'February', '3': 'March' }"
                     id="inlineFormCustomSelectPref">
        <option slot="first" :value="null">Mês</option>
      </b-form-select>
    </b-form>
  </div>

      <v-client-table ref="grid" class="mt-5 mb-2" :data="tableData" :columns="columns" :options="options">
        <span slot="h__period">Período</span>
        <span slot="h__costCenter">Centro de custo</span>
        <span slot="h__hours">Horas</span>
        <span slot="h__buttons"></span>
        <div slot="buttons" slot-scope="props" class="btn-toolbar">
          <edit style="margin:13px 12px 12px 10px"/>
          <erase style="margin:13px 12px 12px 10px"/>
        </div>
      </v-client-table>
    </b-col>
  </b-row>
</template>

<script>
import { ClientTable } from 'vue-tables-2';
import Vue from 'vue';
import options from './../../../commons/helpers/grid.config';
import edit from './edit';
import erase from './erase';

Vue.use(ClientTable, options, false, 'bootstrap4', 'default');

export default {
  name: 'Reporting',
  components: {
    edit,
    erase,
  },
  showLoading: true,
  data() {
    return {
      columns: ['period', 'costCenter', 'hours', 'buttons'],
      tableData: [],
      options: {

      },
    };
  },
  mounted() {
    this.AllCenters();
  },
  methods: {
    AllCenters() {
      const url = 'getReportings';

      this.$NProgress().start();

      this.$http().get(url).then((response) => {
        this.tableData = response.data;
        this.$NProgress().done();
      },
      (err) => {
        this.$NProgress().done();
        console.error('> sign-in.AllCenters() error!', err); // eslint-disable-line
      });
    },
    getCenterData(id) {
      return this.tableData.filter(u => u.id === id)[0];
    },
    removeReporting(index) {
      this.tableData.splice(index, 1);
    },
    getUserData(id) {
      return this.tableData.filter(u => u.id === id)[0];
    },
    changeValue(id, prop, value) {
      this.getUserData(id)[prop] = value;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
