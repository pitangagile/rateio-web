<template>
  <div>
    <b-btn class="btn btn-danger" @click="showModal">Excluir</b-btn>
    <!-- Modal Component -->
    <b-modal ref="myModalRef"
             centered title="Você deseja realmente excluir?"
             ok-title="Sim"
             cancel-title="Não"
             v-on:cancel="handleCancel"
             v-on:ok="handleOk"
             size="sm">
    </b-modal>
  </div>
</template>

<script>
import index from './index';

export default {
  components: {
    index,
  },
  data() {
    return {
      hours: '',
    };
  },
  methods: {
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
    handleOk() {
      this.$snotify.success('Reportagem excluída com sucesso', 'Sucesso', {
        timeout: 2000,
        showProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
      });
    },
  },
};
</script>
