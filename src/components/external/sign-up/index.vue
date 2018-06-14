<template>
  <b-row class="page">
    <b-col cols="12" class="">
      <b-card title="Register"
          sub-title=""
          class="mb-2 text-center">

        <div class="social">
          <b-button variant="link" class="btn-facebook btn-circle">
            <span class="icon-facebook"></span>
          </b-button>
          <b-button variant="link" class="btn-google btn-circle">
            <span class="icon-google"></span>
          </b-button>
          <b-button variant="link" class="btn-twitter btn-circle">
            <span class="icon-twitter"></span>
          </b-button>
        </div>

        <div class="divider">
          <div class="line l"></div>
          <span>or</span>
          <div class="line r"></div>
        </div>

        <form class="text-left">
          <div class="form-group">
            <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email" autocomplete="email">
          </div>
          <div class="form-group">
            <input type="password" class="form-control" placeholder="Password" autocomplete="password">
          </div>
          <div class="form-group">
            <input type="password" class="form-control" id="confirm" placeholder="Confirm Password" autocomplete="off">
            <small class="form-text text-muted">We'll never share your data with anyone else.</small>
          </div>
        </form>

        <b-button variant="primary" class="btn-rounded btn-block">Register</b-button>
        <router-link to="/" class="btn">Back</router-link>
        <br>
        <small>
          Already have an account? <router-link to="/external/signin">Log in</router-link>.
        </small>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'SignUp',
  showLoading: true,
};
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/variables.scss';

.page {
  .card {
    pointer-events: all;
    margin: 0 auto;
    margin-top: 20vh;
    max-width: 20rem;

    .social {
      margin-top: 20px;

      .btn span { color: $color-light; }
      .btn-google { background-color: $color-google; }
      .btn-facebook { background-color: $color-facebook; }
      .btn-twitter { background-color: $color-twitter; }
    }

    .divider {
      float: none;
      overflow: hidden;
      margin: 15px 0;
      position: relative;
      text-align: center;
      width: 100%;

      .line {
        border-top: 1px solid $color-gray-3;
        position: absolute;
        top: 10px;
        width: 40%;
        &.l { left: 0; }
        &.r { right: 0;}
      }
    }

    form {
      margin-bottom: 15px;
      .form-group {
        margin-bottom: 5px;
      }
    }
  }
}

@media (min-width: 768px) {
  .page {
    .card {
      margin-top: 25vh;
    }
  }
}
</style>
