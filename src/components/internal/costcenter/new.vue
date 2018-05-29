<template>
  <div>
    <b-btn @click="addNewCenter" class="btn-success" >Adicionar</b-btn>
  </div>
</template>

<script>

export default {
  components: {

  },
  props: {

  },
  data() {
    return {
      code: '',
      description: '',
    };
  },
  methods: {
    addNewCenter() {
      const url = 'coastcenter/create';
      this.$swal({
        title: 'Adição de Centro de Custo',
        html:
          '<a style="float: left;" autofocus>Codigo:<a/>' +
          '<input id="code" class="swal2-input">' +
          '<a style="float: left;" autofocus>Descrição:<a/>' +
          '<input id="description" class="swal2-input">',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        confirmButtonText: 'Adicionar',
        cancelButtonText: 'Cancelar',
        focusConfirm: false,
        showCancelButton: true,
        reverseButtons: true,
      }).then((result) => {
        if (result.value) {
          this.$http().post(url, { code: document.getElementById('code').value, description: document.getElementById('description').value }).then(() => { //eslint-disable-line
            this.$swal(
              'Adicionado',
              'Centro de custo adicionado.',
              'success',
              this.$emit('allCenters'),
            );
          }, (err) => {
            this.$snotify.error('Centro ja adicionado', err);
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
