<template>
  <div>
    <AddCC ref="add" @refreshGrid="refreshGrid()"></AddCC>
    <v-server-table striped hover class="grid mt-3 mb-2" :url="urlApiGrid" :columns="columns" :options="options"
                    ref="grid">
      <div slot="actions" slot-scope="props" class="btn-group">
        <RemoveCC :_id="props.row._id" @refreshGrid="refreshGrid()">remover</RemoveCC>
      </div>
    </v-server-table>
  </div>
</template>

<script>
  /* eslint-disable */
  import Vue from 'vue';
  import {ServerTable} from 'vue-tables-2';
  import options from './../../../commons/helpers/grid.config';
  import variables from './../../../commons/helpers/variables';
  import AddCC from './addCC';
  import RemoveCC from './removeCC';

  Vue.use(ServerTable, options,   false, 'bootstrap4', 'default');

  // FIXME: Buscar usuário da sessão
  const user_id = '5b6240f74855b1272d7d500e';

  export default {
    components: {AddCC, RemoveCC},
    name: 'cc',
    data() {
      const self = this;
      return {
        // hoursOfWork: 8,
        urlApiGrid: `${variables.http.root}employee/findUserCoastCentersByUserId`,
        coastCenters: [],
        columns: ['code', 'description', 'actions'],
        options: {
          headings: {
            code: 'Código CC',
            description: 'Descrição CC',
            actions: 'Ações',
          },
          sortable: ['code'],
          filterable: false,
          columnsClasses: {
            actions: 'action-column text-center',
          },
          requestFunction(data) {
            return self.$http().get('employee/findUserCoastCentersByUserId', {params: {data, 'user_id': user_id}})
              .catch((e) => {
                this.dispatch('error', e);
              });
          },
          responseAdapter(response) {
            return response.data;
          },
        }
      }
    },
    methods: {
      refreshGrid() {
        this.$refs.grid.refresh();
        // FIXME: ao deletar, recarregar a lista e a tabela com os valores corretos.
        // this.$refs.add.refresh();
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
