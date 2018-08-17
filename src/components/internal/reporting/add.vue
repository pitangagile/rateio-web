<template>
  <div>
    <b-button variant="success" class="add-button" @click="showModal">Adicionar</b-button>
    <b-modal ref="modal" centered title="Adicionar Reportagem" ok-title="Adicionar"
             cancel-title="Cancelar" @ok="save">
      <p v-if="period">Período - {{period.description.toUpperCase()}}</p>
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
  components: { VueSingleSelect },
  props: {},
  data() {
    return {
      min: 0,
      reporting: null,
      period: null,
      costCenter: null,
      costCenters: [],
      hours: 0
    };
  },
  mounted() {
    this.pickActivePeriod();
    this.findUserCostCenterByUserIdWithoutReportingInPeriod();
  },
  computed: {
    user() {
      return this.$store.getters["auth/user"];
    }
  },
  methods: {
    pickActivePeriod() {
      this.$http()
        .get("period/pickActivePeriod")
        .then((response, err) => {
          if (err) console.log("err >", err);
          this.period = response.data;
        });
    },
    // Centros de Custo que não possuem reportagem no período ativo por usuário
    findUserCostCenterByUserIdWithoutReportingInPeriod() {
      this.$http()
        .get("reporting/findUserCostCenterByUserIdWithoutReportingInPeriod", {
          params: { user_id: this.user.ID }
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
            period: this.period,
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
  }
};
</script>
<style lang="scss" scoped>
#qtdHours {
  width: 100%;
  border-radius: 0cm;
}
</style>
