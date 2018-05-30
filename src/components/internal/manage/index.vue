<template>
  <b-row class="page">
    <b-col cols="12">
      <h1 class="page--title"><span class="icon-cog h4"></span> Gerenciar Rateio</h1>
    </b-col>
    <b-col cols="12">
      <v-client-table ref="grid" class="mt-5 mb-2" :data="getAllCollaborators(selectedCenter)" :columns="columns" :options="options">
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
        <div slot="afterFilter" class="column-period">
            <multiselect
              class="select-period"
              v-model="selectedCenter"
              :options="costCenters"
              :searchable="true"
              placeholder="Selecione o Centro">
            </multiselect>
        </div>
        <div slot="afterFilter" class="column-period">
            <multiselect
              class="select-period"
              v-model="selectedPeriod"
              :options="periods.map(data => data.description)"
              :searchable="true"
              :allow-empty="false"
              @input="selectPeriod(selectedPeriod)"
              placeholder="Selecione o Período">
            </multiselect>
        </div>
        <div slot="afterFilter" class="column-period">
          <p class="date">Data de início: {{this.initialdate}}</p>
        </div>
        <div slot="afterFilter" class="column-period">
          <p class="date">Data de fim: {{this.finaldate}}</p>
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
      selectedPeriod: null,
      selectedCenter: null,
      initialdate: 'DD/MM/AAAA',
      finaldate: 'DD/MM/AAAA',
      columns: ['photo', 'collaborator', 'progress', 'actions'],
      collaboratorsList: [{ photo: '/static/img/avatars/1.jpg', collaborator: 'Igor Formiga', progress: 100, costCenters: [{ description: 'Centro de Custo 1', hours: 16, progress: 50 }] },
        { photo: '/static/img/avatars/2.jpg', collaborator: 'Ivaldo Barbosa', progress: 90, costCenters: [{ description: 'Centro de Custo 10', hours: 11, progress: 12 }] },
        { photo: '/static/img/avatars/3.jpg', collaborator: 'Thiago Ferreira', progress: 70, costCenters: [{ description: 'Centro de Custo 2', hours: 13, progress: 1 }] }],
      costCenters: [],
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
  mounted() {
    this.getAllPeriods();
    this.getAllCostCenters();
  },
  methods: {
    getAllPeriods() {
      const url = 'period/getAll';

      this.$http().get(url).then((response) => {
        this.periods = response.data;
        this.selectedPeriod = this.periods[this.periods.length - 1];
      });
    },
    selectPeriod(selectedPeriod) {
      const data = this.periods.filter(period => period.description === selectedPeriod);
      this.initialdate = data.initialdate;
      this.finaldate = data.finaldate;
    },
    getAllCostCenters() {
      const url = 'coastcenter/getAll';

      this.$http().get(url).then((response) => {
        this.costCenters = response.data.map(data => data.description);
      });
    },
    getAllCollaborators(selectedCenter) {
      let response;
      if (selectedCenter != null) {
        response = this.collaboratorsList.filter(data => data.costCenters.filter(center => center.description === selectedCenter).length > 0); // eslint-disable-line
      } else {
        response = this.collaboratorsList;
      }
      return response;
    },
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
.date{
  margin-left: 7.4px;
  margin-top: 7.4px;
  margin-right: 7px;
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
