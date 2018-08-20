<template>
  <b-row class="page">
    <b-col cols="12">
      <h1 class="page--title"><span class="icon-calendar-1 h4"></span> {{title}}</h1>
    </b-col>
    <b-col cols="12">
      <v-server-table class="grid mt-3 mb-2" :url="urlApiGrid" :columns="columns" :options="options">
        <div slot="afterFilter" class="add-button">
          <b-button variant="success" class="add-button" style="margin-left: 15px;">Adicionar</b-button>
        </div>
        <div slot="description" slot-scope="props">
          <label>{{props.row.description | toUpper }}</label>
        </div>
        <div slot="initialDate" slot-scope="props">
          <label>{{props.row.initialDate | dateFormat }}</label>
        </div>
        <div slot="finalDate" slot-scope="props">
          <label>{{props.row.finalDate | dateFormat }}</label>
        </div>
      </v-server-table>
    </b-col>

  </b-row>
</template>

<script>
  /* eslint-disable */
  import Vue from 'vue';
  import {ServerTable} from 'vue-tables-2';
  import options from './../../../commons/helpers/grid.config';
  import variables from './../../../commons/helpers/variables';
  import moment from 'moment';

  Vue.use(ServerTable, options, false, 'bootstrap4', 'default');

  export default {
    name: 'Period',
    components: {},
    data() {
      return {
        title: 'Período',
        urlApiGrid: `${variables.http.root}period`,
        columns: ['description', 'initialDate', 'finalDate', 'closuremanagers', 'generationdate'],
        reporting: [],
        options: {
          headings: {
            description: 'Descrição',
            initialDate: 'Início',
            finalDate: 'Término',
            closuremanagers: 'Fechamento Gerente',
            generationdate: 'Geração Consolidada',
          },
          sortable: [],
          filterable: ['description'],
          columnsClasses: {
            actions: 'action-column text-center',
          },
          requestFunction(data) {
            return this.$http().get('period', {params: data})
              .catch((e) => {
                this.dispatch('error', e);
              });
          },
          responseAdapter(response) {
            return response.data;
          },
        },
      };
    },
    methods: {},
    filters : {
      toUpper(value){
        if (value !== null && value !== undefined){
          return value.toUpperCase();
        }
      },
      dateFormat: function(value) {
        if (value) {
          return moment(String(value)).format("DD/MM/YYYY");
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
</style>
