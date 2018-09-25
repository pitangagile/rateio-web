<template>
  <b-row class="page">
    <b-col cols="12">
      <h1 class="page--title"><span class="icon-money h4"></span> {{title}}</h1>
    </b-col>

    <b-col cols="12">
      <v-server-table class="grid mt-3 mb-2" ref="grid"
                      :columns="columns" :options="options" url="" debounce="1500">
        <div slot="afterFilter" class="add-button">
          <add @allCenters="AllCenters()"></add>
        </div>
        <div slot="actions" slot-scope="props" class="btn-group">
          <editar :row="props.row" @allCenters="AllCenters()">editar</editar>
          <remove :row="props.row" @allCenters="AllCenters()">remover</remove>
        </div>
      </v-server-table>
    </b-col>
  </b-row>
</template>

<script>
  /* eslint-disable */
  import {ServerTable} from 'vue-tables-2';
  import Vue from 'vue';
  import options from './../../../commons/helpers/grid.config';
  import add from './add';
  import remove from './remove';
  import editar from './edit';

  Vue.use(ServerTable, options, false, 'bootstrap4', 'default');

  export default {
    name: 'CostCenter',
    components: {
      add,
      remove,
      editar,
    },
    data() {
      const self = this;
      return {
        title: 'Centros de Custo',
        columns: ['code', 'description', 'actions'],
        allCostCenters: [],
        options: {
          headings: {
            code: 'Código',
            description: 'Descrição',
            actions: 'Ações',
          },
          sortable: [],
          filterable: ['code', 'description'],
          columnsClasses: {
            actions: 'action-column text-center',
            code: 'code-column',
          },
          requestFunction(data) {
            return self.$http()
              .get('costcenter', {params: data})
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
    methods: {
      refresh() {
        this.$ref.grid.refresh();
      },
    },
  };
</script>

<style lang="scss" scoped>
  .add-button {
    float: left;
    padding-left: 5px;
  }

  /deep/ td.action-column {
    width: 200px;
  }

  /deep/ td.code-column {
    width: 250px;
  }
</style>
