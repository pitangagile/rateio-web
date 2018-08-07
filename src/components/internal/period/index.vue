<template>
  <b-row class="page">
    <b-col cols="12">
      <h1 class="page--title"><span class="icon-calendar-1 h4"></span> Período</h1>
    </b-col>
 <b-col cols="12">
      <div id="costCenters">
        <v-client-table class="table mt-4 mb-2" ref="grid" :data="reporting" :columns="columns" :options="options">
          <span slot="h__description">Descrição</span>
          <span slot="h__initialDate">Início</span>
          <span slot="h__finalDate">Término</span>
          <span slot="h__closuredate">Fechamento reportagem</span>
          <span slot="h__closuremanagers">Fechamento gerentes</span>
          <span slot="h__generationdate">Geração consolidada  </span>
          <span slot="h__action"></span>
          <div slot="action" slot-scope="props" class="btn-group">
            <remove :row="props.row"  @allPeriods="allPeriods()"></remove>
            <close :row="props.row" @allPeriods="allPeriods()"></close>
            <generation :row="props.row" @allPeriods="allPeriods()"></generation>
          </div>
          <div slot="afterFilter" class="add-button">
            <novo @allPeriods="allPeriods()"></novo>
          </div>
        </v-client-table>
      </div>
    </b-col>

  </b-row>
</template>

<script>
  /* eslint-disable */
import { ClientTable } from 'vue-tables-2';
import Vue from 'vue';
import options from './../../../commons/helpers/grid.config';
import novo from './new';
import remove from './remove';
import close from './close';
import generation from './generation';

Vue.use(ClientTable, options, false, 'bootstrap4', 'default');

export default {
  name: 'Period',
  components: {
    novo,
    remove,
    close,
    generation,
  },
  data() {
    return {
      columns: ['description', 'initialDate', 'finalDate', 'closuredate', 'closuremanagers', 'generationdate', 'action'],
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
  mounted() {
    this.allPeriods();
  },
  methods: {
    allPeriods() {
      const url = 'period';

      this.$http().get(url).then((response) => {
        this.reporting = response.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ td.action-column {
  width: 200px;
}
</style>
