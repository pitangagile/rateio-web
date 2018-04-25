<template>
  <div>
    <b-btn @click="showModal" >Adicionar</b-btn>
    <!-- Modal Component -->
    <b-modal ref="myModalRef"
             centered title="Cadastro de Centro de Custo"
             ok-title="Salvar"
             cancel-title="Cancelar"
             v-on:cancel="clearModal"
             v-on:ok= "addNewCenter">
      <form>
        <b-form-input type="text"
                      placeholder="ID"
                      v-model="id"></b-form-input>
        <b-form-input type="text"
                      placeholder="Name"
                      v-model="name"></b-form-input>
      </form>
    </b-modal>
  </div>
</template>

<script>
import tableCenter from './index';

export default {
  components: {
    tableCenter,
  },
  data() {
    return {
      id: '',
      name: '',
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
      this.id = '';
      this.name = '';
    },
    addNewCenter() {
      this.tableCenter.push({
        id: this.id,
        name: this.name,
      });
      this.clearModal();
    },

    onChange(e) {
      this.tableCenter.map(item => item.id).indexOf(e);
      this.id = '';
      this.name = '';
    },
  },
};
</script>
