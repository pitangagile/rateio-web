<template>
  <div>
    <b-row class="page">
      <b-col cols="12">
        <h1 class="page--title"><span class="icon-cog h4"></span> {{ titulo_pagina }} </h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-form-file accept=".xls, .xlsx" v-model="file" :state="Boolean(file)" placeholder="Selecione um arquivo"/>
        <b-button id="submit-file" :variant="'primary'" v-on:click="inserirArquivo()">
          Submeter
        </b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <v-server-table striped hover class="grid mt-3 mb-2" :url="urlApiGrid" :columns="columns" :options="options">
          <div slot="createdAt" slot-scope="props">
            <span>{{props.row.createdAt | formatarDateTime}}</span>
          </div>
          <div slot="actions" slot-scope="props" class="btn-group">
            <b-button id="downloadButton" :variant="'primary'" size="" @click="downloadFile(props.row)">
              <i class="icon-download" style="text-align: center;"/>
            </b-button>
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
      const self = this;
      return {
        urlApiGrid: `${variables.http.root}fileupload/gridlist`,
        file: null,
        titulo_pagina: 'Registro de Planilhas',
        columns: ['name', 'responsable', 'createdAt', 'actions'],
        options: {
          headings: {
            name: 'Nome do Arquivo',
            responsable: 'Responsável',
            createdAt: 'Data de Inserção',
            actions: 'Download'
          },
          sortable: ['insertion_date'],
          requestFunction(data) {
            return self.$http().get('fileupload/gridlist', {params: data})
              .catch((e) => {
                this.dispatch('error', e);
              });
          },
          responseAdapter(response) {
            console.log(response); // eslint-disable-line
            return {data: response.data.data, count: response.data.count};
          },
        }
      };
    },
    methods: {
      inserirArquivo: function () {
        this.validarArquivo();
        this.create();
      },
      validarArquivo: function () {
        if (this.file === undefined || this.file === null) {
          this.$snotify.warning('Selecione um arquivo');
        }
      },
      create: function () {
        var formData = new FormData();
        formData.append("data", this.file);
        axios.post(`${variables.http.root}fileupload`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
          }
        ).then(result => {
          this.$swal(
            'Adicionado',
            'Planilha adicionada com sucesso.',
            'success'
          );
        }, error => {
          this.$swal(
            'Erro',
            'Não foi possível adicionar a planilha',
            'error'
          );
        });
      },
    },
    filters: {
      formatarDateTime: function (value) {
        if (value) {
          return moment(String(value)).format('DD/MM/YYYY - hh:mm')
        }
      }
    }
  };
</script>

<style lang="scss" scoped>

  #submit-file {
    margin-top: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
  }

</style>
