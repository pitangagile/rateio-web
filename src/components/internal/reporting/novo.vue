
<template>
  <div>
    <b-btn @click="showModal" class="btn-success" >Adicionar</b-btn>
    <!-- Modal Component -->
    <b-modal ref="addCoastCenterModal"
             centered title="Cadastro de Centro de Custo"
             ok-title="Salvar"
             cancel-title="Cancelar"
             v-on:cancel="clearModal"
             v-on:ok= 'addNewCenter'>
      <form>
        <b-form-input type="text"
                      placeholder="period"
                      v-model="period"></b-form-input>
        <b-form-input type="text"
                      placeholder="costCenter"
                      v-model="costCenter"></b-form-input>
        <b-form-input type="number"
                      placeholder="hours"
                      v-model="hours"></b-form-input>
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
      hours: 0,
      costCenter: '',
      period: '',
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
      this.period = '';
      this.costCenter = '';
      this.hours = 0;
    },
    addNewCenter() {
      const center = {
        period: this.period,
        costCenter: this.costCenter,
        hours: this.hours,
      };
      const url = 'reportings/create';
      this.$http().post(url, center).then((response) => { // eslint-disable-line
        console.log(response.data) // eslint-disable-line
      }, (err) => {
        this.$snotify.error('Centro ja adicionado', err);
      });
      this.table.push(center);
      this.$snotify.success('Adicionado');
      this.clearModal();
    },
  },
};
</script>
