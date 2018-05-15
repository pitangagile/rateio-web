<template>
  <div>
    <b-btn class="btn btn-danger" @click="showModal">Excluir</b-btn>
    <!-- Modal Component -->
    <b-modal ref="eraseModal"
             centered title="Você deseja realmente excluir?"
             ok-title="Sim"
             cancel-title="Não"
             v-on:cancel="clearModal"
             v-on:ok='handleOk'
             size="sm">
    </b-modal>
  </div>
</template>

<script>

export default {

  components: {

  },
  props: {
    table: {
      type: Array,
      required: true,
    },
    row: {
      required: true,
    },
  },
  data() {
    return {

    };
  },
  methods: {
    showModal() {
      this.$refs.eraseModal.show();
    },
    hideModal() {
      this.$refs.eraseModal.hide();
    },
    clearModal() {
      this.hours = '';
    },
    onChange(e) {
      this.tableCenter.map(item => item.id).indexOf(e);
      this.hours = '';
    },
    handleOk() {
      this.table.splice(this.row - 1, 1);
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
