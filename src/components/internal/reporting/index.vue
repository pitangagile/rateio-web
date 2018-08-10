<template>
  <b-row class="page">
    <b-col cols="12">
      <h1 class="page--title"><span class="icon-doc-text h4"></span> {{title}}</h1>
    </b-col>
    <b-col cols="12">
      <div align="right">
        <add @refresh="refresh()"></add>
      </div>
      <v-server-table striped hover class="grid mt-3 mb-2" :url="urlApiGrid" :columns="columns" :options="options"
                      ref="grid">
        <div slot="period" slot-scope="props" class="btn-group">
          <label v-if="props.row.period">{{props.row.period.description.toUpperCase()}}</label>
        </div>
        <div slot="costCenter" slot-scope="props" class="btn-group">
          <label v-if="props.row.costCenter">{{props.row.costCenter.description}}</label>
        </div>
        <div slot="hours" slot-scope="props" class="btn-group mb-2">
          <b-progress :value="convertHoursToPercent(props.row.hours)" :max="100" show-progress animated
                      variant="success" style="width: 15em;"></b-progress>
        </div>
        <div slot="actions" slot-scope="props" class="btn-group">
          <b-btn v-on:click="removeCenter(props.row._id)" class="icon-trash" size="sm" variant="danger"
                 onmouseover="title='Remover'"></b-btn>
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
  const user_hours_per_month = 200;

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
            hours: 'Percentual de Alocação (%)',
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
      convertHoursToPercent(hours) {
        console.log('typeof hours > ', typeof hours);
        return ((hours / user_hours_per_month) * 100);
      },
      removeCenter(_id) {
        this.$http().delete('reporting', {params: {'_id': _id}}).then(() => {
          this.$swal(
            'Removido',
            'Reportagem removida.',
            'success',
            this.refresh(),
          );
        }, () => {
          this.$swal(
            'Erro',
            'Erro ao remover reportagem.',
            'error',
            this.refresh(),
          );
        });
      },
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
