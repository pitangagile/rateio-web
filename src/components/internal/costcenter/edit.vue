<template>
  <div>
    <b-button-group @click="editCenter()" class="icon-edit" size="lg" variant="link"></b-button-group>
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
      console.log(this.row); //eslint-disable-line
      const url = 'coastcenter/edit';
      this.$swal({
        title: 'Edição de Centro de Custo',
        html:
          '<input id="code" class="swal2-input">' +
          '<input id="description" class="swal2-input">',
        focusConfirm: false,
        preConfirm: () => { // eslint-disable-line
          return [
            this.$http().post(url,{id: this.row._id, code: document.getElementById('code').value, description: document.getElementById('description').value}).then(() => { // eslint-disable-line
              this.$snotify.success('Editado');
            }, (err) => {
              this.$snotify.error('Erro Centro de Custo', err);
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
