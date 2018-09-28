<template>
  <b-row class="page">
    <b-col cols="12">
      <h1 class="page--title"><span class="icon-chart-bar h4"></span> {{title}}</h1>
    </b-col>
    <b-col cols="12">
      <b-card
        class="card-search"
        no-footer
        :header="'PESQUISA'"
        header-tag="header"
        title="">
        <b-card-body style="padding: 5px !important;">
          <b-row>
            <b-col cols="3">
              <label>Período</label>
            </b-col>
            <b-col cols="9">
              <b-form-select id="selectPeriod" v-model="period" class="mb-3" required>
                <option v-for="period in periods" :value="period">{{period.description | toUpper}}</option>
              </b-form-select>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="3">
              <label>Centro de Custo</label>
            </b-col>
            <b-col cols="9">
              <b-form-select id="selectCC" v-model="costCenter" class="mb-3" required>
                <option v-for="cc in costCenters" :value="cc">{{cc.description | toUpper}}</option>
              </b-form-select>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <b-form-group label="Tipo de Resultado"
                            style="margin-top: 1rem; color: #d34c2a; font-size: 1rem; text-align: center;">
                <b-form-radio-group v-model="searchType"
                                    :options="searchTypes"
                                    name="radios">
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <b-btn variant="primary" style="float: right;" @click="findReporting">Consultar</b-btn>
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>
    </b-col>
    <b-col cols="12">
      <b-table v-if="isShowDiscipline && isFindReporting" class="table-results" bordered :items="disciplines"
               :fields="fieldsDisciplines"></b-table>
    </b-col>
    <b-col cols="12">
      <b-table v-if="!isShowDiscipline && isFindReporting" class="table-results" bordered :items="employees"
               :fields="fieldsEmpĺoyees">
      </b-table>
      <p class="no-results" v-if="!isShowDiscipline && isFindReporting && employees.length === 0">Não há registros para a consulta efetuada</p>
    </b-col>
  </b-row>
</template>

<script>
  /* eslint-disable */
  import Vue from "vue";
  import {ClientTable} from 'vue-tables-2';

  Vue.use(ClientTable);

  export default {
    showLoading: true,
    data() {
      return {
        title: 'Análise e Estatística',

        isFindReporting: false,
        isShowDiscipline: true,

        periods: [],
        costCenters: [],

        employees: [],
        disciplines: [],

        fieldsEmpĺoyees: {
          _id: {
            label: 'NOME',
            sortable: false
          },
          hours: {
            label: 'TOTAL DE HORAS REPORTADAS',
            sortable: false
          },
        },

        fieldsDisciplines: {
          totalReq: {
            label: 'REQ',
            sortable: false
          },
          totalAep: {
            label: 'A&P',
            sortable: false
          },
          totalImple: {
            label: 'IMPLE',
            sortable: false
          },
          totalTst: {
            label: 'TST',
            sortable: false
          },
          totalPeg: {
            label: 'P&G',
            sortable: false
          },
        },

        searchTypes: [
          {text: 'Disciplinas', value: 'discipline'},
          {text: 'Colaboradores', value: 'employee'},
        ],

        period: null,
        costCenter: null,
        searchType: 'discipline',
      };
    }, mounted() {
      this.findAllPeriods();
      this.findAllCostCenters();
    },
    methods: {
      findAllPeriods() {
        this.$http().get('period/findAllPeriods').then((response, err) => {
          if (err) console.log('err > ', err);
          this.periods = response.data;
        });
      },
      findAllCostCenters() {
        this.$http().get('costcenter/findAllCostCenters').then((response, err) => {
          if (err) console.log('err > ', err);
          this.costCenters = response.data
        });
      },
      findReporting() {
        console.log('searchType > ', this.searchType);
        this.$http().get('reporting/findReportingHoursDisciplinePerCostCenter', {
          params: {
            'period': this.period,
            'costCenter': this.costCenter
          }
        }).then((response, err) => {
          if (err) console.log('err > ', err);
          this.disciplines = response.data.data;
          this.isFindReporting = true;
        });
        this.$http().get('reporting/findReportingHoursEmployeePerCostCenter', {
          params: {
            'period': this.period,
            'costCenter': this.costCenter
          }
        }).then((response, err) => {
          if (err) console.log('err > ', err);
          this.employees = response.data.data;
          this.isFindReporting = true;
        });
      },
    }, watch: {
      searchType: function (newValue, oldValue) {
        if (newValue === 'discipline') {
          this.isShowDiscipline = true;
        } else {
          this.discipline = [];
          this.isShowDiscipline = false;
        }
      }
    }, filters: {
      toUpper: function (value) {
        if (value) {
          return value.toUpperCase();
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

  .card-search {
    width: 50%;
    margin: 0 auto 0;
    margin-top: 20px;
  }

  .table-results {
    width: 50%;
    margin: 0 auto 0;
    margin-top: 20px;
  }

  label {
    color: #d34c2a;
    font-size: 1rem;
    text-transform: capitalize;
    text-align: center;
  }

  .no-results {
    text-align: center;
    border: 1px solid #dee2e6;
    width: 50%;
    margin: 0 auto;
    border-top: 0px;
    padding: 0.75rem;
  }

</style>
