<template>
  <div>
    <b-button class="icon-edit" style="color: #3f3f40;" size="lg" variant="link" @click="showModal"></b-button>
    <!-- Modal Component -->
    <b-modal ref="editModal"
             centered title="Editar"
             ok-title="Salvar"
             cancel-title="Cancelar"
             v-on:ok="handleOk(hours)">
      <form>
        <b-form-input type="number"
                      min=0
                      placeholder="Horas"
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
    row: {
      required: true,
    },
  },
  data() {
    return {
      hours: '',
    };
  },
  methods: {
    handleOk(hours) {
      if (hours !== '' || hours > 0) {
        const newReport = this.table[this.row - 1];
        const url = 'reportings/update';
        this.table[this.row - 1].hours = this.hours;

        this.$http().post(url, {id: newReport._id, hours: this.hours}).then((response) => { // eslint-disable-line
          console.log(newReport) // eslint-disable-line
        },
        (err) => {
          console.error(response.data, err); // eslint-disable-line
        });
        this.$snotify.success('Suas horas foram atualizadas', 'Sucesso', {
          timeout: 2000,
          showProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
        });
      } else {
        this.$snotify.error('Digite um número válido');
      }
    },
    showModal() {
      this.$refs.editModal.show();
    },
    hideModal() {
      this.$refs.editModal.hide();
    },
    clearModal() {
      this.hours = '';
    },
    onChange(e) {
      this.tableCenter.map(item => item.id).indexOf(e);
      this.hours = '';
    },
  },
};
</script>

<style>
</style>
