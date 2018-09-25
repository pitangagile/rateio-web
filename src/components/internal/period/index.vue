<template>
  <div>
    <b-row class="page">
      <b-col cols="12">
        <h1 class="page--title"><span class="icon-calendar-1 h4"></span> {{title}}</h1>
      </b-col>
      <b-col cols="12">
        <v-server-table class="grid mt-3 mb-2" :url="urlApiGrid" :columns="columns" :options="options" ref="grid">
          <div slot="afterFilter" class="add-button" debounce="1500">
            <add @refresh="onUpdate"></add>
          </div>
          <div slot="description" slot-scope="props">
            <label>{{props.row.description | toUpper }}</label>
          </div>
          <div slot="initialDate" slot-scope="props">
            <label>{{props.row.initialDate | dateFormat }}</label>
          </div>
          <div slot="finalDate" slot-scope="props">
            <label>{{props.row.finalDate | dateFormat }}</label>
          </div>
          <div v-if="props.row" slot="actions" slot-scope="props" class="btn-group">
            <edit @refresh="onUpdate" :period="props.row"></edit>
            <b-btn @click="showModalRemove(props.row)" class="icon-trash icon-table" size="sm" variant="danger"
                   onmouseover="title='Remover'" style="margin: 1px;"></b-btn>
          </div>
        </v-server-table>
      </b-col>
    </b-row>
    <b-modal class="modal-add" ref="removeModal" centered title="Remover Período" ok-title="Confirmar"
             cancel-title="Cancelar" @ok="remove()">
      <div slot="modal-header" align="left">
        <h3>Excluir Período</h3>
      </div>
      <div class="d-block text-center">
        <p style="text-align: left; font-size: 15px;">Deseja realmente excluir o período?</p>
        <p style="text-align: left; font-weight: bold;">A remoção do período implicará:</p>
        <ol>
          <li style="font-weight: bold; text-align: left">Remoção da planilha de folha associada a ele, caso exista;
          </li>
          <li style="font-weight: bold; text-align: left">Remoção do rateio gerado, caso alguma planilha de folha tenha
            sido inserida com sucesso.
          </li>
        </ol>
      </div>
    </b-modal> <!-- Modal remover arquivo -->
  </div>
</template>

<script>
  /* eslint-disable */
  import Vue from 'vue';
  import {ServerTable} from 'vue-tables-2';
  import options from './../../../commons/helpers/grid.config';
  import variables from './../../../commons/helpers/variables';
  import moment from 'moment';

  import add from './add';
  import edit from './edit';

  Vue.use(ServerTable, options, false, 'bootstrap4', 'default');

  export default {
    name: 'Period',
    components: {add, edit},
    data() {
      return {
        title: 'Período',

        period: null,

        urlApiGrid: `${variables.http.root}period`,
        columns: ['description', 'initialDate', 'finalDate', 'closuremanagers', 'generationdate', 'actions'],
        reporting: [],
        options: {
          headings: {
            description: 'Descrição',
            initialDate: 'Início',
            finalDate: 'Término',
            closuremanagers: 'Fechamento Gerente',
            generationdate: 'Geração Consolidada',
            actions: 'Ações'
          },
          sortable: [],
          filterable: ['description'],
          columnsClasses: {
            actions: 'action-column text-center',
          },
          requestFunction(data) {
            return this.$http().get('period', {params: data})
              .catch((e) => {
                this.dispatch('error', e);
              });
          },
          responseAdapter(response) {
            return response.data;
          },
        },
      };
    },
    methods: {
      showModalRemove(period) {
        this.period = period;
        this.$refs.removeModal.show();
      },
      hideCancelModal() {
        this.period = null;
        this.$refs.removeModal.hide();
      },
      remove() {
        this.$http().delete('period', {params: {'_id': this.period._id}}).then((result, err) => {
          if (err) {
            this.$refs.removeModal.hide();
            this.$swal(
              'Período',
              'Não foi possível remover o período selecionado.',
              'error'
            );
            this.onUpdate();
          } else {
            this.$refs.removeModal.hide();
            this.$swal(
              'Período',
              'Período removido com sucesso.',
              'success'
            );
            this.onUpdate();
          }
        });
      },
      onUpdate() {
        this.period = null;
        this.$refs.grid.refresh();
      }
    },
    filters: {
      toUpper(value) {
        if (value !== null && value !== undefined) {
          return value.toUpperCase();
        }
      },
      dateFormat: function (value) {
        if (value) {
          return moment(String(value)).format("DD/MM/YYYY");
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
</style>
