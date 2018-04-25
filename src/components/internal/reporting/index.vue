<template>
  <b-row class="page">
    <b-col cols="12">
      <h1 class="page--title"><span class="icon-doc-text h4"></span> Reportagem</h1>
    </b-col>

    <b-col cols="12">
      <v-client-table ref="grid" class="mt-5 mb-2" :data="tableData" :columns="columns" :options="options">
        <span slot="h__id">Matrícula</span>
        <span slot="h__name">Nome</span>
        <span slot="h__age">Idade</span>
        <span slot="h__active">Ativo</span>

        <toggle-button  slot="active" slot-scope="props"
                        :value="props.row.active"
                        :sync="true"
                        @change="changeValue(props.row.id, 'active', $event.value)" />
      </v-client-table>
    </b-col>
  </b-row>
</template>

<script>
import { ClientTable } from 'vue-tables-2';
import Vue from 'vue';
import options from './../../../commons/helpers/grid.config';

Vue.use(ClientTable, options, false, 'bootstrap4', 'default');

export default {
  name: 'Reporting',
  showLoading: true,
  data() {
    return {
      columns: ['id', 'name', 'age', 'active'],
      tableData: [
        { id: 1, name: 'John 1', age: 20, active: false },
        { id: 2, name: 'Jane 1', age: 24, active: true },
        { id: 3, name: 'Susan 1', age: 16, active: true },
        { id: 4, name: 'Chris 1', age: 55, active: false },
        { id: 5, name: 'Dan 1', age: 40, active: true },
        { id: 6, name: 'John 2', age: 20, active: true },
        { id: 7, name: 'Jane 2', age: 24, active: true },
        { id: 8, name: 'Susan 2', age: 16, active: true },
        { id: 9, name: 'Chris 2', age: 55, active: true },
        { id: 10, name: 'Dan 3', age: 40, active: false },
        { id: 11, name: 'John 3', age: 20, active: true },
        { id: 12, name: 'Jane 3', age: 24, active: true },
        { id: 13, name: 'Susan 3', age: 16, active: false },
        { id: 14, name: 'Chris 3', age: 55, active: true },
        { id: 15, name: 'Dan 3', age: 40, active: true },
      ],
      options: {
        sortable: ['name', 'age'],
        filterable: ['name', 'age'],
        editable: ['name', 'age'],
      },
    };
  },
  methods: {
    getUserData(id) {
      return this.tableData.filter(u => u.id === id)[0];
    },
    changeValue(id, prop, value) {
      this.getUserData(id)[prop] = value;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
