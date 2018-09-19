<template>
  <div>
    <b-button variant="success" class="add-button" @click="showModal">Adicionar</b-button>
    <b-modal ref="modal" centered title="Adicionar Reportagem" ok-title="Adicionar"
             cancel-title="Cancelar" @ok="save">
      <p><b>PERÍODO :</b> <span v-if="period">{{period.description | toUpper}}</span></p>
      <b-form-select id="select" v-model="costCenter" class="mb-3" required>
        <option v-for="cc in costCenters" :value="cc">{{cc.description | toUpper}}</option>
      </b-form-select>

      <b-form-group label="Tipo de reportagem">
        <b-form-radio-group v-model="isPerDiscipline"
                            :options="options"
                            name="radios">
        </b-form-radio-group>
      </b-form-group>

      <span v-show="isPerDiscipline">
        <b-card-group deck style="padding-top: 10px !important;">
          <b-card
            header="Disciplinas"
            header-tag="header">
            <b-row>
              <b-col cols="3"><label>REQ</label></b-col>
              <b-col cols="9">
                <b-form-input class="input-card"
                  type="number"
                  v-model="req"
                  :min="0">
                </b-form-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="3"><label>A&P</label></b-col>
              <b-col cols="9">
                <b-form-input class="input-card"
                  type="number"
                  v-model="aep"
                  :min="0">
                </b-form-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="3"><label>IMPLE</label></b-col>
              <b-col cols="9">
                <b-form-input class="input-card"
                  type="number"
                  v-model="imple"
                  :min="0">
                </b-form-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="3"><label>TST</label></b-col>
              <b-col cols="9">
                <b-form-input class="input-card"
                  type="number"
                  v-model="tst"
                  :min="0">
                </b-form-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="3"><label>P&G</label></b-col>
              <b-col cols="9">
                <b-form-input class="input-card"
                  type="number"
                  v-model="peg"
                  :min="0">
                </b-form-input>
              </b-col>
            </b-row>
          </b-card>
        </b-card-group>
      </span>
      <span v-show="!isPerDiscipline">
          <b-form-input class="input-card"
            type="number"
            v-model="totalHoursCostCenter"
            :min="0"
            placeholder="Insira a quantidade de horas trabalhadas"
            style="margin-top: 10px !important;">
          </b-form-input>
        </span>
    </b-modal>
  </div>
</template>

<script>
  /* eslint-disable */
  export default {
    props: {
      period: {
        required: true,
      }
    },
    data() {
      return {
        isPerDiscipline: false,

        req: 0,
        aep: 0,
        imple: 0,
        tst: 0,
        peg: 0,

        reporting: null,
        costCenter: null,
        costCenters: [],
        totalHoursCostCenter: 0,

        options : [
          { text: 'Disciplina', value: true },
          { text: 'Total de Horas', value: false },
        ]
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
      findUserCostCenterByUserIdWithoutReportingInPeriod() {
        this.$http()
          .get("reporting/findUserCostCenterByUserIdWithoutReportingInPeriod", {params: {user_id: this.$store.getters["auth/user"].ID}})
          .then((response, err) => {
            if (err) console.log("err >", err);
            console.log('response.data.data > ', response.data.data);
            this.costCenters = response.data.data;
          });
      },
      save(event) {
        if (this.isPerDiscipline) {
          this.totalHoursCostCenter = parseInt(this.req) + parseInt(this.aep) + parseInt(this.imple) + parseInt(this.tst) + parseInt(this.peg);
        }
        this.$http()
          .post("reporting", {
            params: {
              user_id: this.user.ID,
              period: this.period,
              costCenter: this.costCenter,
              isPerDiscipline: this.isPerDiscipline,
              discipline: {
                req: this.req,
                aep: this.aep,
                imple: this.imple,
                tst: this.tst,
                peg: this.peg,
              },
              totalHoursCostCenter: this.totalHoursCostCenter
            }
          })
          .then(
            () => {
              this.$swal(
                "Adicionado",
                "Reportagem adicionada.",
                "success",
                this.req = 0,
                this.aep = 0,
                this.imple = 0,
                this.tst = 0,
                this.peg = 0,
                this.costCenter = null,
                this.totalHoursCostCenter = 0,
                this.findUserCostCenterByUserIdWithoutReportingInPeriod(),
                this.$emit("refresh"),
              );
            },
            () => {
              this.$swal(
                "Erro",
                "Erro ao inserir reportagem.",
                "error",
                this.req = 0,
                this.aep = 0,
                this.imple = 0,
                this.tst = 0,
                this.peg = 0,
                this.costCenter = null,
                this.totalHoursCostCenter = 0,
                this.$emit("refresh")
              );
            }
          );
      },
      showModal() {
        this.findUserCostCenterByUserIdWithoutReportingInPeriod();
        this.$refs.modal.show();
      },
    }, filters: {
      toUpper(value) {
        if (value !== "" && value !== undefined && value !== undefined)
          return value.toUpperCase();
      }
    }, watch: {
      isPerDiscipline : function (newValue, oldValue) {
        if (newValue) {
          this.isPerDiscipline = true;
        } else {
          this.isPerDiscipline = false;
          this.req = 0;
          this.aep = 0;
          this.imple = 0;
          this.tst = 0;
          this.peg = 0;
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  #qtdHours {
    width: 100%;
    border-radius: 0cm;
  }

  #select {
    width: 100%;
    border-radius: 0px;
  }

  label{
    float: left;
  }

  .input-card {
    width: 100% !important;
    border-radius: 5px !important;
  }
</style>
