<template>
  <b-row class="page">
    <b-col cols="12">
      <h1 class="page--title"><span class="icon-doc-text h4"></span> {{title}}</h1>
    </b-col>
    <b-col cols="5">
      <b-card no-footer :header="'INFORMAÇÕES DO PERÍODO'"
              header-tag="header"
              title="">
        <b-card-body>
          <b-row class="row-form">
            <b-col cols="8">
              <label><span><b>PERÍODO:</b></span></label>
            </b-col>
            <b-col v-if="this.period" cols="4">
              {{this.period.description | upperCase}}
            </b-col>
          </b-row>
          <b-row class="row-form">
            <b-col cols="8">
              <label><b>TOTAL DE HORAS DO PERÍODO:</b></label>
            </b-col>
            <b-col cols="4">
              {{this.totalIdealHoursByActivePeriod}}hs
            </b-col>
          </b-row>
          <b-row class="row-form">
            <b-col cols="8">
              <label><b>TOTAL DE HORAS REPORTADAS NO PERÍODO:</b></label>
            </b-col>
            <b-col cols="4">
              {{this.totalHoursReportingByActivePeriod}}hs
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>
    </b-col>
    <hr/>
    <b-col cols="12">
      <v-server-table class="grid mt-3 mb-2" :url="urlApiGrid" :columns="columns" :options="options"
                      ref="grid">
        <div slot="afterFilter" class="add-button">
          <add ref="add" @refresh="refresh()" :period_prop="this.period"></add>
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
  import {ServerTable} from "vue-tables-2";
  import options from "./../../../commons/helpers/grid.config";
  import variables from "./../../../commons/helpers/variables";
  import add from "./add";
  import edit from "./edit";

  Vue.use(ServerTable, options, false, "bootstrap4", "default");

  export default {
    name: "Reporting",
    removable: false,
    showLoading: true,
    components: {add, edit},
    data() {
      return {
        title: "Reportagem",
        period: null,
        totalHoursReportingByActivePeriod: 0,
        totalIdealHoursByActivePeriod: 0,
        qtdBusinessDaysByActivePeriod: 0,
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
      this.pickActivePeriod();
      this.calculateTotalBusinessDaysByActivePeriod();
      this.calculateTotalReportingHoursByUserIdAndPerActivePeriod();
    },
    methods: {
      pickActivePeriod() {
        this.$http()
          .get("period/pickActivePeriod").then((response, err) => {
          if (err)
            console.log("err > ", err);
          this.period = response.data.data;
        });
      },
      calculateTotalBusinessDaysByActivePeriod() {
        this.$http()
          .get("period/calculateTotalBusinessDaysByActivePeriod").then((response, err) => {
          if (err)
            console.log("err > ", err);
          this.qtdBusinessDaysByActivePeriod = response.data.data;
          this.calculateTotalIdealHoursByPeriod();
        });
      },
      calculateTotalReportingHoursByUserIdAndPerActivePeriod() {
        this.$http()
          .get("reporting/calculateTotalReportingHoursByUserIdAndPerActivePeriod", {
            params: {user_id: this.$store.getters["auth/user"].ID}
          })
          .then((response, err) => {
            if (err) console.log("err > ", err);
            if (response.data.data !== undefined) {
              this.totalHoursReportingByActivePeriod = JSON.parse(response.data.data.totalHoursReportingByActivePeriod);
            }
          });
      },
      calculateTotalIdealHoursByPeriod() {
        this.totalIdealHoursByActivePeriod = this.$store.getters["auth/user"].workHours * this.qtdBusinessDaysByActivePeriod;
      },
      convertHoursToPercent(hours) {
        var hoursToConsider = this.totalHoursReportingByActivePeriod < this.totalIdealHoursByActivePeriod ? this.totalIdealHoursByActivePeriod : this.totalHoursReportingByActivePeriod;
        return (hours / hoursToConsider) * 100;
      },
      removeCenter(_id) {
        this.$http()
          .delete("reporting", {params: {_id: _id}})
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
        this.calculateTotalReportingHoursByUserIdAndPerActivePeriod();
        this.$refs.grid.refresh();
      }
    }, filters: {
      upperCase(value) {
        return value.toUpperCase();
      },
    },
  };
</script>

<style lang="scss" scoped>
  .icon-table {
    margin: 1px;
  }

  .row-form {
    text-align: left;
  }
</style>
