<template>
  <div>
    <b-row>
      <b-col cols="3">
        <div id="element">
          <b-form-select id="select" v-model="selectedCostCenter" class="mb-3" required>
            <option :value="null">Selecione um centro de custo</option>
            <option v-for="cc in costCenters" :value="cc">{{cc.description | toUpper}}</option>
          </b-form-select>
          <b-button id="addCostCenter" variant="success" v-on:click="addCostCenter">Adicionar</b-button>
        </div>
      </b-col>
    </b-row>
    <hr />
    <v-server-table striped hover class="grid mt-3 mb-2" :url="urlApiGrid" :columns="columns" :options="options"
                    ref="grid" debounce="1500">
      <div slot="code" slot-scope="props" class="btn-group">
        <i class="icon-money"></i> {{props.row.code}}
      </div>
      <div slot="actions" slot-scope="props" class="btn-group">
        <b-btn v-on:click="removeCenter(props.row._id)" class="icon-trash" size="sm" variant="danger"
               onmouseover="title='Remover'"></b-btn>
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

  Vue.use(ServerTable, options, false, 'bootstrap4', 'default');

  export default {
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
          sortable: [],
          filterable: false,
          columnsClasses: {
            actions: 'action-column text-center',
          },
          requestFunction(data) {
            return self.$http().get('employee/findUserCostCentersByUserId', {
              params: {
                'data': data,
                'user_id': this.$store.getters['auth/user'].ID
              }
            })
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
    mounted() {
      this.findCostCentersWithoutUserId();
    },
    methods: {
      findCostCentersWithoutUserId() {
        this.$http().get('employee/findCostCentersWithoutUserId', {params: {'user_id': this.$store.getters['auth/user'].ID}}).then((response, err) => {
          if (err)
            console.log('err >', err);
          this.costCenters = response.data;
        });
      },
      addCostCenter() {
        if (!this.selectedCostCenter) {
          this.$snotify.warning('Selecione um centro de custo');
        } else {
          this.$http().post('employee/addCostCenter', {
            params: {
              'user_id': this.$store.getters['auth/user'].ID,
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
            'user_id': this.$store.getters['auth/user'].ID,
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
      },
    }, filters : {
      toUpper : function (value) {
        if (value){
          return value.toUpperCase();
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  #element {
    padding: 20px 0px 20px 0px;
  }

  #addCostCenter{
    margin: 10px 0px 0px 0px;
  }
</style>
