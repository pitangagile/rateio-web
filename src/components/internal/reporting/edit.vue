<template>
  <div>
    <b-button class="icon-edit" style="color: #3f3f40;" size="lg" variant="link" @click="handleOk"></b-button>
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
      type: Object,
      required: true,
    },
    totalHours: {
      type: Number,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    total: {
      required: true,
    },
  },
  data() {
    return {
      hours: 0,
    };
  },
  methods: {
    handleOk() {
      const url = 'reportings/update';
      const oldHours = this.row.hours;
      this.$swal({
        title: 'Editar',
        input: 'number',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        inputValue: oldHours,
        focusConfirm: false,
        reverseButtons: true,
        showCancelButton: true,
        inputAttributes: {
          min: 0,
        },
      }).then((result) => {
        if (result.value) {
          this.$http().post(url, { id: this.row._id, hours: document.getElementById('hours').value }).then(() => { //eslint-disable-line
            if (document.getElementById('hours').value) {
              this.$swal(
                'Editado',
                'Reportagem Editada.',
                'success',
                this.$emit('getAll'),
              );
            } else {
              this.$snotify.error('Não foi possível editar, digite um número válido');
            }
          }, (err) => {
            this.$snotify.error('Não foi possível editar, digite um número válido', err);
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

<style>
</style>
