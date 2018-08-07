<template>
  <b-row class="page">
    <b-col cols="12">
      <h1 class="page--title"><span class="icon-vcard h4"></span> Colaboradores</h1>
    </b-col>

    <b-col cols="12">
      <v-server-table class="grid mt-3 mb-2" :url="urlApiGrid" :columns="columns" :options="options">
        <div slot="costCenterOrigin" slot-scope="props">
          <label v-if="props.row.costCenterOrigin" v-model="props.row.costCenterOrigin.description" />
        </div>
        <div slot="actions" slot-scope="props" class="btn-group">
          <b-btn class="btn-default btn-sm"> Editar</b-btn>
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

  Vue.use(ServerTable, options, false, 'bootstrap4', 'default');

  export default {
    name: 'employee',
    showLoading: true,
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
            actions: '',
          },
          sortable: ['name'],
          requestFunction(data) {
            return self.$http().get('employee/gridlist', {params: data})
              .catch((e) => {
                this.dispatch('error', e);
              });
          },
          responseAdapter(response) {
            console.log(response); // eslint-disable-line
            return response.data;
          },
        },
      };
    },
  };
</script>

<style lang="scss" scoped>

</style>
