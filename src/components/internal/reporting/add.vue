<template>
  <div>
    <b-button variant="success" class="add-button" @click="showModal">Adicionar</b-button>
    <b-modal ref="modal" centered title="Adicionar Reportagem" ok-title="Adicionar"
             cancel-title="Cancelar" @ok="save">
      <p v-if="period"><b>PERÍODO :</b> {{period.description | toUpper}}</p>
      <b-form-select id="select" v-model="costCenter"class="mb-3" required >
        <option v-for="cc in costCenters" :value="cc">{{cc.description | toUpper}}</option>
      </b-form-select>
      <b-form-input
        id="qtdHours"
        type="number"
        v-model="totalHoursCostCenter"
        :min="0"
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
      period: {
        required: true,
      }
    },
    data() {
      return {
        reporting: null,
        costCenter: null,
        costCenters: [],
        totalHoursCostCenter: 0
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
              period: this.period,
              costCenter: this.costCenter,
              totalHoursCostCenter: this.totalHoursCostCenter
            }
          })
          .then(
            () => {
              this.$swal(
                "Adicionado",
                "Reportagem adicionada.",
                "success",
                this.costCenter = null,
                this.totalHoursCostCenter = null,
                this.findUserCostCenterByUserIdWithoutReportingInPeriod(),
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
      toUpper(value) {
        if (value !== "" && value !== undefined && value !== undefined)
          return value.toUpperCase();
      }
    }
  };
</script>
<style lang="scss" scoped>
  #qtdHours {
    width: 100%;
    border-radius: 0cm;
  }
  #select{
    width: 100%;
    border-radius: 0px;
  }
</style>
