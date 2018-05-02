<template>
  <div>
    <b-btn @click="showModal" >Adicionar</b-btn>
    <!-- Modal Component -->
    <b-modal ref="myModalRef"
             centered title="Cadastro de Centro de Custo"
             ok-title="Salvar"
             cancel-title="Cancelar"
             v-on:cancel="clearModal"
             v-on:ok= 'addNewCenter'>
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
    clearModal() {
      this.code = '';
      this.description = '';
    },
    addNewCenter() {
      const center = {
        code: this.code,
        description: this.description,
      };
      this.table.push(center);
    },
  },
};
</script>
