<template>
  <div>
    <b-button variant="success" class="add-button" @click="showModal">Adicionar</b-button>
    <b-modal ref="modal" centered title="Adicionar Reportagem" ok-title="Adicionar"
             cancel-title="Cancelar" @ok="save">
      <p v-if="period_prop">{{period_prop.description | toUpperPeriod}}</p>
      <vue-single-select
        ref="select"
        option-key="code"
        option-label="description"
        v-model="costCenter"
        :options="costCenters"
        placeholder="Selecione um centro de custo"
        :required="true">
      </vue-single-select>
      <b-form-input
        id="qtdHours"
        type="number"
        v-model="hours"
        :min="min"
        required
        placeholder="Insira a quantidade de horas trabalhadas">
      </b-form-input>
    </b-modal>
  </div>
</template>

<script>
  /* eslint-disable */
  import VueSingleSelect from "vue-single-select";

  export default {
    components: {VueSingleSelect},
    props: {
      period_prop: {
        required: true,
      }
    },
    data() {
      return {
        min: 0,
        reporting: null,
        costCenter: null,
        costCenters: [],
        hours: 0
      };
    },
    mounted() {
      this.findUserCostCenterByUserIdWithoutReportingInPeriod();
    },
    computed: {
      user() {
        return this.$store.getters["auth/user"];
      }
    },
    methods: {
      // Centros de Custo que não possuem reportagem no período ativo por usuário
      findUserCostCenterByUserIdWithoutReportingInPeriod() {
        this.$http()
          .get("reporting/findUserCostCenterByUserIdWithoutReportingInPeriod", {
            params: {user_id: this.user.ID}
          })
          .then((response, err) => {
            if (err) console.log("err >", err);
            this.costCenters = response.data.data;
          });
      },
      save(event) {
        this.$http()
          .post("reporting", {
            params: {
              user_id: this.user.ID,
              period: this.period_prop,
              costCenter: this.costCenter,
              hours: this.hours
            }
          })
          .then(
            () => {
              this.$swal(
                "Adicionado",
                "Reportagem adicionada.",
                "success",
                this.$emit("refresh"),
              );
            },
            () => {
              this.$swal(
                "Erro",
                "Erro ao inserir reportagem.",
                "error",
                this.$emit("refresh")
              );
            }
          );
      },
      showModal() {
        this.findUserCostCenterByUserIdWithoutReportingInPeriod();
        this.$refs.modal.show();
      }
    }, filters: {
      toUpperPeriod(value) {
        if (value !== "" && value !== undefined && value !== undefined)
          return 'PERÍODO - ' + value.toUpperCase();
        return 'PERÍODO - N/A';
      }
    }
  };
</script>
<style lang="scss" scoped>
  #qtdHours {
    width: 100%;
    border-radius: 0cm;
  }
</style>
