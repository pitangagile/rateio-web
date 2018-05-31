<template>
  <div>
    <b-button class="icon-edit" style="color: #3f3f40;" size="lg" variant="link" @click="openEditModal"></b-button>
  </div>
</template>

<script>

export default {
  components: {

  },
  props: {
    row: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      hours: 0,
    };
  },
  methods: {
    openEditModal() {
      this.$swal({
        title: 'Editar',
        input: 'number',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        focusConfirm: false,
        reverseButtons: true,
        showCancelButton: true,
        inputValue: this.row.hours,
        inputAttributes: {
          min: 0,
          id: 'hours',
        },
      }).then((result) => {
        if (result.value) {
          const newHours = document.getElementById('hours').value;
          this.row.hours = newHours;
          if (newHours >= 0 && newHours != null) {
            this.$swal(
              'Editado',
              'Reportagem Editada.',
              'success',
              this.$emit('getAll'),
            );
          } else {
            this.$snotify.error('Não foi possível editar, digite um número válido');
          }
        } else if (// end
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
