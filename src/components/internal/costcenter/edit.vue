<template>
  <div>
    <b-btn @click="showModal" class="btn btn-info" style="margin:13px 12px 12px 10px" >Editar</b-btn>
    <!-- Modal Component -->
    <b-modal ref="myModalRef"
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
      this.$refs.myModalRef.show();
    },
    hideModal() {
      this.$refs.myModalRef.hide();
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
