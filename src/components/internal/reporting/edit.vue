<template>
  <div>
    <b-btn @click="showModal">Editar</b-btn>
    <!-- Modal Component -->
    <b-modal ref="myModalRef"
             centered title="Editar"
             ok-title="Salvar"
             cancel-title="Cancelar"
             v-on:cancel="handleCancel"
             v-on:ok="handleOk(hours)">
      <form>
        <b-form-input type="number"
                      min="0"
                      placeholder="Horas"
                      v-model="hours"></b-form-input>
      </form>
    </b-modal>
  </div>
</template>

<script>
import tableData from './index';

export default {
  components: {
    tableData,
  },
  data() {
    return {
      hours: '',
    };
  },
  methods: {
    handleOk(hours) {
      if (hours !== '') {
        this.$snotify.success('Suas horas foram atualizadas', 'Sucesso', {
          timeout: 2000,
          showProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
        });
      } else {
        this.$snotify.error('Digite um número válido');
      }
      this.hours.push(this.hours);
    },
    handleCancel() {
    },
    showModal() {
      this.$refs.myModalRef.show();
    },
    hideModal() {
      this.$refs.myModalRef.hide();
    },
    clearModal() {
      this.hours = '';
    },
    onChange(e) {
      this.tableCenter.map(item => item.id).indexOf(e);
      this.hours = '';
    },
  },
};
</script>
