<template>
  <b-row class="page">
    <b-col cols="12">
      <h1 class="page--title"><span class="icon-cog h4"></span> Centros de custo</h1>
      <new-edit v-bind:table="tableCenter"></new-edit>
    </b-col>

    <b-col cols="12">
      <v-client-table class="table mt-5 mb-2" ref="grid" :data="tableCenter" :columns="columns" :options="options">
        <span slot="h__code">Codigo</span>
        <span slot="h__description">Centro de custo</span>
        <span slot="h__actions"></span>
        <div slot="actions" slot-scope="props" class="btn-group">
          <Editar :table="tableCenter" :row="props.index">Editar</Editar>
          <Remove :table="tableCenter" :row="props.index">Remover</Remove>
        </div>
      </v-client-table>
    </b-col>

  </b-row>
</template>

<script>
import { ClientTable } from 'vue-tables-2';
import Vue from 'vue';
import options from './../../../commons/helpers/grid.config';
import NewEdit from './new';
import Remove from './remove';
import Editar from './edit';

Vue.use(ClientTable, options, false, 'bootstrap4', 'default');

export default {
  name: 'CostCenter',
  components: {
    NewEdit,
    Remove,
    Editar,
  },
  data() {
    return {
      columns: ['code', 'description', 'actions'],
      tableCenter: [],
      options: {
        sortable: ['code'],
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
      const url = 'getCoastCenters';

      this.$NProgress().start();

      this.$http().get(url).then((response) => {
        this.tableCenter = response.data;
        this.$NProgress().done();
      });
    },
    getCenterData(id) {
      return this.tableCenter.filter(u => u.id === id)[0];
    },
    changeValue(id, prop, value) {
      this.getCenterData(id)[prop] = value;
    },
    // TODO: metodo api remocao
  },
};
</script>

<style lang="scss" scoped>
/deep/ td.action-column {
  width: 200px;
}
/deep/ td.code-column {
  width: 250px;
}
</style>
