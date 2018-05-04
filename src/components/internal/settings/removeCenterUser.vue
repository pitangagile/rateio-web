<template>
  <div>
    <b-btn @click="showModal" class="btn btn-danger" style="margin:13px 12px 12px 10px">Remover</b-btn>
    <!-- Modal Component -->
    <b-modal ref="myModalRef"
             centered title="Excluir Centro de Custo"
             ok-title="Ok"
             cancel-title="Cancelar"
             v-on:ok= 'removeCenter'>Deseja excluir o centro de custo?</b-modal>

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
      code: '',
      description: '',
    };
  },
  methods: {
    showModal() {
      this.$refs.myModalRef.show();
    },
    hideModal() {
      this.$refs.myModalRef.hide();
    },
    removeCenter() {
      this.table.splice((this.row - 1), 1);
      this.$snotify.info('Deletado');
    },
  },
};
</script>
