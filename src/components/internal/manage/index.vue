<template>
  <b-row class="page">
    <b-col cols="12">
      <h1 class="page--title"><span class="icon-archive h4"></span> {{title}}</h1>
    </b-col>
    <b-col cols="12">
      <b-row>
        <b-col cols="12">
          <b-row>
            <b-col cols="12">
              <span style="float: right; color: #d34c2a;" v-if="period">
                <i class="icon-calendar-1" style="color: #d34c2a;"></i> PERÍODO : {{period.description | toUpper}}
              </span>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <div class="add-button" style="width: 100%; float: left;">
                <b-btn title="Rateio"
                       v-b-popover.hover="'Clique para gerar a primeira versão do rateio (Versão para edição dos gerentes).'"
                       v-if="startManage" variant="success" @click="generateManage" style="width: 225px;">Gerar Rateio -
                  Versão Gerentes
                </b-btn>
                <b-btn title="Rateio"
                       v-b-popover.hover="'Clique para gerar a versão final do rateio (Versão para download).'"
                       v-if="executeFinalManage" variant="success" @click="generateFinalManage" style="width: 225px;">
                  Gerar Rateio - Versão Final
                </b-btn>
              </div>
              <download-excel
                class="btn btn-default"
                :data="json_data"
                :fields="json_fields"
                type="xls"
                :name="filename"
                v-if="isManageExecutedWithSuccess"
                style="float: right">
                <b-btn variant="primary" title="Rateio"
                       v-b-popover.hover="'Clique para baixa a planilha do rateio gerado.'">
                  <i class="icon-file-excel" style="color: white;"></i> Download
                </b-btn>
              </download-excel>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <v-server-table striped hover class="grid mt-3 mb-2" :url="urlApiGrid" :columns="columns"
                              :options="options" ref="grid" debounce="1500">

                <!-- Header -->
                <div slot="h__employee" class="heading_center">Colaborador</div>
                <div slot="h__originCostCenter" class="heading_center">C.C. Origem</div>
                <div slot="h__destinyCostCenter" class="heading_center">C.C. Destino</div>
                <div slot="h__allocation" class="heading_center">Percentual de Alocação</div>

                <div slot="employee" slot-scope="props" class="btn-group">
                  <i class="icon-docs"></i> {{props.row.employee.name | toUpper}}
                </div>
                <div slot="originCostCenter" slot-scope="props" class="btn-group max-width-td">
                  <label class="text-centered">{{props.row.originCostCenter.description | toUpper}}</label>
                </div>
                <div v-if="props.row.destinyCostCenter" slot="destinyCostCenter" slot-scope="props"
                     class="btn-group max-width-td">
                  <label class="text-centered">
                    {{props.row.destinyCostCenter.description}}
                  </label>
                </div>
                <div v-if="props.row.allocation" slot="allocation" slot-scope="props" class="btn-group mb-2"
                     style="width: 100%;">
                  <b-progress :value="props.row.allocation"
                              :max="100"
                              show-progress animated
                              variant="success"
                              style="width: 15em; margin: 0 auto 0;">
                  </b-progress>
                </div>
              </v-server-table>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
  /* eslint-disable */
  import Vue from 'vue';
  import {ServerTable} from 'vue-tables-2';
  import options from './../../../commons/helpers/grid.config';
  import variables from './../../../commons/helpers/variables';
  import JsonExcel from 'vue-json-excel'

  Vue.component('downloadExcel', JsonExcel);

  Vue.use(ServerTable, options, false, "bootstrap4", "default");

  export default {
    showLoading: true,
    data() {
      return {
        title: 'Rateio',

        period: null,
        description: '',
        startManage: false,
        isManageExecutedWithSuccess: false,
        managedExecuted: false,
        executeFinalManage: false,

        filename: '',

        json_fields: {
          'Matrícula': 'employee.registration',
          'Colaborador': 'employee.name',
          'COD C.C. Origem': 'originCostCenter.code',
          'Descrição C.C. Origem': 'originCostCenter.description',
          'COD C.C. Destino': 'destinyCostCenter.code',
          'Descrição CC Destino': 'destinyCostCenter.description',
          'Alocação': 'allocation',
        },
        json_data: [],
        json_meta: [
          [{
            "key": "charset",
            "value": "utf-8"
          }]
        ],

        urlApiGrid: `${variables.http.root}manage/`,
        columns: ['employee', 'originCostCenter', 'destinyCostCenter', 'allocation'],
        options: {
          filterable: true,
          sortable: [],
          requestFunction(data) {
            return this.$http().get('manage/', {params: data})
              .catch((e) => {
                this.dispatch('error', e);
              });
          },
          responseAdapter(response) {
            return {data: response.data.data, count: response.data.count};
          },
        }
      };
    },
    mounted() {
      this.loadPeriod();
      this.isPossibleExecuteManage();
      this.isPossibleExecuteFinalManage();
      this.manageExecutedWithSuccess();
      this.loadAllManage();
    }, methods: {
      isPossibleExecuteFinalManage() {
        this.$http().get('manage/isPossibleExecuteFinalManage').then((response, err) => {
          if (err) console.log('err >', err);
          this.executeFinalManage = response.data;
        })
      },
      loadPeriod() {
        this.$http().get('period/pickActivePeriod').then((response, err) => {
          if (err) console.log('err > ', err);
          this.period = response.data.data;
          this.filename = this.period ? this.period.description + '.xls' : '';
        })
      },
      loadAllManage() {
        this.$http().get('manage/getAllToDownload').then((response, err) => {
          if (err) console.log('err > ', err);
          this.json_data = response.data;
        })
      },
      isPossibleExecuteManage() {
        this.$http().get('manage/isPossibleExecuteManage').then((response, err) => {
          if (err) console.log('err >', err);
          this.startManage = response.data;
        })
      },
      manageExecutedWithSuccess() {
        this.$http().get('manage/manageExecutedWithSuccess').then((response, err) => {
          if (err) console.log('err >', err);
          this.isManageExecutedWithSuccess = response.data;
        })
      },
      generateManage() {
        this.$NProgress().start();
        this.$http().get('manage/generateManage').then((response, err) => {
          if (err) {
            console.log('err > ', err);
            this.$NProgress().done();
            this.$swal(
              'Rateio',
              'Não foi possível executar rateio.',
              'error'
            );
          }
          this.startManage = false;
          this.isManageExecutedWithSuccess = true;
          this.loadAllManage();
          this.onUpdate();
          this.$NProgress().done();
          this.$swal(
            'Rateio',
            'Rateio executado com sucesso.',
            'success'
          );
        })
      }, generateFinalManage() {
        this.$http().get('manage/generateFinalManage').then((response, err) => {
          if (err) {
            console.log('err > ', err);
            this.$NProgress().done();
            this.$swal(
              'Rateio',
              'Não foi possível executar rateio.',
              'error'
            );
          }
          this.loadAllManage();
          this.onUpdate();
          this.$NProgress().done();
          this.$swal(
            'Rateio',
            'Rateio executado com sucesso.',
            'success',
            this.loadPeriod(),
            this.isPossibleExecuteManage(),
            this.isPossibleExecuteFinalManage(),
            this.manageExecutedWithSuccess(),
            this.loadAllManage(),
          );
        })
      }, onUpdate() {
        this.$refs.grid.refresh();
      },
    }, filters: {
      toUpper(value) {
        if (value !== null && value !== undefined) {
          return value.toUpperCase();
        }
      }
    }, watch: {
      startManage: function (newValue, oldValue) {
        this.startManage = newValue;
      }
    }

  }
</script>

<style lang="scss" scoped>
  .heading_center {
    color: #d34c2a;
    font-size: .9rem;
    text-transform: capitalize;
    text-align: center;
  }

  .max-width-td {
    width: 100%;
  }

  .text-centered {
    text-align: center;
    width: 100%;
  }

</style>
