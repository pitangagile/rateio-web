<template>
  <b-row class="page">
      <b-col cols="12">
        <h1 class="page--title"><span class="icon-calendar-check-o h4"></span> Feriados</h1>
      </b-col>
      <b-col cols="12">
        <b-form>
          <div class="panel panel-default">
            <div class="panel-body">
              <b-form-group id="dateHoliday"
                            label="Ano:"
                            label-for="year_holiday"
                            label-class="col-md-1 control-label"
                            class="row">
              <b-form-select id="year_holiday"
                            :options="years"
                            v-model="form.year"
                            required />
              </b-form-group>
            </div>
          </div>

          <div class="panel-footer">
            <b-button variant="secondary" @click.prevent="add()">Incluir</b-button>
            <b-button variant="primary" @click.prevent="doSearch()">Pesquisar</b-button>
          </div>

        </b-form>
      </b-col>
  </b-row>
</template>

<script>


export default {
  name: 'Holiday',
  data() {
    return {
      form: {
        year: new Date().getFullYear(),
      },
      years: ['2017', '2018'],
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
</style>
