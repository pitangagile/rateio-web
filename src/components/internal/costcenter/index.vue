<template>
  <b-row class="page">
    <b-col cols="12">
      <h1 class="page--title"><span class="icon-cog h4"></span> Centros de custo</h1>
      <new-edit v-bind:table="tableCenter"></new-edit>
    </b-col>

    <b-col cols="12">
      <v-client-table ref="grid" class="mt-5 mb-2" :data="tableCenter" :columns="columns" :options="options">
        <span slot="h__code">Codigo</span>
        <span slot="h__description">Centro de custo</span>
        <span slot="h__Edit"></span>
        <div slot="Edit" slot-scope="props" class="btn-toolbar">
          <Editar v-bind:table="tableCenter" :row="props.index">Editar</Editar>
          <Remove v-bind:table="tableCenter" :row="props.index">Remover</Remove>
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
      columns: ['code', 'description', 'Edit'],
      tableCenter: [],
      options: {
        sortable: ['code'],
        filterable: ['code', 'description'],
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

</style>
