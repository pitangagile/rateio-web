<template>
  <b-row class="page">
    <b-col cols="12" class="text-center">
      <h1 class="page--title">Welcome to Rateio App</h1>
      <h3 class="page--subtitle">The biggest, badass new time managing app has arrived, tell us your time now.</h3>
      <br>
      <router-link to="/external/signin" class="btn btn-default btn-rounded">Login</router-link>
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
</style>