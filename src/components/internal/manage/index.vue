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
              <div class="add-button" style="float: left;">
                <b-btn v-show="!existManage" variant="primary" @click="generateManage">Gerar Rateio</b-btn>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <v-server-table striped hover class="grid mt-3 mb-2" :url="urlApiGrid" :columns="columns"
                              :options="options" ref="grid">

                <!-- Header -->
                <div slot="h__employee" class="heading_center">Colaborador</div>
                <div slot="h__originCostCenter" class="heading_center">C.C. Origem</div>
                <div slot="h__destinyCostCenter" class="heading_center">C.C. Destino</div>
                <div slot="h__allocation" class="heading_center">Percentual de Alocação</div>

                <div slot="employee" slot-scope="props" class="btn-group">
                  {{props.row.employee.name | toUpper}}
                </div>
                <div slot="originCostCenter" slot-scope="props" class="btn-group max-width-td">
                  <label class="text-centered">{{props.row.originCostCenter.description | toUpper}}</label>
                </div>
                <div v-if="props.row.reporting" slot="destinyCostCenter" slot-scope="props" class="btn-group max-width-td">
                  <label class="text-centered">
                    <labelCC :id="props.row.reporting.costCenter"></labelCC>
                  </label>
                </div>
                <div v-if="props.row.reporting" slot="allocation" slot-scope="props" class="btn-group mb-2" style="width: 100%;">
                  <percent :reporting="props.row.reporting" style="margin: 0 auto 0;"></percent>
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
  import percent from './percent';
  import labelCC from './labelCC';

  Vue.use(ServerTable, options, false, "bootstrap4", "default");

  export default {
    components: {
      percent,
      labelCC,
    },
    showLoading: true,
    data() {
      return {
        title: 'Rateio',

        description: '',
        existManage: false,

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
      this.verifyManage();
    }, methods: {
      verifyManage() {
        this.$http().get('manage/existManageExecuted').then((response, err) => {
          if (err) console.log('err >', err);
          console.log('this.existManage > ', response.data);
          this.existManage = response.data;
        })
      },
      generateManage() {
        this.$http().get('manage/generateManage').then((response, err) => {
          if (err) console.log('err > ', err);
          this.verifyManage();
          this.refresh();
        })
      },
      refresh() {
        this.$refs.grid.refresh();
      }
    }, filters: {
      toUpper(value) {
        if (value !== null && value !== undefined) {
          return value.toUpperCase();
        }
      },
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
