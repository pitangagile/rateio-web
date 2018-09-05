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
                      ref="grid">
        <div slot="employee" slot-scope="props" class="btn-group">
          <i class="icon-doc-text"></i> {{props.row.employee.name | toUpper}}
        </div>
        <div slot="period" slot-scope="props" class="btn-group">
          {{props.row.period.description | toUpper}}
        </div>
        <div slot="costCenter" slot-scope="props" class="btn-group">
          {{props.row.costCenter.description | toUpper}}
        </div>
        <div slot="totalHoursCostCenter" slot-scope="props" class="btn-group mb-2">
          <percent :reporting="props.row"></percent>
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
            period: "Período",
            costCenter: "Centro de Custo",
            totalHoursCostCenter: "Percentual de Alocação (%)",
          },
          filterable: true,
          sortable: [],
          columnsClasses: {
            actions: "action-column text-center"
          },
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
</style>
