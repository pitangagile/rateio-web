<template>
  <b-row class="page">
    <b-col cols="12">
      <h1 class="page--title"><span class="icon-docs h4"></span> {{title}}</h1>
    </b-col>
    <b-col cols="12">
      <span style="float: right; color: #d34c2a;" v-if="period">
        <i class="icon-calendar-1" style="color: #d34c2a;"></i> PERÍODO : {{period.description | toUpper}}
      </span>
    </b-col>
    <b-col cols="12">
      <v-server-table class="grid mt-3 mb-2" :url="urlApiGrid" :columns="columns" :options="options"
                      ref="grid" debounce="1500">
        <div slot="h__period" class="header-table">Período</div>
        <div slot="h__costCenter" class="header-table">Centro de Custo</div>
        <div slot="h__totalHoursCostCenter" class="header-table">Percentual de Alocação (%)</div>

        <div slot="employee" slot-scope="props" class="btn-group col-table">
          <i class="icon-doc-text"></i> {{props.row.employee.name | toUpper}}
        </div>
        <div slot="period" slot-scope="props" class="btn-group col-table">
          <span class="cel-table">{{props.row.period.description | toUpper}}</span>
        </div>
        <div slot="costCenter" slot-scope="props" class="btn-group col-table">
          <span class="cel-table">{{props.row.costCenter.description | toUpper}}</span>
        </div>
        <div slot="totalHoursCostCenter" slot-scope="props" class="btn-group col-table" style="text-align: center">
          <span class="cel-table"><percent :reporting="props.row"></percent></span>
        </div>
      </v-server-table>
    </b-col>
  </b-row>
</template>

<script>
  /* eslint-disable */
  import Vue from "vue";
  import {ServerTable} from "vue-tables-2";
  import options from "../../../commons/helpers/grid.config";
  import variables from "../../../commons/helpers/variables";
  import percent from './percent';

  Vue.use(ServerTable, options, false, "bootstrap4", "default");

  export default {
    showLoading: true,
    components: {
      percent,
    },
    data() {
      return {
        title: 'Reportagens',

        period: null,

        urlApiGrid: `${variables.http.root}reporting/findAllByActivePeriod`,
        columns: ['employee', "period", "costCenter", "totalHoursCostCenter"],
        options: {
          headings: {
            employee: "Colaborador",
          },
          filterable: true,
          sortable: [],
          requestFunction(data) {
            return this.$http()
              .get("reporting/findAllByActivePeriod", {params: {'data': data}}).catch(e => {
                this.dispatch("error", e);
              });
          },
          responseAdapter(response) {
            return response.data;
          }
        }
      };
    }, mounted() {
      this.loadPeriod();
    }, methods : {
      loadPeriod() {
        this.$http().get('period/pickActivePeriod').then((response, err) => {
          if (err) console.log('err > ', err);
          this.period = response.data.data;
        })
      },
    } ,filters: {
      toUpper(value) {
        if (value) {
          return value.toUpperCase();
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

  .header-table {
    color: #d34c2a;
    font-size: 1rem;
    text-transform: capitalize;
    text-align: center;
  }

  .col-table {
    width: 100%;
  }

  .cel-table {
    width: 100%;
    text-align: center;
  }

</style>
