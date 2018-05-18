<template>
  <b-row class="page">
    <b-col cols="12">
      <h1 class="page--title"><span class="icon-calendar-1 h4"></span> Período</h1>
    </b-col>
 <b-col cols="12">
      <div id="coastCenters">
        <v-client-table class="table mt-5 mb-2" ref="grid" :data="reporting" :columns="columns" :options="options">
          <span slot="h__inicialdate">Data Inicial</span>
          <span slot="h__finaldate">Data Final</span>
          <span slot="h__closedate">Data Fechamento</span>
          <span slot="h__generationdate">Data Geração Rateio</span>
          <span slot="h__actions"></span>
          <div slot="actions" slot-scope="props" class="btn-group">
            <b-button :table="reporting" :row="props.row"  >editar</b-button>
          </div>
          <div slot="afterFilter" class="add-button">
            <novo :table="reporting"></novo>
          </div>
        </v-client-table>
      </div>
    </b-col>

  </b-row>
</template>

<script>
import { ClientTable } from 'vue-tables-2';
import Vue from 'vue';
import options from './../../../commons/helpers/grid.config';
import novo from './new';

Vue.use(ClientTable, options, false, 'bootstrap4', 'default');

export default {
  name: 'Period',
  components: {
    novo,
  },
  data() {
    return {
      columns: ['inicialdate', 'finaldate', 'closedate', 'generationdate', 'action'],
      reporting: [],
      options: {
        sortable: [],
        filterable: [],
        columnsClasses: {
          actions: 'action-column text-center',
        },
      },
    };
  },
  methods: {

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
/deep/ td.code-column {
  width: 250px;
}
</style>
