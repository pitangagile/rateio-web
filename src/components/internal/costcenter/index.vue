<template>
  <b-row class="page">
    <b-col cols="12">
      <h1 class="page--title"><span class="icon-cog h4"></span> Centros de custo</h1>
    </b-col>

    <b-col cols="12">
      <v-server-table class="grid mt-3 mb-2" ref="grid"
        :columns="columns" :options="options" url="">
        <div slot="afterFilter" class="add-button">
            <novo @allCenters="AllCenters()"></novo>
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
import { ServerTable } from 'vue-tables-2';
import Vue from 'vue';
import options from './../../../commons/helpers/grid.config';
import novo from './new';
import remove from './remove';
import editar from './edit';

Vue.use(ServerTable, options, false, 'bootstrap4', 'default');

export default {
  name: 'CostCenter',
  components: {
    novo,
    remove,
    editar,
  },
  data() {
    const self = this;
    return {
      columns: ['code', 'description', 'actions'],
      tableCenter: [],
      options: {
        headings: {
          code: 'Código',
          description: 'Descrição',
          actions: '',
        },
        sortable: [],
        filterable: ['code', 'description'],
        columnsClasses: {
          actions: 'action-column text-center',
          code: 'code-column',
        },
        requestFunction(data) {
          return self.$http()
            .get('coastcenter', { params: data })
            .catch((e) => {
              this.dispatch('error', e);
            });
        },
        responseAdapter(response) {
          console.log(response); // eslint-disable-line
          return { data: response.data.data, count: response.data.count };
        },
      },
    };
  },
  methods: {
    refreshGrid() {
      this.$ref.grid.refresh();
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
/deep/ td.code-column {
  width: 250px;
}
</style>
