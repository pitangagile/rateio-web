<template>
  <b-row class="page">
    <b-col cols="12">
      <h1 class="page--title"><span class="icon-cog h4"></span> Centros de custo</h1>
      <new-edit v-bind:table="tableCenter"></new-edit>
    </b-col>

    <b-col cols="12">
      <v-client-table ref="grid" class="mt-5 mb-2" :data="tableCenter" :columns="columns" :options="options" :v-for="item in tableCenter">
          <span slot="h__id">Id</span>
          <span slot="h__code">Codigo</span>
          <span slot="h__description">Centro de custo</span>
          <span slot="h__Edit"></span>
          <div slot="Edit" slot-scope="props" class="btn-group">
            <button v-on:click="remover(item)">Editar</button>
            <Remove v-bind:table="tableCenter">Remover</Remove>
        </div>

      </v-client-table>
    </b-col>
  </b-row>
</template>

<script>
import { ClientTable } from 'vue-tables-2';
import Vue from 'vue';
import options from './../../../commons/helpers/grid.config';
import NewEdit from './new-edit';
import Remove from './remove';

Vue.use(ClientTable, options, false, 'bootstrap4', 'default');

export default {
  name: 'CostCenter',
  components: {
    NewEdit,
    Remove,
  },
  data() {
    return {
      columns: ['id', 'code', 'description', 'Edit'],
      tableCenter: [],
      item: { code: '', description: '' },
      options: {
        sortable: ['code'],
        filterable: ['code', 'desccription'],
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
    remover() {
      const item = this.id;
      this.tableCenter.splice(item, 1);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
