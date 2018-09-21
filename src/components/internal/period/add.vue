<template>
  <div>
    <b-btn @click="showModal" class="btn-success" style="margin-left: 5px;">Adicionar</b-btn>
    <b-modal size="lg" class="modal-add" ref="modal" centered hide-footer title="Adicionar Período" ok-title="Confirmar"
             cancel-title="Cancelar" @ok="add()">
      <span v-if="showErrors">
        <b-alert variant="danger" show dismissible @dismissed="hideAlert">
          <ul style="margin: 0px;">
            <li v-for="error in errors">{{error}}</li>
          </ul>
        </b-alert>
      </span>
      <b-row>
        <b-col cols="3"><label><b>MÊS</b></label></b-col>
        <b-col cols="3">
          <b-form-select required class="input-form normal-input" v-model="month" :options="months"/>
        </b-col>
        <b-col cols="3"><label><b>ANO</b></label></b-col>
        <b-col cols="3">
          <b-form-select required class="input-form normal-input" v-model="year" :options="years"/>
        </b-col>
      </b-row>
      <hr/>
      <b-row>
        <b-col cols="3"><label><b>DATA INICIAL</b></label></b-col>
        <b-col cols="3">
          <datepicker required :bootstrap-styling="true" format="dd/MM/yyyy" v-model="initialDate"></datepicker>
        </b-col>
        <b-col cols="3"><label><b>DATA FINAL</b></label></b-col>
        <b-col cols="3">
          <datepicker required :bootstrap-styling="true" format="dd/MM/yyyy" v-model="finalDate"></datepicker>
        </b-col>
      </b-row>
      <hr/>
      <div style="width: 100%; text-align: right;">
        <b-btn variant="danger" @click="hideModal" style="max-width: 100px">Cancelar</b-btn>
        <b-btn variant="success" @click="add" style="max-width: 100px">Confirmar</b-btn>
      </div>
    </b-modal>
  </div>
</template>

<script>
  /* eslint-disable */
  import Vue from 'vue';
  import datepicker from 'vuejs-datepicker';

  export default {
    name: 'add',
    components: {
      datepicker
    },
    data() {
      return {

        errors: [],
        showErrors: false,

        period: null,

        month: null,
        year: null,
        initialDate: new Date(),
        finalDate: new Date(),

        months: [
          {text: 'Janeiro', value: 'Janeiro'},
          {text: 'Fevereiro', value: 'Fevereiro'},
          {text: 'Março', value: 'Março'},
          {text: 'Abril', value: 'Abril'},
          {text: 'Maio', value: 'Maio'},
          {text: 'Junho', value: 'Junho'},
          {text: 'Julho', value: 'Julho'},
          {text: 'Agosto', value: 'Agosto'},
          {text: 'Setembro', value: 'Setembro'},
          {text: 'Outubro', value: 'Outubro'},
          {text: 'Novembro', value: 'Novembro'},
          {text: 'Dezembro', value: 'Dezembro'}
        ],

        years: [
          {text: '2018', value: '2018'},
          {text: '2019', value: '2019'},
          {text: '2020', value: '2020'},
          {text: '2021', value: '2021'},
          {text: '2022', value: '2022'},
          {text: '2023', value: '2023'},
        ],
      }
    },
    methods: {
      showModal() {
        this.$refs.modal.show();
      },
      hideModal() {
        this.$refs.modal.hide();
      },
      hideAlert() {
        this.showErrors = false;
        this.errors = [];
      },
      add() {
        this.$http().get('period/findByDescription', {params: {'description': this.month.toUpperCase() + '/' + this.year}}).then((response, err) => {
          if (err) {
            this.hideAlert();
            this.hideModal();
          } else {
            if (response.data) {
              this.errors.push('Período já cadastrado.');
              this.showErrors = true;
            } else {
              const period = {
                description: this.month + '/' + this.year,
                initialDate: this.initialDate,
                finalDate: this.finalDate,
              };
              this.$http().post('period', {params: {'period': period}}).then((response) => {
                this.$swal(
                  'Adicionado',
                  'Período adicionado com sucesso.',
                  'success',
                  this.hideModal(),
                  this.hideAlert(),
                  this.$emit('refresh'),
                );
              }, () => {
                this.$swal(
                  'Erro',
                  'Erro ao adicionar período.',
                  'error',
                  this.hideModal(),
                  this.hideAlert(),
                  this.$emit('refresh'),
                );
              });
            }
          }
        });
      }
    }, filters: {
      toUpper(value) {
        if (value) {
          return value.toUpperCase();
        }
      },
    }
  }
</script>

<style scoped>
  label {
    float: left;
  }

  .modal-add {
    width: auto;
  }

  .normal-input {
    width: 100%;
    text-align: center;
  }

</style>
