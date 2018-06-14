<template>
  <div>
    <b-button class="icon-edit" style="color: #3f3f40;" variant="link" @click="openEditModal"></b-button>
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
    table: {
      required: true,
    },
  },
  data() {
    return {
      percentage: 0,
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
        inputValue: this.row.percentage,
        inputAttributes: {
          min: 0,
          id: 'percentage',
        },
      }).then((result) => {
        if (result.value) {
          const newPercentage = document.getElementById('percentage').value;
          this.row.percentage = newPercentage;
          if (newPercentage >= 0 && newPercentage != null) {
            this.$swal(
              'Editado',
              'Reportagem Editada.',
              'success',
              this.$emit('getAll'),
            );
          } else {
            this.$snotify.error('Não foi possível editar, digite um número válido');
          }
        }
      });
    },
  },
};
</script>

<style>
</style>
