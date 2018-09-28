<template>
  <div>
    <b-button variant="warning" class="icon-edit icon-table" size="sm" @click="showModal"></b-button>
    <b-modal ref="modal" centered title="Editar Colaborador" ok-title="Confirmar"
             cancel-title="Cancelar" @ok="update()">
      <b-row>
        <b-col cols="4"><label><b>NOME</b></label></b-col>
        <b-col cols="8">
          <b-form-input type="text" v-model="employee.name" required></b-form-input>
        </b-col>
      </b-row>
      <hr/>
      <b-row>
        <b-col cols="4"><label><b>E-MAIL</b></label></b-col>
        <b-col cols="8">
          <b-form-input type="text" v-model="employee.email" required></b-form-input>
        </b-col>
      </b-row>
      <hr/>
      <b-row>
        <b-col cols="4"><label><b>MATRÍCULA</b></label></b-col>
        <b-col cols="8">
          <b-form-input type="text" v-model="employee.registration" required></b-form-input>
        </b-col>
      </b-row>
      <hr/>
      <b-row>
        <b-col cols="4"><label><b>CARGA HORÁRIA</b></label></b-col>
        <b-col cols="8">
          <b-form-input type="number" v-model="employee.workHours" required></b-form-input>
        </b-col>
      </b-row>
      <hr/>
      <b-row>
        <b-col cols="4"><label><b>PESSOA JURÍDICA</b></label></b-col>
        <b-col cols="8">
          <b-form-checkbox required v-model="employee.isPj" style="float: left;"></b-form-checkbox>
        </b-col>
      </b-row>
      <hr/>
      <b-row>
        <b-col cols="4"><label><b>PERFIL</b></label></b-col>
        <b-col cols="8">
          <b-form-select v-model="employee.role" :options="roles" class="mb-3" />
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
  /* eslint-disable */

  export default {
    showLoading: true,
    props: {
      employee: {
        type: Object,
        required: true,
      }
    },
    data() {
      return {
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
      update() {
        console.log('this.employee', this.employee);
        this.$http().put('employee', {params: {'employee' : this.employee}}).then(() => {
          this.$swal(
            'Adicionado',
            'Colaborador atualizado.',
            'success',
            this.$emit('refresh'),
          );
        }, () => {
          this.$swal(
            'Erro',
            'Erro ao atualizar colaborador.',
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
</style>
