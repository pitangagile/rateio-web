<template>
  <b-col cols="12">
    <b-row class="page">
      <b-col cols="12">
        <h1 class="page--title"><span class="icon-calendar-check-o h4"></span> Feriados</h1>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols=12>
        <b-form>
          <b-form-group id="dateHoliday"
                        label="Ano:"
                        label-for="year_holiday"
                        label-class="sr-only pt-2"
                        class="row">
            <b-form-select id="year_holiday"
                           :options="years"
                           v-model="form.year"
                           required/>
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12" v-if="holidaysGroup != undefined && holidaysGroup.length > 0  ">
        <b-card no-body header="Feriado">
          <!-- <b-card no-body header="Janeiro"> -->
          <b-list-group flush v-for="holiday in holidaysGroup" :key="holiday.id">
            <b-list-group-item class="flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{{holiday.day}}/{{holiday.month}} <i>{{holiday.dayOfWeek}}</i></h5>
              </div>
              <h5>{{holiday.description}}</h5>
              <p class="mb-1">

              </p>
              <span><b>{{holiday.classification}} - {{holiday.daydescription}}</b></span>
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
  /* eslint-disable */
  export default {

    name: 'Holiday',
    data() {
      return {
        form: {
          year: new Date().getFullYear(),
        },
        years: [],
        holidaysGroup: [],
      };
    },
    mounted() {
      this.getInitialData();
    },
    methods: {
      getInitialData() {
        const url = 'holiday';

        this.$http().get(url).then((response) => {
          this.years = response.data.years;
          this.holidaysGroup = response.data.holidays;
        });
      },
      doSearch() {
        const url = 'holiday/search';

        this.$http().get(url, {year: this.form.year}).then((response) => {
            console.log('response'); // eslint-disable-line
            this.holidaysGroup = response.data;
          },
          (err) => {
            console.error('> sign-in.AllCenters() error!', err); // eslint-disable-line
          });
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

  .separator::after {
    content: " ";
    display: inline-block;
    background: black;
    margin: 0 10px;
    height: 23px;
    vertical-align: middle;
    width: 1px;
  }

</style>
