<template>
  <b-row>
    <b-col cols="12">
      <div id="element">
        <vue-single-select
          ref="select"
          option-key="code"
          option-label="description"
          v-model="selectedCoastCenter"
          :options="coastCenters"
          placeholder="Selecione um centro de custo"
          :required="true">
        </vue-single-select>
      </div>
      <b-button variant="primary" v-on:click="addCoastCenter">Adicionar</b-button>
    </b-col>
  </b-row>
</template>

<script>
  /* eslint-disable */
  import Vue from 'vue';
  import VueSingleSelect from "vue-single-select";

  // FIXME: Buscar usuário da sessão
  const user_id = '5b6240f74855b1272d7d500e';
  export default {
    name: 'AddCC',
    components: {
      VueSingleSelect,
    },
    data() {
      return {
        selectedCoastCenter: null,
        coastCenters: []
      }
    },
    methods: {
      findCoastCentersWithoutUserId() {
        this.$http().get('employee/findCoastCentersWithoutUserId', {params: {'user_id': user_id}}).then((response, err) => {
          if (err)
            console.log('err >', err);
          this.coastCenters = response.data;
        });
      },
      addCoastCenter() {
        if (this.selectedCoastCenter === null || this.selectedCoastCenter === undefined) {
          this.$snotify.warning('Selecione um centro de custo');
        } else {
          this.$http().post('employee/addCoastCenter', {
            params: {
              'user_id': user_id,
              'coastCenter': this.selectedCoastCenter
            }
          }).then(() => {
            this.$swal(
              'Adicionado',
              'Centro de custo adicionado.',
              'success',
              this.$emit('refreshGrid'),
            );
            this.findCoastCentersWithoutUserId();
          }, () => {
            this.refreshSelect();
            this.$swal(
              'Erro',
              '',
              'error',
              this.$emit('refreshGrid'),
            );
          });
        }
      }
    },
    mounted() {
      this.findCoastCentersWithoutUserId();
    },
  };
</script>

<style lang="scss" scoped>
  #element {
    padding: 20px 0px 20px 0px;
    max-width: 300px;
  }
</style>
