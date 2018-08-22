<template>
  <div>
    <b-button variant="warning" class="icon-edit icon-table" size="sm" @click="showModal"></b-button>
    <b-modal ref="modal" centered title="Editar Reportagem" ok-title="Confirmar"
             cancel-title="Cancelar" @ok="update()">
      <p v-if="reporting.period.description"><b>PERÍODO : </b>{{reporting.period.description | toUpper}}</p>
      <label v-if="reporting.costCenter.description"><b>CENTRO DE CUSTO
        : </b>{{reporting.costCenter.description}}</label>
      <b-form-input
        id="qtdHours"
        v-if="reporting.totalHoursCostCenter"
        type="number"
        v-model="reporting.totalHoursCostCenter"
        required
        :min="0"
        placeholder="Quantidade de horas trabalhadas no CC">
      </b-form-input>
    </b-modal>
  </div>
</template>

<script>
  /* eslint-disable */
  export default {
    props: {
      reporting: {
        required: true,
      },
    },
    data() {
      return {
      };
    },
    methods: {
      showModal() {
        this.$refs.modal.show();
      },
      update() {
        this.$http().put('reporting', this.reporting).then(() => {
          this.$swal(
            'Adicionado',
            'Reportagem atualizada.',
            'success',
            this.$emit('refresh'),
          );
        }, () => {
          this.$swal(
            'Erro',
            'Erro ao atualizar reportagem.',
            'error',
            this.$emit('refresh'),
          );
        });
      },
    },
    filters: {
      toUpper(value) {
        if (value !== null && value !== undefined ){
          return value.toUpperCase();
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .icon-table {
    margin: 1px;
  }

  p {
    text-align: left;
  }

  label {
    float: left;
  }

  #qtdHours{
    width: 100%;
    border-radius: 0cm;
  }

</style>
