<template>
  <div>
    <b-button-group @click="editCenter()" class="icon-edit" size="lg" variant="link" onmouseover="title='Editar'"></b-button-group>
  </div>
</template>

<script>
import tableCenter from './index';

export default {
  components: {
    tableCenter,
  },
  props: {
    row: {
      required: true,
    },
  },
  data() {
    return {
      code: this.row.code,
      description: this.row.description,
    };
  },
  methods: {
    editCenter() {
      const url = 'coastcenter/edit';
      this.$swal({
        title: 'Edição de Centro de Custo',
        html:
          '<a style="float: left;" autofocus>Codigo :<a/>' +
          '<input id="code" class="swal2-input">' +
          '<a style="float: left;" >Descrição :<a/>' +
          '<input id="description" class="swal2-input">',
        focusConfirm: false,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
        preConfirm: () => { // eslint-disable-line
          return [
            this.$http().post(url,
              { id: this.row._id, // eslint-disable-line
                code: document.getElementById('code').value,
                description: document.getElementById('description').value }).then(() => {
              this.$swal(
                'Adicionado',
                'Centro de custo adicionado.',
                'success',
                this.$emit('allCenters'),
              );
            }, () => {
              this.$swal(
                'Erro',
                '',
                'error',
              );
            }),
          ];
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
