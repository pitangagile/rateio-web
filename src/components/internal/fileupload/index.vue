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
        <v-client-table striped hover ref="grid" class="mt-5 mb-2" :data="dataSource" :columns="columns"
                        :options="options"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  /* eslint-disable */

  import Vue from 'vue';
  import {ServerTable} from 'vue-tables-2';
  import options from './../../../commons/helpers/grid.config';

  Vue.use(ServerTable, options, false, 'bootstrap4', 'default');

  const url = 'fileupload';

  export default {
    name: 'FileUpload',
    data() {
      return {
        titulo_pagina: 'Registro de Planilhas',
        file: null,
        dismissSecs: 5,
        dismissCountDown: 0,
        dataSource: [],
        columns: ['name_file', 'responsable', 'insertion_date'],
        options: {
          headings: {
            name_file: 'Nome Arquivo',
            responsable: 'Responsável',
            insertion_date: 'Data Inserção',
          },
          sortable: ['insertion_date'],
          requestFunction(data) {
            return self.$http().get('fileupload')
              .catch((e) => {
                this.dispatch('error', e);
              });
          },
          responseAdapter(response) {
            console.log(response); // eslint-disable-line
            // return { data: response.data.data, count: response.data.count };
          },
        }
      };
    },
    mounted() {
      this.AllData();
    },
    methods: {
      AllData() {
        this.$http().get(url).then((response) => {
          this.dataSource = response.data;
        });
      },
      armazenarArquivo() {
        console.log(this.file)
        if (this.file === undefined || this.file === null) {
          this.$snotify.info('Selecione um arquivo');
        } else {
          this.$http().post(url, {params : getBase64()}).then((response) => {
            this.dataSource = response.data;
          });
          this.dataSource.push(inserir);
        }
      },
      getBase64() {
        var reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onload = function () {
          return reader.result;
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
      },
      countDownChanged (dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert () {
        this.dismissCountDown = this.dismissSecs
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
