<template>
  <b-row class="page">
    <b-col cols="12">
      <h1 class="page--title"><span class="icon-doc-text h4"></span> {{title}}</h1>
    </b-col>
    <b-col cols="12">
      <v-server-table class="grid mt-3 mb-2" :url="urlApiGrid" :columns="columns" :options="options"
                      ref="grid">
        <div slot="afterFilter" class="add-button">
          <add ref="add" @refresh="refresh()"></add>
        </div>
        <div slot="period" slot-scope="props" class="btn-group">
          <label v-if="props.row.period">{{props.row.period.description.toUpperCase()}}</label>
        </div>
        <div slot="costCenter" slot-scope="props" class="btn-group">
          <label v-if="props.row.costCenter">{{props.row.costCenter.description}}</label>
        </div>
        <div slot="hours" slot-scope="props" class="btn-group mb-2">
          <b-progress :value="convertHoursToPercent(props.row.hours)" :max="100" show-progress animated
                      variant="success" style="width: 15em;"></b-progress>
        </div>
        <div slot="actions" slot-scope="props" class="btn-group">
          <edit @refresh="refresh()" :reporting="props.row"></edit>
          <b-btn v-on:click="removeCenter(props.row._id)" class="icon-trash icon-table" size="sm" variant="danger"
                 onmouseover="title='Remover'"></b-btn>
        </div>
      </v-server-table>
    </b-col>
  </b-row>
</template>

<script>
/* eslint-disable */
import Vue from "vue";
import { ServerTable } from "vue-tables-2";
import options from "./../../../commons/helpers/grid.config";
import variables from "./../../../commons/helpers/variables";
import add from "./add";
import edit from "./edit";

Vue.use(ServerTable, options, false, "bootstrap4", "default");

export default {
  name: "Reporting",
  removable: false,
  showLoading: true,
  components: { add, edit },
  data() {
    return {
      title: "Reportagem",
      period: null,
      totalHoursReporting: 0,
      qtdWorkDaysByPeriod: 0,
      urlApiGrid: `${variables.http.root}reporting/findReportsByUserId`,
      columns: ["period", "costCenter", "hours", "actions"],
      options: {
        headings: {
          period: "Período",
          costCenter: "Centro de Custo",
          hours: "Percentual de Alocação (%)",
          actions: "Ações"
        },
        filterable: false,
        sortable: [],
        columnsClasses: {
          actions: "action-column text-center"
        },
        requestFunction(data) {
          return this.$http()
            .get("reporting/findReportsByUserId", {
              params: {
                data,
                user_id: this.$store.getters["auth/user"].ID
              }
            })
            .catch(e => {
              this.dispatch("error", e);
            });
        },
        responseAdapter(response) {
          return response.data;
        }
      }
    };
  },
  mounted() {
    this.calculatePercentOfReporting();
    this.getReportingTotalHoursPerActivePeriodAndByUserId();
  },
  methods: {
    getReportingTotalHoursPerActivePeriodAndByUserId() {
      this.totalHoursReporting = this.$http()
        .get("reporting/getReportingTotalHoursPerActivePeriodAndByUserId", {
          params: { user_id: this.$store.getters["auth/user"].ID }
        })
        .then((response, err) => {
          if (err) console.log("err > ", err);
          if (response.data.data !== undefined) {
            this.totalHoursReporting = JSON.parse(response.data.data.totalHoursReporting);
          }
        });
    },
    convertHoursToPercent(hours) {
      var totalMonth = this.$store.getters["auth/user"].workHours * this.qtdWorkDaysByPeriod;
      var totalReporting = this.totalHoursReporting;
      var total = totalReporting > totalMonth ? totalReporting : totalMonth;
      return (hours / total) * 100;
    },
    calculatePercentOfReporting() {
      this.$http()
        .get("period/findTotalDaysActivesPerPeriod")
        .then(
          (result) => {
            this.qtdWorkDaysByPeriod = result.data.data;
          },
          (error) => {
            console.log("error > ", error);
          }
        );
    },
    removeCenter(_id) {
      this.$http()
        .delete("reporting", { params: { _id: _id } })
        .then(
          () => {
            this.$swal(
              "Removido",
              "Reportagem removida.",
              "success",
              this.refresh()
            );
          },
          () => {
            this.$swal("Erro", "Erro ao remover reportagem.", "error");
          }
        );
    },
    refresh() {
      this.getReportingTotalHoursPerActivePeriodAndByUserId();
      this.$refs.grid.refresh();
    }
  }
};
</script>

<style lang="scss" scoped>
.icon-table {
  margin: 1px;
}
</style>
