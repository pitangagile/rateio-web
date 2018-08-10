<template>
  <div>
    <b-btn @click="showModal()" class="icon-edit icon-table" size="sm" variant="warning"
                    onmouseover="title='Editar'"></b-btn>
    <!-- Modal Component -->
    <b-modal ref="myModalRef"
             centered title="Editar Centro de Custo"
             ok-title="Ok"
             cancel-title="Cancelar"
             v-on:ok=editCenter
             no-close-on-backdrop>
      <form>
        <b-form-input type="text"
                      placeholder="Código"
                      v-model="code"
                      class="mb-2"
        ></b-form-input>
        <b-form-input type="text"
                      placeholder="Descrição"
                      v-model="description"
                      class="mb-2"
        ></b-form-input>
      </form>
    </b-modal>
  </div>
</template>

<script>
  /* eslint-disable */
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
        code: String,
        description: String,
      };
    },

    methods: {
      showModal() {
        this.$refs.myModalRef.show();
        this.code = this.row.code;
        this.description = this.row.description;
      },
      hideModal() {
        this.cancelSwal();
        this.$refs.myModalRef.hide();
      },
      editCenter() {
        const center = {
          code: this.code,
          description: this.description,
        };
        const url = 'costcenter';
        this.$http().put(url,
          {
            id: this.row._id, // eslint-disable-line
            code: center.code,
            description: center.description
          }).then(() => {
          this.$swal(
            'Editado',
            'Centro de custo Editado.',
            'success',
            this.$emit('refresh'),
          );
        }, () => {
          this.$swal(
            'Erro',
            '',
            'error',
          );
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
