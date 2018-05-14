<template>
  <b-row class="page">
    <b-col cols="12">
      <h1 class="page--title"><span class="icon-cog h4"></span> Reportagem</h1>
    </b-col>
    <b-col cols="12">
      <v-client-table ref="grid" class="mt-5 mb-2" :data="getCenterData(selected)" :columns="columns" :options="options">
        <span style="width: 2px; height: 2px; line-height: 2px; margin-right: 1px; margin-left: 1px" slot="h__period">Período</span>
        <span style="width: 2px; height: 2px; line-height: 2px; margin-right: 1px; margin-left: 1px" slot="h__costCenter">Centro de custo</span>
        <span slot="h__hours">Horas</span>
        <span id="test" slot="h__buttons"></span>
        <div slot="buttons" slot-scope="props" class="btn-toolbar">
          <edit v-bind:table="reportingsList" :row="props.index" style="margin:1px 1px 2px -5px"/>
          <erase hidden=true v-bind:table="reportingsList" :row="props.index" style="margin:20px 12px 12px 10px"/>
          <novo v-bind:table="reportingsList"/>
        </div>
        <div slot="afterFilter" style="margin-top: 7.4px;" class="column-period">
            <multiselect
              class="select-period"
              v-model="selected"
              :options="periods"
              :searchable="true"
              placeholder="Selecione o Período">
            </multiselect>
        </div>
      </v-client-table>
    </b-col>
  </b-row>
</template>

<script>
import { ClientTable } from 'vue-tables-2';
import Vue from 'vue';
import Multiselect from 'vue-multiselect';
import options from './../../../commons/helpers/grid.config';
import edit from './edit';
import erase from './erase';
import Novo from './novo';

Vue.use(ClientTable, options, false, 'bootstrap4', 'default');
Vue.component('multiselect', Multiselect);
Vue.component('novo', Novo);

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
      reportingsList: [
        { period: 'January/2018', costCenter: '1.1.1.001 Centro de custo', hours: 10 },
        { period: 'February/2018', costCenter: '1.1.1.002 Centro de custo 2', hours: 20 },
        { period: 'March/2018', costCenter: '1.1.1.003 Centro de custo 3', hours: 30 }],
      periods: ['January/2018', 'February/2018', 'March/2018'],
      options: {
        sortable: [],
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

      this.$http().post(url, { period: 'April' }).then((response) => {
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
@import '../../../assets/styles/variables.scss';

/deep/ td.action-column {
  width: 200px;
}
/deep/ td.code-column {
  width: 250px;
}

.column-period {
    float: left;
    margin-left: 15px;

    /deep/ .select-period {
      .multiselect__tags {
        border-color: #ced4da;
        border-radius: 10cm;
        padding-top: 5px;
        min-height: 32px;
        font-size: .9rem;

        .multiselect__input {
          font-size: .9rem;
        }
      }

      .multiselect__select {
        height: 32px;
      }

      .multiselect__single{
        font-size: .9rem;
        margin: 0;
      }
    }
  }
</style>
