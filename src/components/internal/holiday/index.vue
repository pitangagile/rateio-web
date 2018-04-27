<template>
  <b-col cols="12">
    <b-row class="page">
        <b-col cols="12">
          <h1 class="page--title"><span class="icon-calendar-check-o h4"></span> Feriados</h1>
        </b-col>
        <b-col cols="6">
          <b-form>
            <div class="panel panel-default">
              <div class="panel-body">
                <b-form-group id="dateHoliday"
                              label="Ano:"
                              label-for="year_holiday"
                              label-class="col-md-6 control-label pt-2"
                              class="row">
                <b-form-select id="year_holiday"
                              :options="years"
                              v-model="form.year"
                              required />
                </b-form-group>
              </div>
              <div class="panel-footer" style="background-color: #efefef;">
                <b-button variant="secondary" @click.prevent="add()">Incluir</b-button>
                <span class="separator"></span>
                <b-button variant="primary" @click.prevent="doSearch()">Pesquisar</b-button>
              </div>
            </div>
          </b-form>
        </b-col>
    </b-row>

    <b-row>
      <b-col cols="1"></b-col>
      <b-col cols="4" class="col-md-offset-1">
        <b-card no-body header="Janeiro">
          <b-list-group flush>
            <b-list-group-item class="flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">01 <i>Segunda-feira</i></h5>
                <h5>Nacional</h5>
              </div>
              <p class="mb-1">
                Confraternização universal
              </p>
              <span><b>Não haverá expediente</b></span>
            </b-list-group-item>
          </b-list-group>
        </b-card>
        <b-card no-body header="Fevereiro">
          <b-list-group flush>
            <b-list-group-item class="flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">12 <i>Segunda-feira</i></h5>
                <h5>Não é feriado</h5>
              </div>
              <p class="mb-1">
                <b>Descrição</b>: Carnaval
              </p>
              <span><b>Expediente</b>: Abono</span>
            </b-list-group-item>
            <b-list-group-item class="flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">13 <i>Terça-feira</i></h5>
                <h5>Não é feriado</h5>
              </div>
              <p class="mb-1">
                <b>Descrição</b>: Carnaval
              </p>
              <span><b>Expediente</b>: Abono</span>
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>


export default {
  name: 'Holiday',
  data() {
    return {
      form: {
        year: new Date().getFullYear(),
      },
      years: ['2018', '2017', '2016'],
      holidays: [
        { id: '0', day: '01', month: 'Janeiro', dayOfWeek: 'Segunda-feira', classification: 'Nacional', description: 'Confraternização Universal', descriptionDayWork: 'Não haverá expediente' },
        { id: '1', day: '12', month: 'Fevereiro', dayOfWeek: 'Segunda-feira', classification: 'Não é feriado', description: 'Carnaval', descriptionDayWork: 'Abono' },
      ],
    };
  },
  methods: {
    doSearch() {

    },
    add() {

    },
  },
};
</script>

<style>
.panel {
  margin-bottom: 10px;
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid transparent;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-left-color: transparent;
  border-radius: 4px;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
  box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
}

.panel-default {
    border-color: #ddd;
}

.panel-body {
  padding: 15px;
}

.panel-footer {
  padding: 10px 15px;
  text-align: center;
}

.control-label {
  text-align: right;
  font-weight: bold;
}

.separator::after{
  content: " ";
  display: inline-block;
  background: black;
  margin: 0 10px;
  height: 23px;
  vertical-align: middle;
  width: 1px;
}

</style>
