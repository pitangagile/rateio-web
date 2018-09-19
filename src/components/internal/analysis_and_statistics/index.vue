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
              <b-form-group label="Selecione o tipo de pesquisa"
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
      <b-card
        class="card-search"
        no-footer
        :header="'RESULTADOS'"
        header-tag="header"
        title=""
        v-if="isShowDiscipline && isFindReporting"
        style="margin-bottom: 20px;">
        <b-card-body style="padding: 5px !important;">
          <b-row style="width: 100%">
            <b-col cols="6"><label>Disciplina</label></b-col>
            <b-col cols="6"><label>Horas Reportadas no Período</label></b-col>
          </b-row>
          <hr />
          <b-row style="width: 100%">
            <b-col cols="6"><b>REQ</b></b-col>
            <b-col cols="6">{{disciplines.totalReq}} hs</b-col>
          </b-row>
          <hr />
          <b-row style="width: 100%">
            <b-col cols="6"><b>A&P</b></b-col>
            <b-col cols="6">{{disciplines.totalAep}} hs</b-col>
          </b-row>
          <hr />
          <b-row style="width: 100%">
            <b-col cols="6"><b>IMPLE</b></b-col>
            <b-col cols="6">{{disciplines.totalImple}} hs</b-col>
          </b-row>
          <hr />
          <b-row style="width: 100%">
            <b-col cols="6"><b>TST</b></b-col>
            <b-col cols="6">{{disciplines.totalTst}} hs</b-col>
          </b-row>
          <hr />
          <b-row style="width: 100%">
            <b-col cols="6"><b>P&G</b></b-col>
            <b-col cols="6">{{disciplines.totalPeg}} hs</b-col>
          </b-row>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
  /* eslint-disable */
  import Vue from "vue";

  export default {
    showLoading: true,
    data() {
      return {
        title: 'Análise e Estatística',

        isFindReporting: false,
        isShowDiscipline: true,

        periods: [],
        costCenters: [],
        searchTypes: [
          {text: 'Disciplinas', value: 'discipline'},
          {text: 'Colaboradores', value: 'employee'},
        ],

        period: null,
        costCenter: null,
        searchType: 'discipline',

        disciplines: {},
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
        if (this.searchType && this.searchType === 'discipline') {
          this.$http().get('reporting/findReportingHoursDisciplinePerCostCenter', {
            params: {
              'period': this.period,
              'costCenter': this.costCenter
            }
          }).then((response, err) => {
            if (err) console.log('err > ', err);
            console.log('response.data.data > ', response.data.data);
            this.disciplines = response.data.data;
            this.isFindReporting = true;
          });
        }
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
    }, filters : {
      toUpper : function (value) {
        if (value){
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

  label {
    color: #d34c2a;
    font-size: 1rem;
    text-transform: capitalize;
    text-align: center;
  }

</style>
