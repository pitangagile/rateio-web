<template>
  <div>
    <b-btn @click="showModal" class="btn-success">Adicionar</b-btn>
    <b-modal ref="modal" centered title="Adicionar Colaborador" ok-title="Confirmar"
             cancel-title="Cancelar" @ok="add()">
      <b-row>
        <b-col cols="4"><label><b>NOME</b></label></b-col>
        <b-col cols="8">
          <b-form-input class="input-form" type="text" v-model="name" required></b-form-input>
        </b-col>
      </b-row>
      <hr/>
      <b-row>
        <b-col cols="4"><label><b>E-MAIL</b></label></b-col>
        <b-col cols="8">
          <b-form-input class="input-form" type="text" v-model="email" required></b-form-input>
        </b-col>
      </b-row>
      <hr/>
      <b-row>
        <b-col cols="4"><label><b>MATRÍCULA</b></label></b-col>
        <b-col cols="8">
          <b-form-input class="input-form" type="text" v-model="registration" required></b-form-input>
        </b-col>
      </b-row>
      <hr/>
      <b-row>
        <b-col cols="4"><label><b>CARGA HORÁRIA</b></label></b-col>
        <b-col cols="8">
          <b-form-input class="input-form" type="number" v-model="workHours" required></b-form-input>
        </b-col>
      </b-row>
      <hr/>
      <b-row>
        <b-col cols="4"><label><b>PESSOA JURÍDICA</b></label></b-col>
        <b-col cols="8">
          <b-form-checkbox required v-model="isPj" style="float: left;"></b-form-checkbox>
        </b-col>
      </b-row>
      <hr/>
      <b-row>
        <b-col cols="4"><label><b>PERFIL</b></label></b-col>
        <b-col cols="8">
          <b-form-select required class="input-form" v-model="role" :options="roles"/>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
  /* eslint-disable */

  export default {
    showLoading: true,
    data() {
      return {
        name : '',
        email: '',
        workHours: 0,
        isPj: false,
        registration : '',
        role : '',
        roles : [
          { value: 'colaborador', text: 'Colaborador' },
          { value: 'gerente' , text: 'Gerente' },
          { value: 'administrador', text: 'Administrador' },
        ],
      }
    },
    methods: {
      showModal() {
        this.$refs.modal.show();
      },
      add() {
        const newEmployee = {
          'name' : this.name,
          'email': this.email,
          'workHours': this.workHours,
          'isPj': this.isPj,
          'registration' : this.registration,
          'role' : this.role,
        };
        this.$http().post('employee', {params: {'employee' : newEmployee}}).then(() => {
          this.$swal(
            'Adicionado',
            'Colaborador adicionado.',
            'success',
            this.$emit('refresh'),
          );
        }, () => {
          this.$swal(
            'Erro',
            'Erro ao adicionar colaborador.',
            'error',
            this.$emit('refresh'),
          );
        });
      }
    },
  };
</script>

<style lang="scss" scoped>
  label {
    float: left;
  }

  .input-form {
    width: 100% !important;
    border-radius: 5px !important;
  }
</style>
