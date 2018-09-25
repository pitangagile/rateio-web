<template>
  <b-row class="page">
    <b-col cols="12">
      <h1 class="page--title"><span class="icon-calendar-check-o h4"></span>{{title}}</h1>
    </b-col>
    <b-col cols="12">
      <v-server-table class="grid mt-3 mb-2" :url="urlApiGrid" :columns="columns" :options="options"
                      ref="grid" debounce="1500">
        <div slot="date" slot-scope="props" class="btn-group">
          <label>{{props.row.date | dateFormat}}</label>
        </div>
        <div slot="description" slot-scope="props" class="btn-group">
          <label>{{props.row.description.toUpperCase()}}</label>
        </div>
        <div slot="classification" slot-scope="props" class="btn-group">
          <label>{{props.row.classification.toUpperCase()}}</label>
        </div>
        <div slot="percentageWorked" slot-scope="props" class="btn-group mb-2">
          <b-progress :value="props.row.percentageWorked" :max="100" show-progress animated
                      variant="success" style="width: 15em;"></b-progress>
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
import moment from 'moment';

Vue.use(ServerTable, options, false, "bootstrap4", "default");

export default {
  name: "Holiday",
  data() {
    return {
      title: "Feriados",

      // Table Information
      urlApiGrid: `${variables.http.root}holiday`,
      columns: ["date", "description", "classification", "percentageWorked"],
      options: {
        headings: {
          date: "Data",
          description: "Descrição",
          classification: "Classificação",
          percentageWorked: "Percentual de Trabalho"
        },
        filterable: ['description', 'classification'],
        sortable: [],
        columnsClasses: {
          actions: "action-column text-center"
        },
        requestFunction(data) {
          return this.$http()
            .get("holiday", {
              params: {
                data
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
  mounted() {},
  methods: {},
  filters: {
    dateFormat: function(value) {
      if (value) {
        return moment(String(value)).format("DD/MM/YYYY");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
