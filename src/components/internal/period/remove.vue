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
  data() {
    return {
      code: '',
      description: '',
    };
  },
  methods: {
    removePeriod() {
      const url = 'period/delete';
      this.$swal({
        title: 'Remoção de Periodo',
        text: 'Tem certeza que deseja remover o periodo',
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: 'btn btn-success',
        confirmButtonText: 'Sim, remova!',
        cancelButtonText: 'Não, cancele!',
        cancelButtonClass: 'btn btn-danger',
        reverseButtons: true,
      }).then((result) => {
        if (result.value) {
          this.$http().post(url, { id: this.row._id }).then(() => { //eslint-disable-line
            this.$swal(
              'Deletado!',
              'Periodo deletado.',
              'success',
            );
          }).then(() => {
            this.$emit('allPeriods');
          });
        } else if (
          result.dismiss === this.$swal.DismissReason.cancel
        ) {
          this.$swal(
            'Cancelado',
            '',
            'error',
          );
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
