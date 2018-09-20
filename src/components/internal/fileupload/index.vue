<template>
  <div>
    <b-row class="page">
      <b-col cols="12">
        <h1 class="page--title"><span class="icon-file-excel h4"></span> {{ titulo_pagina }} </h1>
      </b-col>
    </b-row>
    <b-row style="padding-top: 10px !important;">
      <b-col cols="4">
        <b-form-file id="input" accept=".xls, .xlsx" v-model="file" :state="Boolean(file)"
                     placeholder="Selecione um arquivo"/>
        <br/>
        <b-button id="submit-file" :variant="'success'" v-on:click="inserirArquivo()">
          Submeter
        </b-button>
      </b-col>
      <b-col cols="8">
        <b-btn v-on:click="showAndHideInstructions" variant="primary">Instruções</b-btn>
        <span v-if="showInstuctions">
          <b-jumbotron style="margin-top: 10px;">
            <template slot="header">
              Instruções
            </template>
            <template slot="lead">
              Instruções para submissão de arquivo .xls
            </template>
            <hr />
            <h3>Cabeçalho</h3>
            <p>O cabeçalho deve conter os seguintes campos:</p>
            <ul>
              <ul>
                <li>MATR</li>
                <li>COD CC ORIG</li>
                <li>COD CC DEST</li>
              </ul>
            </ul>
            <p><b>MATR</b> para a matrícula do colaborador</p>
            <p><b>COD CC ORIG</b> para o centro de custo de origem do colaborador</p>
            <p><b>COD CC DEST</b> para o centro de custo de destino do colaborador</p>
          </b-jumbotron>
        </span>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <v-server-table striped hover class="grid mt-3 mb-2" :url="urlApiGrid" :columns="columns" :options="options"
                        ref="planilhas">

          <div slot="h__createdAt" class="heading_center">Data de Criação</div>
          <div slot="h__status" class="heading_center">Situação</div>
          <div slot="h__registrations" class="heading_center">Matrículas sem Cadastro</div>
          <div slot="h__actions" class="heading_center">Ações</div>

          <div slot="name" slot-scope="props">
            <span>{{props.row.name | toUpper}}</span>
          </div>
          <div slot="responsable" slot-scope="props">
            <span>{{props.row.responsable.name | toUpper}}</span>
          </div>
          <div slot="createdAt" slot-scope="props" align="center">
            <span>{{props.row.createdAt | formatDateTime}}</span>
          </div>
          <div slot="status" slot-scope="props" align="center">
            <span v-if="props.row.status === 'Erro'">
              <b-btn disabled variant="danger">{{props.row.status | toUpper}}</b-btn>
            </span>
            <span v-if="props.row.status === 'Sucesso'">
              <b-btn disabled variant="success">{{props.row.status | toUpper}}</b-btn>
            </span>
          </div>
          <div slot="registrations" slot-scope="props" align="center">
            <p v-if="!props.row.registrations" @click="">N/A</p>
            <b-btn variant="primary" v-show="props.row.registrations.length > 0"
                   @click="showModal(props.row.registrations)"><i class="icon-group" style="color: white;"></i> Mostrar
            </b-btn>
          </div>
          <div v-if="props.row" slot="actions" slot-scope="props" class="btn-group" style="width: 100%;">
            <b-btn @click="remove(props.row)" class="icon-trash icon-table" size="sm" variant="danger"
                   onmouseover="title='Remover'" style="margin: 0 auto;"></b-btn>
          </div>
        </v-server-table>
      </b-col>
    </b-row>
    <b-modal ref="registrationsModal" hide-footer title="MATRÍCULAS">
      <div class="d-block text-center">
        <ul v-show="registrations.length > 0" v-for="registration in registrations" style="float: left;">
          <li>{{registration}}</li>
        </ul>
      </div>
      <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">Fechar</b-btn>
    </b-modal>
  </div>
