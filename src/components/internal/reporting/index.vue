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
        <span slot="h__actions"></span>
        <div slot="actions" slot-scope="props" class="btn-toolbar">
          <edit v-bind:table="reportingsList" :row="props.row" :index="props.index" :totalHours="totalHours" @getAll="getAll()"/>
        </div>
        <div slot="afterFilter" class="column-period">
            <multiselect
              class="select-period"
              v-model="selected"
              :options="periods"
              :searchable="true"
              placeholder="Selecione o Período">
            </multiselect>
        </div>

        <div slot="afterFilter" class="column-period">
          <p class="reportedHours">Horas reportadas: {{this.totalHours}}</p>
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

Vue.use(ClientTable, options, false, 'bootstrap4', 'default');
Vue.component('multiselect', Multiselect);

export default {
  name: 'Reporting',
  removable: false,
  components: {
    edit,
  },
  showLoading: true,
  data() {
    return {
      selected: null,
      columns: ['period', 'costCenter', 'hours', 'actions'],
      reportingsList: [],
      periods: [],
      totalHours: 0,
      options: {
        sortable: [],
        columnsClasses: {
          actions: 'action-column text-center',
          period: 'period-column',
          costCenter: 'costCenter-Column',
          hours: 'hours-column',
        },
      },
    };
  },
  mounted() {
    this.getInitialData();
    this.getAll();
  },
  methods: {
    getTotalHours(reportings) {
      let result = 0;
      for (let i = 0, length = reportings.length; i < length; i += 1) {
        result += reportings[i].hours;
      }
      this.totalHours = result;
    },
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
      const url = 'period/getAll';

      this.$http().get(url).then((response) => {
        this.periods = response.data.map(data => data.description);
        this.selected = this.periods[this.periods.length - 1];
      });
    },
    getAll() {
      const url = 'reportings/getAll';

      this.$http().get(url).then((response) => {
        this.reportingsList = response.data;
      }).then(() => {
        this.getTotalHours(this.reportingsList);
      });
    },
    doSearch() {
      const url = 'reportings/search';
      const selected = this.selected;

      if (selected != null) {
        this.$http().post(url, { selected }).then((response) => {
          this.reportingsList = response.data;
        },
        (err) => {
          console.error('> sign-in.AllCenters() error!', err); // eslint-disable-line
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/variables.scss';

/deep/ td.action-column {
  width: 100px;
}
/deep/ td.period-column {
  width: 150px;
}
/deep/ td.hours-column {
  width: 100px;
}
.reportedHours{
  margin-left: 7.4px;
  margin-top: 14px;
  margin-right: 7px;
}


.column-period {
    float: left;
    margin-left: 15px;
    margin-top: 7.4px;

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
