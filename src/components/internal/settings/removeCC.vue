<template>
  <b-btn @click="removeCenter(_id)" class="icon-trash" size="lg" variant="link" onmouseover="title='Remover'"></b-btn>
</template>

<script>
  /* eslint-disable */

  // FIXME: Buscar usuário da sessão
  const user_id = '5b6240f74855b1272d7d500e';

  export default {
    name: 'RemoveCC',
    components: {},
    props: {
      _id: {
        required: true,
      },
    },
    methods: {
      removeCenter(_id) {
        this.$http().delete('employee', {
          params: {
            'user_id': user_id,
            'coastCenterId': _id
          }
        }).then(() => {
          this.$swal(
            'Removido',
            'Centro de custo removido.',
            'success',
            this.$emit('refreshGrid'),
          );
        }, () => {
          this.$swal(
            'Erro',
            '',
            'error',
            this.$emit('refreshGrid'),
          );
        });
      }
    },
  };
</script>

<style lang="scss" scoped>

</style>
