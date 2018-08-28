<template>
  <b-row class="page">
    <b-col cols="12">
      <h1 class="page--title"><span class="icon-group h4"></span> Colaboradores</h1>
    </b-col>

    <b-col cols="12">
      <v-server-table class="grid mt-3 mb-2" :url="urlApiGrid" :columns="columns" :options="options" ref="grid">
        <div slot="name" slot-scope="props">
          <label v-if="props.row.name">{{props.row.name.toUpperCase()}}</label>
        </div>
        <div slot="registration" slot-scope="props">
          <label v-if="props.row.registration">{{props.row.registration.toUpperCase()}}</label>
        </div>
        <div slot="email" slot-scope="props">
          <label v-if="props.row.email">{{props.row.email.toUpperCase()}}</label>
        </div>
        <div slot="costCenterOrigin" slot-scope="props">
          <label v-if="props.row.costCenterOrigin" v-model="props.row.costCenterOrigin.description" />
        </div>
        <div slot="actions" slot-scope="props">
          <edit :employee="props.row" @refresh="refresh()"></edit>
        </div>
      </v-server-table>
    </b-col>
  </b-row>
</template>

<script>
  /* eslint-disable */
  import Vue from 'vue';
  import {ServerTable} from 'vue-tables-2';
  import options from './../../../commons/helpers/grid.config';
  import variables from './../../../commons/helpers/variables';

  import edit from './edit';

  Vue.use(ServerTable, options, false, 'bootstrap4', 'default');

  export default {
    name: 'employee',
    showLoading: true,
    components: {
      edit,
    },
    data() {
      const self = this;
      return {
        urlApiGrid: `${variables.http.root}employee/gridlist`,
        columns: ['name', 'registration', 'email', 'costCenterOrigin', 'actions'],
        options: {
          headings: {
            name: 'Nome',
            registration: 'Matrícula',
            email: 'e-mail',
            costCenterOrigin: 'C.C. Origem',
            actions: 'Ações',
          },
          columnsClasses: {
            actions: 'action-column text-center',
          },
          sortable: ['name'],
          requestFunction(data) {
            return self.$http().get('employee/gridlist', {params: data})
              .catch((e) => {
                this.dispatch('error', e);
              });
          },
          responseAdapter(response) {
            return response.data;
          },
        },
      };
    },methods : {
      refresh() {
        this.$refs.grid.refresh();
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>
