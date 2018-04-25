<template>
  <b-row class="page">
    <b-col cols="12">
      <h1 class="page--title"><span class="icon-cog h4"></span> Centros de custo</h1>
    </b-col>
     <NewEdit style="margin:13px 12px 12px 10px"/>

    <b-col cols="12">
      <v-client-table ref="grid" class="mt-5 mb-2" :data="tableCenter" :columns="columns" :options="options">
          <span slot="h__codigo">Codigo</span>
          <span slot="h__descricao">Centro de custo</span>
          <span slot="h__Edit"></span>
          <div slot="Edit" slot-scope="props" class="btn-group">
            <button type="button" class="btn btn-primary" v-on:click="onChange(id)">Editar</button>
            <button type="button" class="btn btn-danger" v-on:click="removeCenter(id)">Remover</button>
        </div>

      </v-client-table>
    </b-col>
  </b-row>
</template>

<script>
import { ClientTable } from 'vue-tables-2';
import Vue from 'vue';
import options from './../../../commons/helpers/grid.config';
import NewEdit from './newEdit';

Vue.use(ClientTable, options, false, 'bootstrap4', 'default');

export default {
  name: 'CostCenter',
  components: {
    NewEdit,
  },
  showLoading: true,
  data() {
    return {
      columns: ['codigo', 'descricao', 'Edit'],
      tableCenter: [],
      options: {
        sortable: ['codigo'],
        filterable: ['codigo', 'descricao'],
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
      },
      (err) => {
        this.$NProgress().done();
        console.error('> sign-in.AllCenters() error!', err); // eslint-disable-line
      });
    },
    getCenterData(id) {
      return this.tableCenter.filter(u => u.id === id)[0];
    },
    changeValue(id, prop, value) {
      this.getCenterData(id)[prop] = value;
    },
    // TODO: metodo api remocao
    removeCenter(index) {
      this.tableCenter.splice(index, 1);
    },

  },
};
</script>

<style lang="scss" scoped>

</style>
