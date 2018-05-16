<template>
  <a>
    <b-button-group @click="showModal" class="icon-edit btn-info button Style btn-sm" ></b-button-group>
    <!-- Modal Component -->
    <b-modal ref="editCoastCenterModal"
             centered title="Editar Centro de Custo"
             ok-title="Salvar"
             cancel-title="Cancelar"
             v-on:ok= 'editCenter'>
      <form>
        <b-form-input type="text"
                      placeholder="Código"
                      v-model="code"></b-form-input>
        <b-form-input type="text"
                      placeholder="Descrição"
                      v-model="description"></b-form-input>
      </form>
    </b-modal>
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
      code: this.table[this.row - 1].code,
      description: this.table[this.row - 1].description,
    };
  },
  methods: {
    showModal() {
      this.$refs.editCoastCenterModal.show();
    },
    hideModal() {
      this.$refs.editCoastCenterModal.hide();
    },
    editCenter() {
      const id = this.row - 1;
      const newcenter = {
        code: this.code,
        description: this.description,
      };
      this.table.splice(id, 1, newcenter);
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
