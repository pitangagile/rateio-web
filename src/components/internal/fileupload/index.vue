<template>
  <div>
    <b-row class="page">
      <b-col cols="12">
        <h1 class="page--title"><span class="icon-cog h4"></span> {{ titulo_pagina }} </h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-form-file id="input" accept=".xls, .xlsx" v-model="file" :state="Boolean(file)"
                     placeholder="Selecione um arquivo"/>
        <b-button id="submit-file" :variant="'primary'" v-on:click="inserirArquivo()">
          Submeter
        </b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <v-server-table striped hover class="grid mt-3 mb-2" :url="urlApiGrid" :columns="columns" :options="options"
                        ref="planilhas">
          <div slot="name" slot-scope="props">
            <span>{{props.row.name | toUpper}}</span>
          </div>
          <div slot="responsable" slot-scope="props">
            <span>{{props.row.responsable.name | toUpper}}</span>
          </div>
          <div slot="createdAt" slot-scope="props">
            <span>{{props.row.createdAt | formatarDateTime}}</span>
          </div>
          <div slot="status" slot-scope="props">
            <span>{{props.row.status | toUpper}}</span>
          </div>
          <div slot="employees" slot-scope="props">
            <span v-for="employee in props.row.employees">
              <p>{{employee.name | toUpper}}</p>
            </span>
          </div>
        </v-server-table>
      </b-col>
    </b-row>
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
        urlApiGrid: `${variables.http.root}fileupload/gridlist`,
        file: null,
        titulo_pagina: 'Registro de Planilhas',
        columns: ['name', 'responsable', 'createdAt', 'status', 'employees'],
        options: {
          headings: {
            name: 'Nome do Arquivo',
            responsable: 'Responsável',
            createdAt: 'Data de Inserção',
            status: "Situação",
            employees: "Colaboradores sem cadastro"
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
            this.validateAllEmployeesFromSpreadsheet(uniquesRegistrations).then((response, err) => {
              if (err) console.log('err > ', err);
              var employees = response.data;
              if (employees.length > 0) {
                this.create('Erro', employees);
              } else {
                this.create("Sucesso", null);
                // TODO: ghcb - processar folha/planilha
              }
            });
          }.bind(this));
        }.bind(this);
        reader.readAsBinaryString(this.file);
      },
      inserirArquivo() {
        this.validarArquivo();
        this.extractData();
      },
      validarArquivo: function () {
        if (this.file === undefined || this.file === null) {
          return this.$snotify.warning('Selecione um arquivo');
        }
      },
      create(status, employees) {
        var employeesId = [];

        if (employees){
          for (var i = 0; i < employees.length; i++){
            employeesId.push(employees[i]._id);
          }
        }

        console.log('employeesId > ', employeesId);

        var formData = new FormData();
        formData.append('name', this.file.name);
        formData.append("responsable", this.user.ID);
        formData.append("status", status);
        formData.append("employees", employeesId);
        axios.post(`${variables.http.root}fileupload`, formData).then(result => {
          this.$swal(
            'Adicionado',
            'Planilha adicionada com sucesso.',
            'success'
          );
          this.onUpdate();
        }, error => {
          this.$swal(
            'Erro',
            'Não foi possível adicionar a planilha',
            'error'
          );
        });
      },
      onUpdate() {
        this.$refs.planilhas.refresh();
      }
    },
    filters: {
      formatarDateTime: function (value) {
        if (value) {
          return moment(String(value)).format('DD/MM/YYYY - hh:mm')
        }
      },
      toUpper: function (value) {
        if (value) {
          return value.toUpperCase();
        }
      }
    },
  };
</script>

<style lang="scss" scoped>

  #submit-file {
    margin-top: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
  }

</style>
