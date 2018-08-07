<template>
  <b-row class="page">
    <b-col cols="12">
      <h1 class="page--title"><span class="icon-cog h4">{{title}}</span></h1>
    </b-col>
    <b-col cols="12">
      <div align="right">
        <add @refresh="refresh()"></add>
      </div>
      <v-server-table striped hover class="grid mt-3 mb-2" :url="urlApiGrid" :columns="columns" :options="options"
                      ref="grid">
        <div slot="actions" slot-scope="props" class="btn-group">
          <!--<b-btn v-on:click="removeCenter(props.row._id)" class="icon-trash" size="lg" variant="link" onmouseover="title='Remover'"></b-btn>-->
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
  import add from './add';

  Vue.use(ServerTable, options, false, 'bootstrap4', 'default');

  // FIXME: Buscar usuário da sessão
  const user_id = '5b6240f74855b1272d7d500e';

  export default {
    name: 'Reporting',
    removable: false,
    showLoading: true,
    components: {add},
    data() {
      return {
        title: 'Reportagem',
        period: null,
        urlApiGrid: `${variables.http.root}reporting/findReportsByUserId`,
        columns: ['period', 'costCenter', 'hours', 'actions'],
        options: {
          headings: {
            period: 'Período',
            costCenter: 'Centro de Custo',
            hours: 'Horas',
            actions: 'Ações',
          },
          sortable: ['costCenter'],
          filterable: false,
          columnsClasses: {
            actions: 'action-column text-center',
          },
          requestFunction(data) {
            return this.$http().get('reporting/findReportsByUserId', {params: {data, 'user_id': user_id}})
              .catch((e) => {
                this.dispatch('error', e);
              });
          },
          responseAdapter(response) {
            return response.data;
          },
        },
      }
    }, methods: {
      refresh() {
        this.$refs.grid.refresh();
      }
    },
  };
</script>

<style lang="scss" scoped>
  #select {
    padding: 20px 0px 20px 0px;
    max-width: 300px;
  }
</style>
