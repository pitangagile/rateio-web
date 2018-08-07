<template>
  <div>
    <div id="select">
      <vue-single-select
        ref="selectCoastCenter"
        option-key="code"
        option-label="description"
        v-model="selectedCoastCenter"
        :options="coastCenters"
        placeholder="Selecione um centro de custo"
        :required="true">
      </vue-single-select>
    </div>
    <b-button variant="primary" v-on:click="addCoastCenter">Adicionar</b-button>
    <v-server-table striped hover class="grid mt-3 mb-2" :url="urlApiGrid" :columns="columns" :options="options"
                    ref="grid">
      <div slot="actions" slot-scope="props" class="btn-group">
        <b-btn v-on:click="removeCenter(props.row._id)" class="icon-trash" size="lg" variant="link" onmouseover="title='Remover'"></b-btn>
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
  import VueSingleSelect from "vue-single-select";

  Vue.use(ServerTable, options, false, 'bootstrap4', 'default');

  // FIXME: Buscar usuário da sessão
  const user_id = '5b6240f74855b1272d7d500e';

  export default {
    components: {VueSingleSelect},
    name: 'cc',
    data() {
      const self = this;
      return {
        selectedCoastCenter: null,
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
      findCoastCentersWithoutUserId() {
        this.$http().get('employee/findCoastCentersWithoutUserId', {params: {'user_id': user_id}}).then((response, err) => {
          if (err)
            console.log('err >', err);
          this.coastCenters = response.data;
        });
      },
      addCoastCenter() {
        if (this.selectedCoastCenter === null || this.selectedCoastCenter === undefined) {
          this.$snotify.warning('Selecione um centro de custo');
        } else {
          this.$http().post('employee/addCoastCenter', {
            params: {
              'user_id': user_id,
              'coastCenter': this.selectedCoastCenter
            }
          }).then(() => {
            this.$swal(
              'Adicionado',
              'Centro de custo adicionado.',
              'success',
            );
            this.selectedCoastCenter = null;
            this.findCoastCentersWithoutUserId();
            this.refreshGrid();
          }, () => {
            this.refreshSelect();
            this.$swal(
              'Erro',
              '',
              'error',
            );
          });
        }
      },
      removeCenter(coastCenterID) {
        this.$http().delete('employee', {
          params: {
            'user_id': user_id,
            'coastCenterId': coastCenterID
          }
        }).then(() => {
          this.$swal(
            'Removido',
            'Centro de custo removido.',
            'success',
          );
          this.findCoastCentersWithoutUserId();
          this.refreshGrid();
        }, () => {
          this.$swal(
            'Erro',
            '',
            'error',
          );
        });
      },
      refreshGrid() {
        this.$refs.grid.refresh();
        this.$refs.selectCoastCenter.refresh();
      }
    },
    mounted() {
      this.findCoastCentersWithoutUserId();
    }
  }
</script>

<style lang="scss" scoped>
  #select {
    padding: 20px 0px 20px 0px;
    max-width: 300px;
  }
</style>