</template>
<script>
  /* eslint-disable */
  import Vue from 'vue';
  import {ServerTable} from 'vue-tables-2';
  import options from './../../../commons/helpers/grid.config';
  import variables from './../../../commons/helpers/variables';
  import axios from 'axios';
  import moment from 'moment';

  Vue.use(ServerTable, options, false, 'bootstrap4', 'default');

  export default {
    name: 'FileUpload',
    showLoading: true,

    data() {
      return {

        registrations: '',
        showInstuctions: false,

        urlApiGrid: `${variables.http.root}fileupload/gridlist`,
        file: null,
        titulo_pagina: 'Registro de Planilhas',
        columns: ['name', 'responsable', 'createdAt', 'status', 'registrations', 'actions'],
        options: {
          headings: {
            name: 'Nome do Arquivo',
            responsable: 'Responsável',
            createdAt: 'Data de Inserção',
            status: "Situação",
            registrations: "Matrículas sem cadastro"
          },
          filterable: false,
          sortable: [],
          requestFunction(data) {
            return this.$http().get('fileupload/gridlist', {params: data})
              .catch((e) => {
                this.dispatch('error', e);
              });
          },
          responseAdapter(response) {
            return {data: response.data.data, count: response.data.count};
          },
        }
      };
    },
    computed: {
      user() {
        return this.$store.getters['auth/user'];
      },
    },
    methods: {
      showAndHideInstructions(){
        if (this.showInstuctions){
          this.showInstuctions = false;
        }else{
          this.showInstuctions = true;
        }
      },
      showModal(registrations) {
        this.registrations = registrations.toString().split(',');
        this.$refs.registrationsModal.show();
      },
      hideModal() {
        this.$refs.registrationsModal.hide();
      },
      validateAllEmployeesFromSpreadsheet(uniquesRegistrations) {
        var result = this.$http().get('employee/validateAllEmployeesFromSpreadsheet', {params: {'registrations': uniquesRegistrations}}, (response, err) => {
          if (err) console.log('err > ', err);
          return response;
        });
        return result;
      },
      extractData() {
        var reader = new FileReader();
        reader.onload = function (e) {
          var data = e.target.result;
          var cfb = XLS.CFB.read(data, {type: 'binary'});
          var wb = XLS.parse_xlscfb(cfb);
          wb.SheetNames.forEach(function (sheetName) {
            var employees = XLS.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
            var registrations = [];
            for (var i = 0; i < employees.length; i++) {
              if (employees[i]['MATR'])
                registrations.push(employees[i]['MATR']);
            }
            var uniquesRegistrations = [];
            registrations.forEach(function (registration) {
              if (uniquesRegistrations.indexOf(registration) < 0) {
                uniquesRegistrations.push(registration);
              }
            });
            this.validateAllEmployeesFromSpreadsheet(uniquesRegistrations).then(async (response, err) => {
              if (err) console.log('err > ', err);
              var registrationsNotInDatabase = response.data;
              if (registrationsNotInDatabase.length > 0) {
                this.create('Erro', registrationsNotInDatabase);
              } else {
                var result = await this.create("Sucesso", registrationsNotInDatabase).then(function (result, err) {
                  if (err) {
                    console.log('err > ', err);
                    return err;
                  } else {
                    return result;
                  }
                });
                if (result) {
                  this.createManages(employees);
                }
              }
            });
          }.bind(this));
        }.bind(this);
        reader.readAsBinaryString(this.file);
      },
      inserirArquivo() {
        this.$NProgress().start();
        this.validarArquivo();
        this.extractData();
        this.$NProgress().done();
      },
      validarArquivo: function () {
        if (this.file === undefined || this.file === null) {
          return this.$snotify.warning('Selecione um arquivo');
        }
      },
      createManages(employees) {
        this.$http().post('manage/createManagesFromFile', {params: {'employees': employees}}).then((response, err) => {
          if (err) console.log('err > ', err);
          this.onUpdate();
        });
      },
      create(status, registrationsNotInDatabase) {
        var formData = new FormData();
        formData.append('name', this.file.name);
        formData.append("responsable", this.user.ID);
        formData.append("status", status);
        formData.append("registrations", registrationsNotInDatabase);
        return axios.post(`${variables.http.root}fileupload`, formData).then(result => {
          this.$swal(
            'Adicionado',
            'Planilha adicionada com sucesso.',
            'success'
          );
          this.onUpdate();
          return result;
        }, error => {
          this.$swal(
            'Erro',
            'Não foi possível adicionar a planilha',
            'error'
          );
          this.onUpdate();
        });
      },
      remove(fileUpload) {
        this.$http().delete('fileupload', {params: {'_id': fileUpload._id}}).then((response, err) => {
          if (err) {
            console.log('err > ', err);
            this.$NProgress().done();
            this.$swal(
              'Planilha',
              'Não foi possível remover a planilha.',
              'error'
            );
          }
          this.onUpdate();
          this.$NProgress().done();
          this.$swal(
            'Planilha',
            'Planilha removida com sucesso.',
            'success'
          );
        })
      },
      onUpdate() {
        this.$refs.planilhas.refresh();
      }
    },
    filters: {
      formatDateTime: function (value) {
        if (value) {
          return moment(String(value)).format('DD/MM/YYYY - hh:mm A')
        }
      },
      toUpper: function (value) {
        if (value) {
          return value.toUpperCase();
        }
      },
    },
  };
</script>

<style lang="scss" scoped>

  #submit-file {
    margin-top: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .heading_center {
    color: #d34c2a;
    font-size: .9rem;
    text-transform: capitalize;
    text-align: center;
  }

</style>
