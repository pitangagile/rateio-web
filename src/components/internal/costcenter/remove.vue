<template>
  <div>
    <b-button-group @click="removeCenter" class="icon-trash" size="lg" variant="link"></b-button-group>
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
    removeCenter() {
      const url = 'coastcenter/delete';
      const swalWithBootstrapButtons = this.$swal.mixin({
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
      });
      swalWithBootstrapButtons({
        title: 'Remoção de Centro de Custo',
        text: 'Tem certeza que deseja remover o centro de custo',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, remova!',
        cancelButtonText: 'Não, cancele!',
        reverseButtons: false,
      }).then((result) => {
        if (result.value) {
          this.$http().post(url, { id: this.row._id }).then(() => { //eslint-disable-line
            swalWithBootstrapButtons(
              'Deletado!',
              'Centro de custo deletado.',
              'success',
            );
          });
        } else if (
          result.dismiss === this.$swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons(
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
