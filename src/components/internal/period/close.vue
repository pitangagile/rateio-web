<template>
  <div>
    <b-button-group @click="closeCenter" class="icon-cancel" size="lg" variant="link" onmouseover="title='Fechar'"></b-button-group>
  </div>
</template>

<script>
import * as moment from 'moment';

export default {
  components: {
    moment,
  },
  props: {
    row: {
      required: true,
    },
  },
  data() {
    return {
      closureDate: new Date(),
    };
  },
  methods: {
    closeCenter() {
      const url = 'period/closuredate';
      this.$swal({
        title: 'Fechar Periodo',
        text: 'Tem certeza que deseja fechar o periodo',
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: 'btn btn-success',
        confirmButtonText: 'Sim, feche!',
        cancelButtonText: 'Não, cancele!',
        cancelButtonClass: 'btn btn-danger',
        reverseButtons: true,
      }).then((result) => {
        if (result.value) {
          const closure = moment(this.closureDate).format('D M YYYY');
          this.$http().post(url, { id: this.row._id, closuredate: closure}).then(() => { //eslint-disable-line
            this.$swal(
              'Sucesso!',
              'Periodo fechado.',
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
