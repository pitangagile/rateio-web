settings remove
<template>
  <div>
    <b-btn @click="showModal" class="icon-trash btn btn-danger buttonStyle btn-sm"></b-btn>
    <!-- Modal Component -->
    <b-modal ref="removeCoastCenterUserModal"
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
      this.$refs.removeCoastCenterUserModal.show();
    },
    hideModal() {
      this.$refs.removeCoastCenterUserModal.hide();
    },
    removeCenter() {
      this.table.splice((this.row - 1), 1);
      this.$snotify.info('Deletado');
    },
  },
};
</script>

<style lang="scss" scoped>
.buttonStyle
{

    margin: 0px 0px;
    margin-right: 10px;

}
</style>
