<template>
  <b-row class="page">
    <b-col cols="12">
      <h1 class="page--title"><span class="icon-cog h4"></span> Centros de custo</h1>

    </b-col>

    <b-col cols="12">
      <div id="coastCenters">
        <v-client-table class="table mt-5 mb-2" ref="grid" :data="tableCenter" :columns="columns" :options="options">
          <span slot="h__code">Codigo</span>
          <span slot="h__description">Centro de custo</span>
          <span slot="h__actions"></span>
          <div slot="actions" slot-scope="props" class="btn-group">
            <editar :row="props.row">editar</editar>
            <remove :row="props.row" >remover</remove>
          </div>
          <div slot="afterFilter" class="add-button">
            <novo @allCenters="AllCenters()"></novo>
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
import remove from './remove';
import editar from './edit';

Vue.use(ClientTable, options, false, 'bootstrap4', 'default');

export default {
  name: 'CostCenter',
  components: {
    novo,
    remove,
    editar,
  },
  data() {
    return {
      columns: ['code', 'description', 'actions'],
      tableCenter: [],
      options: {
        sortable: [],
        filterable: ['code', 'description'],
        columnsClasses: {
          actions: 'action-column text-center',
          code: 'code-column',
        },
      },
    };
  },
  mounted() {
    this.AllCenters();
  },
  methods: {
    AllCenters() {
      const url = 'coastcenter/getAll';

      this.$NProgress().start();

      this.$http().get(url).then((response) => {
        this.tableCenter = response.data;
        this.$NProgress().done();
      });
    },
    // TODO: metodo api remocao
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
