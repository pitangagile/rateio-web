<template>
  <b-row class="page">
    <b-col cols="12">
      <h1 class="page--title"><span class="icon-calendar-1 h4"></span> Período</h1>
    </b-col>
 <b-col cols="12">
      <div id="coastCenters">
        <v-client-table class="table mt-5 mb-2" ref="grid" :data="reporting" :columns="columns" :options="options">
          <span slot="h__initialdate">Data Inicial</span>
          <span slot="h__finaldate">Data Final</span>
          <span slot="h__closedate">Data Fechamento</span>
          <span slot="h__generationdate">Data Geração Rateio</span>
          <span slot="h__action"></span>
          <div slot="action" slot-scope="props" class="btn-group">
            <remove :row="props.row" >editar</remove>
          </div>
          <div slot="afterFilter" class="add-button">
            <novo></novo>
          </div>
        </v-client-table>
      </div>
    </b-col>

  </b-row>
</template>

<script>
import { ClientTable } from 'vue-tables-2';
import Vue from 'vue';
import * as moment from 'moment';
import options from './../../../commons/helpers/grid.config';
import novo from './new';
import remove from './remove';

Vue.use(ClientTable, options, false, 'bootstrap4', 'default');

export default {
  name: 'Period',
  components: {
    novo,
    remove,
    moment,
  },
  data() {
    return {
      columns: ['initialdate', 'finaldate', 'closedate', 'generationdate', 'action'],
      reporting: [],
      options: {
        sortable: [],
        filterable: [],
        columnsClasses: {
          actions: 'action-column text-center',
        },
        dateColumns: ['initialdate', 'finaldate', 'closedate', 'generationdate'],
        toMomentFormat: 'YYYY-MM-DD',
      },
    };
  },
  mounted() {
    this.allPeriods();
  },
  methods: {
    allPeriods() {
      const url = 'period/getAll';

      this.$http().get(url).then((response) => {
        this.reporting = response.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.add-button {
    float: left;
    margin-left: 15px;
}
/deep/ td.action-column {
  width: 200px;
}
</style>
