<template>
  <b-row class="page">
    <b-col cols="12">
      <h1 class="page--title"><span class="icon-cog h4"></span> Gerenciar Rateio</h1>
    </b-col>
    <b-col cols="12">
      <v-client-table ref="grid" class="mt-5 mb-2" :data="filterCollaborators(selectedCenter)" :columns="columns" :options="options">
        <span slot="h__photo">#</span>
        <span slot="h__name">Colaborador</span>
        <span slot="h__originCostCenter">Centro de Custo Origem</span>
        <span slot="h__costCenter">Centro de Custo</span>
        <span slot="h__progress">Progresso</span>
        <span slot="h__actions"></span>
        <div slot="progress" slot-scope="props">
          <b-progress :value="props.row.progress" :max="100" class="user-progress" show-progress></b-progress>
        </div>
        <div slot="photo" slot-scope="props">
          <img :src="props.row.photo" class="user-picture">
        </div>
        <div slot="actions" slot-scope="props" class="btn-toolbar">
          <editPercentage v-bind:row="props.row"/>
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
              @input="filterCollaborators(selectedCenter)"
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
        <div slot="afterFilter" class="checkbox">
          <b-form-checkbox class="checkbox">Apenas percentual abaixo do ideal</b-form-checkbox>
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
        <div slot="afterFilter" class="add-button">
          <add v-bind:collaboratorsList="collaboratorsList" :costCenters="costCenters"></add>
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
import editPercentage from './editPercentage';
import add from './add';

Vue.use(ClientTable, options, false, 'bootstrap4', 'default');
Vue.component('multiselect', Multiselect);

export default {
  name: 'Manage',
  showLoading: true,
  components: {
    editPercentage,
    add,
  },

  data() {
    return {
      selectedPeriod: null,
      selectedCenter: null,
      initialdate: 'DD/MM/AAAA',
      finaldate: 'DD/MM/AAAA',
      columns: ['photo', 'name', 'originCostCenter', 'costCenter', 'progress', 'actions'],
      collaboratorsList: [{ photo: '/static/img/avatars/1.jpg', name: 'Igor Formiga', progress: 100, costCenter: 'Centro de Custo 1', originCostCenter: 'Centro de Custo 1' },
        { photo: '/static/img/avatars/2.jpg', name: 'Ivaldo Barbosa', progress: 60, costCenter: 'Centro de Custo 10', originCostCenter: 'Centro de Custo 2' },
        { photo: '/static/img/avatars/2.jpg', name: 'Ivaldo Barbosa', progress: 40, costCenter: 'Centro de Custo 2', originCostCenter: 'Centro de Custo 2' },
        { photo: '/static/img/avatars/3.jpg', name: 'Thiago Ferreira', progress: 70, costCenter: 'Centro de Custo 1', originCostCenter: 'Centro de Custo 1' },
        { photo: '/static/img/avatars/3.jpg', name: 'Thiago Ferreira', progress: 20, costCenter: 'Centro de Custo 2', originCostCenter: 'Centro de Custo 1' },
        { photo: '/static/img/avatars/3.jpg', name: 'Thiago Ferreira', progress: 10, costCenter: 'Centro de Custo 10', originCostCenter: 'Centro de Custo 1' }],
      costCenters: [],
      periods: [],
      totalHours: 0,
      options: {
        sortable: [],
        columnsClasses: {
          actions: 'action-column text-center',
          photo: 'photo-column',
          originCostCenter: 'origin-column',
          costCenter: 'costCenter-column',
          name: 'name-column',
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
        this.selectedPeriod = this.periods[this.periods.length - 1].description;
        this.selectPeriod(this.selectedPeriod);
      });
    },
    selectPeriod(selectedPeriod) {
      let data = this.periods.filter(period => period.description === selectedPeriod); //eslint-disable-line
      this.initialdate = data[0].initialdate;
      this.finaldate = data[0].finaldate;
    },
    getAllCostCenters() {
      const url = 'coastcenter/getAll';

      this.$http().get(url).then((response) => {
        this.costCenters = response.data.map(data => data.description);
      });
    },
    filterCollaborators(selectedCenter) {
      let response;
      if (selectedCenter != null) {
        response = this.collaboratorsList.filter(collaborator => collaborator.costCenter === selectedCenter || collaborator.originCostCenter === selectedCenter); // eslint-disable-line
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
  width: 50px;
}
/deep/ td.progress-Column {
  width: 300px;
}
/deep/ td.costCenter-column {
  width: 400px;
}
/deep/ td.origin-column {
  width: 400px;
}
.btn-secondary{
  margin-left: 15px;
}
.checkbox{
  margin-left: 7.4px;
}
.date{
  margin-left: 0.4px;
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
