<template>
  <div>
    <b-button-group @click="showModal()" class="icon-edit" size="lg" variant="link" onmouseover="title='Editar'" ></b-button-group>
    <!-- Modal Component -->
    <b-modal ref="myModalRef"
             centered title="Editar Centro de Custo"
             ok-title="Ok"
             cancel-title="Cancelar"
             v-on:ok= editCenter
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
      const url = 'coastcenter';
      this.$http().put(url,
      { id: this.row._id, // eslint-disable-line
          code: center.code,
          description: center.description }).then(() => {
        this.$swal(
          'Editado',
          'Centro de custo Editado.',
          'success',
          this.$emit('allCenters'),
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
