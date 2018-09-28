<template>
  <div>
    <b-button variant="warning" class="icon-edit icon-table" size="sm" @click="showModal"></b-button>
    <b-modal ref="modal" centered title="Editar Reportagem" ok-title="Confirmar"
             cancel-title="Cancelar" @ok="update()">
      <p v-if="reporting.period.description"><b>PERÍODO : </b>{{reporting.period.description | toUpper}}</p>
      <label v-if="reporting.costCenter.description"><b>CENTRO DE CUSTO
        : </b>{{reporting.costCenter.description}}</label>
      <br /><br />
      <b-form-group label="Tipo de reportagem" class="select-card">
        <b-form-radio-group v-model="reporting.isPerDiscipline"
                            :options="options"
                            name="radios">
        </b-form-radio-group>
      </b-form-group>

      <span v-show="reporting.isPerDiscipline">
        <b-card-group deck style="padding-top: 10px !important;">
          <b-card
            header="Disciplinas"
            header-tag="header">
            <b-row>
              <b-col cols="3"><label>REQ</label></b-col>
              <b-col cols="9">
                <b-form-input
                  type="number"
                  v-model="reporting.discipline.req"
                  :min="0">
                </b-form-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="3"><label>A&P</label></b-col>
              <b-col cols="9">
                <b-form-input
                  type="number"
                  v-model="reporting.discipline.aep"
                  :min="0">
                </b-form-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="3"><label>IMPLE</label></b-col>
              <b-col cols="9">
                <b-form-input
                  type="number"
                  v-model="reporting.discipline.imple"
                  :min="0">
                </b-form-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="3"><label>TST</label></b-col>
              <b-col cols="9">
                <b-form-input
                  type="number"
                  v-model="reporting.discipline.tst"
                  :min="0">
                </b-form-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="3"><label>P&G</label></b-col>
              <b-col cols="9">
                <b-form-input
                  type="number"
                  v-model="reporting.discipline.peg"
                  :min="0">
                </b-form-input>
              </b-col>
            </b-row>
          </b-card>
        </b-card-group>
      </span>
      <span v-show="!reporting.isPerDiscipline">
        <b-form-input
          type="number"
          v-model="reporting.totalHoursCostCenter"
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
      reporting: {
        required: true,
      },
    },
    data() {
      return {
        options: [
          {text: 'Disciplina', value: true},
          {text: 'Total de Horas', value: false},
        ]
      };
    },
    methods: {
      showModal() {
        this.$refs.modal.show();
      },
      update() {
        if (this.reporting.isPerDiscipline) {
          this.reporting.totalHoursCostCenter =
            parseInt(this.reporting.discipline.req) +
            parseInt(this.reporting.discipline.aep) +
            parseInt(this.reporting.discipline.imple) +
            parseInt(this.reporting.discipline.tst) +
            parseInt(this.reporting.discipline.peg);
        }else{
          this.reporting.discipline.req = 0;
          this.reporting.discipline.aep = 0;
          this.reporting.discipline.imple = 0;
          this.reporting.discipline.tst = 0;
          this.reporting.discipline.peg = 0;
        }
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
        if (value !== null && value !== undefined) {
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

  #qtdHours {
    width: 100%;
    border-radius: 0cm;
  }

  .select-card {
    width: 100%;
    text-align: left;
  }

</style>
