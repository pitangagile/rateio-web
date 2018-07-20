<template>
  <div>
    <b-row class="page">
      <b-col cols="12">
        <h1 class="page--title"><span class="icon-cog h4"></span> {{ titulo_pagina }} </h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-form-file v-model="file" :state="Boolean(file)" accept=".xls, .xlsx"
                     placeholder="Selecione um arquivo">
        </b-form-file>
        <b-button id="submit-file" :variant="'primary'" v-on:click="armazenarArquivo()">
          Submeter
        </b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <v-server-table striped hover class="grid mt-3 mb-2" :url="urlApiGrid" :columns="columns" :options="options">
          <div slot="actions" slot-scope="props" class="btn-group">
            <b-button id="downloadButton" :variant="'primary'" size="" @click="downloadFile(props.row)">
              <i class="icon-download"/>
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
        columns: ['name_file', 'responsable', 'insertion_date', 'actions'],
        options: {
          headings: {
            name_file: 'Nome do Arquivo',
            responsable: 'Responsável',
            insertion_date: 'Data de Inserção',
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
      armazenarArquivo() {

        var file = this.file;
        console.log(file);
        if (file === undefined || file === null) {
          this.$snotify.warning('Selecione um arquivo');
        } else {
          this.$http().post('fileupload', {name : file.name, data: this.convertFileToBinary()}).then(() => { //eslint-disable-line
            this.$swal(
              'Adicionado',
              'Planilha adicionada com sucesso.',
              'success'
            );
          }, () => {
            this.$swal(
              'Erro',
              '',
              'error'
            );
          });
        }
      },
      convertFileToBinary(){
      },
      downloadFile(file) {
        console.log("Clicou")
      },
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
