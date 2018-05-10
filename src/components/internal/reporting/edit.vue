<template>
  <div>
    <b-btn class="btn btn-info icon-edit" style="font-size: larger;" @click="showModal"></b-btn>
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
      if (hours !== '' || hours < 0) {
        const id = this.row - 1;
        const oldReport = this.table[id];
        const newReport = {
          hours: this.hours,
          costCenter: oldReport.costCenter,
          period: oldReport.period,
        };
        this.table.splice(id, 1, newReport);
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
