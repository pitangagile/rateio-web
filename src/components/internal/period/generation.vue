<template>
  <div>
    <b-btn @click="closeCenter" class="icon-edit icon-table" size="sm" variant="primary"
                    onmouseover="title='Gerar'"></b-btn>
  </div>
</template>

<script>
  /* eslint-disable */
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
        generationDate: new Date(),
      };
    },
    methods: {
      closeCenter() {
        const url = 'period/generationdate';
        this.$swal({
          title: 'Gerar Rateio',
          text: 'Tem certeza que deseja gera rateio',
          type: 'warning',
          showCancelButton: true,
          confirmButtonClass: 'btn btn-success',
          confirmButtonText: 'Sim, gere!',
          cancelButtonText: 'Não, cancele!',
          cancelButtonClass: 'btn btn-danger',
          reverseButtons: true,
        }).then((result) => {
          if (result.value) {
            const generation = moment(this.generationDate).format('D M YYYY');
            this.$http().post(url, {id: this.row._id, generationdate: generation}).then(() => { //eslint-disable-line
              this.$swal(
                'Sucesso!',
                'Rateio gerado.',
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
  .icon-table {
    margin: 1px;
  }
</style>
