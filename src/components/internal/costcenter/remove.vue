<template>
  <div>
    <b-button-group @click="removeCenter" class="icon-trash" size="lg" variant="link"
                    onmouseover="title='Remover'"></b-button-group>
  </div>
</template>

<script>
  /* eslint-disable */
  export default {
    components: {},
    props: {
      row: {
        required: true,
      },
    },
    data() {
      return {};
    },
    methods: {
      removeCenter() {
        const url = 'costcenter';
        this.$swal({
          title: 'Remoção de Centro de Custo',
          text: 'Tem certeza que deseja remover o centro de custo',
          type: 'warning',
          showCancelButton: true,
          confirmButtonClass: 'btn btn-success',
          confirmButtonText: 'Sim, remova!',
          cancelButtonText: 'Não, cancele!',
          cancelButtonClass: 'btn btn-danger',
          allowOutsideClick: false,
          reverseButtons: true,
        }).then((result) => {
          if (result.value) {
            this.$http().delete(`${url}/${this.row._id}`).then(() => { //eslint-disable-line
              this.$swal(
                'Deletado!',
                'Centro de custo deletado.',
                'success',
              );
              this.$emit('refresh');
            }).catch((err) => { //eslint-disable-line
              this.$swal(
                'Falha na remoção do Centro selecionado',
                '',
                'error',
              );
            });
          }
        });
      },
    },
  };
</script>

<style lang="scss" scoped>

</style>
