<template>
  <div>
    <b-btn @click="showModal" >Adicionar</b-btn>
    <!-- Modal Component -->
    <b-modal ref="addCoastCenterModal"
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
      this.$refs.addCoastCenterModal.show();
    },
    hideModal() {
      this.$refs.addCoastCenterModal.hide();
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
      const url = 'coastcenter/create';

      this.$http().post(url, center).then((response) => {
        console.log(response.data) // eslint-disable-line
      },
      (err) => {
        console.error(response.data, err); // eslint-disable-line
      });
      this.table.push(center);
      this.$snotify.info('Adicionado');
      this.clearModal();
    },
  },
};
</script>
