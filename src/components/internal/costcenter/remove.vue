coast center remove
<template>
  <a>
    <b-button-group @click="showModal" class="icon-trash btn-danger buttonStyle btn-sm" bsStyle="small"></b-button-group>
    <!-- Modal Component -->
    <b-modal ref="removeCoastCenterModal"
             centered title="Excluir Centro de Custo"
             ok-title="Ok"
             cancel-title="Cancelar"
             v-on:ok= 'removeCenter'>Deseja excluir o centro de custo?</b-modal>

  </a>
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
      this.$refs.removeCoastCenterModal.show();
    },
    hideModal() {
      this.$refs.removeCoastCenterModal.hide();
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

    padding: 5px 5px;
    margin: 0px 0px;
    margin-right: 10px;

}
</style>
