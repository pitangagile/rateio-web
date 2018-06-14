<template>
  <div>
    <b-button-group @click="removePeriod" class="icon-trash" size="lg" variant="link" onmouseover="title='Remover'"></b-button-group>
  </div>
</template>

<script>
export default {
  components: {

  },
  props: {
    row: {
      required: true,
    },
  },
  methods: {
    removePeriod() {
      const url = 'period/delete';
      this.$swal({
        title: 'Remoção de Período',
        text: 'Tem certeza que deseja remover o período?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: 'btn btn-success',
        confirmButtonText: 'Sim, remova!',
        cancelButtonText: 'Não, cancele!',
        cancelButtonClass: 'btn btn-danger',
        reverseButtons: true,
      }).then((result) => {
        if (result.value) {
          this.$http().delete(url, { id: this.row._id }).then(() => { //eslint-disable-line
            this.$swal('Deletado!', 'Periodo deletado.', 'success');
          }).then(() => {
            this.$emit('allPeriods');
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
