<template>
  <b-row class="page">
    <b-col cols="12">
      <h1 class="page--title"><span class="icon-cog h4"></span> Gerenciar Rateio</h1>
    </b-col>
    <b-col cols="12">
      <v-client-table ref="grid" class="mt-5 mb-2" :data="collaboratorsList" :columns="columns" :options="options">
        <span style="width: 2px; height: 2px; line-height: 2px; margin-right: 1px; margin-left: 1px" slot="h__photo">#</span>
        <span style="width: 2px; height: 2px; line-height: 2px; margin-right: 1px; margin-left: 1px" slot="h__collaborator">Colaborador</span>
        <span slot="h__progress">Progresso</span>
        <span slot="h__actions"></span>
        <div slot="actions" slot-scope="props" class="btn-toolbar">
          <edit v-bind:table="collaboratorsList"  style="margin:1px 1px 2px -5px"/>
        </div>
        <div slot="collaborator" slot-scope="props">
          <div class="user-info">
            <strong>{{props.row.collaborator}}</strong>
          </div>
        </div>
        <div slot="afterFilter" style="margin-top: 7.4px;" class="column-period">
          <p>Data de início: 22/05/2018</p>
        </div>
        <div slot="afterFilter" style="margin-top: 7.4px;" class="column-period">
          <p>Data de fim: 21/06/2018</p>
        </div>
      </v-client-table>
    </b-col>
  </b-row>
</template>

<script>
import { ClientTable } from 'vue-tables-2';
import Vue from 'vue';
import Multiselect from 'vue-multiselect';
import options from './../../../commons/helpers/grid.config';

Vue.use(ClientTable, options, false, 'bootstrap4', 'default');
Vue.component('multiselect', Multiselect);

export default {
  name: 'Manage',
  showLoading: true,

  data() {
    return {
      selected: null,
      columns: ['photo', 'collaborator', 'progress', 'actions'],
      collaboratorsList: [{ photo: 'x', collaborator: 'Igor Formiga Alves', progress: 100 },
        { photo: 'x', collaborator: 'Ivaldo Barbosa', progress: 90 },
        { photo: 'x', collaborator: 'Thiago Ferreira', progress: 70 }],
      periods: [],
      totalHours: 0,
      options: {
        sortable: [],
        columnsClasses: {
          actions: 'action-column text-center',
          period: 'period-column',
          costCenter: 'costCenter-Column',
          hours: 'hours-column',
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.column-period {
    float: left;
    margin-left: 15px;

    /deep/ .select-period {
      .multiselect__tags {
        border-color: #ced4da;
        border-radius: 10cm;
        padding-top: 5px;
        min-height: 32px;
        font-size: .9rem;

        .multiselect__input {
          font-size: .9rem;
        }
      }

      .multiselect__select {
        height: 32px;
      }

      .multiselect__single{
        font-size: .9rem;
        margin: 0;
      }
    }
  }
  .user-info {
    text-transform: capitalize;
  }
</style>
