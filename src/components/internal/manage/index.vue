<template>
  <b-row class="page">
    <b-col cols="12">
      <h1 class="page--title"><span class="icon-cog h4"></span> Gerenciar Rateio</h1>
    </b-col>
    <b-col cols="12">
      <v-client-table ref="grid" class="mt-5 mb-2" :data="collaboratorsList" :columns="columns" :options="options">
        <span slot="h__photo">#</span>
        <span slot="h__collaborator">Colaborador</span>
        <span slot="h__progress">Progresso</span>
        <span slot="h__actions"></span>
        <div slot="progress" slot-scope="props">
          <b-progress :value="props.row.progress" :max="100" class="user-progress" show-progress></b-progress>
        </div>
        <div slot="photo" slot-scope="props">
          <img :src="props.row.photo" class="user-picture">
        </div>
        <div slot="actions" slot-scope="props" class="btn-toolbar">
          <edit v-bind:table="collaboratorsList"/>
        </div>
        <div slot="collaborator" slot-scope="props">
          <div class="user-info">
            <strong>{{props.row.collaborator}}</strong>
          </div>
        </div>
        <div slot="afterFilter" style="margin-top: 7.4px;" class="column-period">
            <multiselect
              class="select-period"
              v-model="selected"
              :options="periods"
              :searchable="true"
              placeholder="Selecione o Período">
            </multiselect>
        </div>
        <div slot="afterFilter" class="column-period">
          <p>Data de início: 22/05/2018</p>
        </div>
        <div slot="afterFilter" class="column-period">
          <p>Data de fim: 21/06/2018</p>
        </div>
        <div slot="afterFilter">
          <b-button class="btn-danger">Fechar</b-button>
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
import edit from './edit';

Vue.use(ClientTable, options, false, 'bootstrap4', 'default');
Vue.component('multiselect', Multiselect);

export default {
  name: 'Manage',
  showLoading: true,
  components: {
    edit,
  },

  data() {
    return {
      selected: null,
      columns: ['photo', 'collaborator', 'progress', 'actions'],
      collaboratorsList: [{ photo: '/static/img/avatars/1.jpg', collaborator: 'Igor Formiga', progress: 100 },
        { photo: '/static/img/avatars/2.jpg', collaborator: 'Ivaldo Barbosa', progress: 90 },
        { photo: '/static/img/avatars/3.jpg', collaborator: 'Thiago Ferreira', progress: 70 }],
      periods: [],
      totalHours: 0,
      options: {
        sortable: [],
        columnsClasses: {
          actions: 'action-column text-center',
          photo: 'photo-column',
          collaborator: 'collaborator-column',
          progress: 'progress-column',
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/variables.scss';

  /deep/ .user-progress {
    &.success { .progress-bar { background-color: $color-success ; } }
    &.danger { .progress-bar { background-color: $color-danger; } }
    &.warning { .progress-bar { background-color: $color-warning; } }
    &.info { .progress-bar { background-color: $color-info; } }
    width: 50%
  }

/deep/ td.action-column {
  width: 100px;
}
/deep/ td.photo-column {
  width: 150px;
}
/deep/ td.progress-Column {
  width: 100px;
}

.user-picture {
    border-radius: 10cm;
    border: 1px solid $color-gray-1;
    max-width: 35px;
    padding: 3px;
  }

.column-period {
    float: left;
    margin-left: 15px;
    margin-top: 7.4px;

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
