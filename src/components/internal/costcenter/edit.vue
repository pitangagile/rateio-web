<template>
  <div slot="afterFilter">
    <b-button-group @click="showModal" class="icon-edit btn-info buttonStyle btn-sm" ></b-button-group>
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
    clearModal() {
      this.code = '';
      this.description = '';
    },
    editCenter() {
      const centerid = this.table[this.row - 1];
      const newcenter = {
        code: this.code,
        description: this.description,
      };
      const url = 'coastcenter/edit';
      this.$http().post(url,{id: centerid._id, code: this.code, description: this.description}).then((response) => { // eslint-disable-line
        this.table.splice((this.row - 1), 1, newcenter);
        this.clearModal();
        this.$snotify.success('Editado');
      }, (err) => {
        this.$snotify.error('Erro Centro de Custo', err);
      });
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
