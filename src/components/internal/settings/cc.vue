<template>
  <div>
    <div id="element">
      <vue-single-select
        ref="select"
        option-key="code"
        option-label="description"
        v-model="selectedCostCenter"
        :options="costCenters"
        placeholder="Selecione um centro de custo"
        :required="true">
      </vue-single-select>
    </div>
    <b-button variant="primary" v-on:click="addCostCenter">Adicionar</b-button>
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
        selectedCostCenter: null,
        urlApiGrid: `${variables.http.root}employee/findUserCostCentersByUserId`,
        costCenters: [],
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
            return self.$http().get('employee/findUserCostCentersByUserId', {params: {data, 'user_id': user_id}})
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
    mounted(){
      this.findCostCentersWithoutUserId();
    },
    methods: {
      findCostCentersWithoutUserId() {
        this.$http().get('employee/findCostCentersWithoutUserId', {params: {'user_id': user_id}}).then((response, err) => {
          if (err)
            console.log('err >', err);
          this.costCenters = response.data;
        });
      },
      addCostCenter() {
        if (this.selectedCostCenter === null || this.selectedCostCenter === undefined) {
          this.$snotify.warning('Selecione um centro de custo');
        } else {
          this.$http().post('employee/addCostCenter', {
            params: {
              'user_id': user_id,
              'costCenter': this.selectedCostCenter
            }
          }).then(() => {
            this.$swal(
              'Adicionado',
              'Centro de custo adicionado.',
              'success',
            );
            this.refresh();
          }, () => {
            this.$swal(
              'Erro',
              '',
              'error',
            );
          });
        }
      },
      removeCenter(costCenterID) {
        this.$http().delete('employee', {
          params: {
            'user_id': user_id,
            'costCenterId': costCenterID
          }
        }).then(() => {
          this.$swal(
            'Removido',
            'Centro de custo removido.',
            'success',
          );
          this.refresh();
        }, () => {
          this.$swal(
            'Erro',
            '',
            'error',
          );
        });
      },
      refresh() {
        this.findCostCentersWithoutUserId();
        this.$refs.grid.refresh();
        this.$refs.select.refresh();
      }
    }
  }
</script>

<style lang="scss" scoped>
  #element {
    padding: 20px 0px 20px 0px;
    max-width: 300px;
  }
</style>
