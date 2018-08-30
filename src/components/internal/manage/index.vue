<template>
  <b-row class="page">
    <b-col cols="12">
      <h1 class="page--title"><span class="icon-archive h4"></span> {{title}}</h1>
    </b-col>
    <b-col cols="12">
      <b-row>
        <b-col cols="12">
          <v-server-table striped hover class="grid mt-3 mb-2" :url="urlApiGrid" :columns="columns" :options="options">

            <!-- Header -->
            <div slot="h__employee" class="heading_center">Colaborador</div>
            <div slot="h__originCostCenter" class="heading_center">C.C. Origem</div>

            <div slot="employee" slot-scope="props" class="btn-group">
              {{props.row.employee.name | toUpper}}
            </div>
            <div slot="originCostCenter" slot-scope="props" class="btn-group" align="center">
              {{props.row.originCostCenter.description | toUpper}}
            </div>

          </v-server-table>
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

  Vue.use(ServerTable, options, false, "bootstrap4", "default");

  export default {
    showLoading: true,
    data() {
      return {
        title: 'Rateio',

        urlApiGrid: `${variables.http.root}manage/`,
        columns: ['employee', 'originCostCenter'],
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
            console.log('response > ', response)
            return {data: response.data.data, count: response.data.count};
          },
        }
      };
    }, filters: {
      toUpper(value) {
        if (value !== null && value !== undefined) {
          return value.toUpperCase();
        }
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
</style>
