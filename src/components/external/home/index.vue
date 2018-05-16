<i18n>
{
  "en": {
    "subtitle": "Welcome to {0}, collaborator's time allocation system",
    "enter": "Enter"
  },
  "pt": {
    "subtitle": "Bem vindo ao {0}, sistema de rateio de horas do colaborador",
    "enter": "Entrar"
  }
}
</i18n>

<template>
  <b-row class="page">
    <b-col cols="12" class="text-center">
      <div class="page--title-container">
        <img src="../../../../static/img/pitanga-branca.png" class="logoPitang">
        <h1 class="page--title">
          {{$env.app.name}}
        </h1>
      </div>
      <i18n path="subtitle" tag="h3" class="page--subtitle">
        {{$env.app.name}}
      </i18n>
      <br>
      <router-link to="/external/signin" class="btn btn-default btn-rounded">{{$t('enter')}}</router-link>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'Home',
  showLoading: true,
};
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/variables.scss';

.page {
  margin-top: 30vh;

  .page--title-container {
    h1 {
      display: inline-block;
    }

    img {
      margin-right: 15px;
      vertical-align: unset;
    }
  }

  .page--title{
    color: $color-light;
    font-size: 3rem;
    font-weight: $font-regular;
  }

  .page--subtitle{
    color: $color-light;
    font-size: 1.2rem;
    font-weight: $font-light;
  }

  .btn {
    margin-top: 3rem;
    background-color: $color-maturity;
    color: $color-light;
    pointer-events: all;
  }

  .logoPitang {
    width:50px;
  }
}

@media (min-width: 576px) {
  .page--title-container {
    // width: 11rem;
  }
}

@media (min-width: 768px) {
  .page {
    margin-top: 35vh;

    .page--title{
      font-size: 4rem;
      font-weight: $font-light;
    }

    .page--subtitle{
      font-size: 1.4rem;
    }
  }
}

@media (min-width: 992px) {

}

@media (min-width: 1200px) {

}
</style>
