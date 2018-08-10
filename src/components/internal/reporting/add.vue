<template>
  <div>
    <b-button variant="success" class="add-button" @click="showModal">Adicionar</b-button>
    <b-modal ref="modal" centered title="Adicionar Reportagem" ok-title="Adicionar"
             cancel-title="Cancelar" @ok="save">
      <p v-if="period">Período - {{period.description}}</p>
      <vue-single-select
        ref="selectCostCenter"
        option-key="code"
        option-label="description"
        v-model="costCenter"
        :options="costCenters"
        placeholder="Selecione um centro de custo"
        :required="true">
      </vue-single-select>
      <b-form-input
        type="number"
        v-model="hours"
        required
        placeholder="Insira um percentual">
      </b-form-input>
    </b-modal>
  </div>
</template>

<script>
  /* eslint-disable */
  import VueSingleSelect from "vue-single-select";

  // FIXME: Buscar usuário da sessão
  const user_id = '5b6240f74855b1272d7d500e';

  export default {
    components: {VueSingleSelect},
    data() {
      return {
        reporting: null,
        period: null,
        costCenter: null,
        hours: 0,
        costCenters: [],
      }
    },
    mounted() {
      this.pickActivePeriod();
      this.findUserCostCentersByUserId();
    }, methods: {
      pickActivePeriod() {
        this.$http().get('period/pickActivePeriod').then((response, err) => {
          if (err)
            console.log('err >', err);
          console.log('response.data > ', response.data)
          this.period = response.data;
        });
      },
      findUserCostCentersByUserId() {
        this.$http().get('employee/findUserCostCentersByUserId', {params: {'user_id': user_id}}).then((response, err) => {
          if (err)
            console.log('err >', err);
          this.costCenters = response.data.data;
        });
      },
      save(event) {
        this.$http().post('reporting', {params: {'user_id': user_id , 'period' : this.period, 'costCenter' : this.costCenter, 'hours' : this.hours}}).then(() => {
          this.$swal(
            'Adicionado',
            'Reportagem adicionada.',
            'success',
            this.$emit('refresh'),
          );
        }, () => {
          this.$swal(
            'Erro',
            'Erro ao inserir reportagem.',
            'error',
            this.$emit('refresh'),
          );
        });
      },
      addCenter() {
      },
      showModal() {
        this.$refs.modal.show();
      },
      hideModal() {
        this.$refs.modal.hide();
      },
      clearModal() {
        this.selectedCostCenter = null;
      },
    }
  }
</script>

<style scoped>
</style>
