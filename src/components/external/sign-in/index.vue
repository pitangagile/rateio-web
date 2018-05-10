<template>
  <b-row class="page">
    <b-col cols="12" class="">
      <b-card title="Entrar"
          sub-title=""
          class="mb-2 text-center">

        <div class="social">
          <b-button variant="link" class="btn-facebook btn-circle">
            <span class="icon-facebook"></span>
          </b-button>
          <b-button @click="social('google')" variant="link" class="btn-google btn-circle">
            <span class="icon-google">Pitang</span>
          </b-button>
          <b-button variant="link" class="btn-twitter btn-circle">
            <span class="icon-twitter"></span>
          </b-button>
        </div>

        <div class="divider">
          <div class="line l"></div>
          <span>ou</span>
          <div class="line r"></div>
        </div>

        <form class="text-left">
          <div class="form-group">
            <input type="email" v-model="username" class="form-control" aria-describedby="emailHelp" placeholder="E-mail" autocomplete="email" :disabled="disabled">
          </div>
          <div class="form-group">
            <input type="password" v-model="password" class="form-control" placeholder="Senha" autocomplete="password" :disabled="disabled">
            <small>
              Esqueceu sua senha? <router-link to="/external/recover">Relembrar</router-link>.
            </small>
          </div>
        </form>

        <b-button variant="primary" class="btn-rounded btn-login btn-block" @click.prevent="regular()">Entrar</b-button>
        <router-link to="/" class="btn">Voltar</router-link>
        <!-- <br>
        <small>
          Don't have an account? <router-link to="/external/signup">Sign up</router-link>.
        </small> -->
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import * as hello from 'hellojs';
import variables from '../../../commons/helpers/variables';

export default {
  name: 'SignIn',
  showLoading: true,
  data() {
    return {
      disabled: false,
      username: '',
      password: '',
    };
  },
  created() {
    this.socialLoginInit();
    this.logout(false);
  },
  methods: {
    regular() {
      if (this.disabled) return;

      this.disabled = true;
      const url = 'regularLogin';
      const user = {
        username: this.username,
        password: this.password,
      };

      this.$NProgress().start();

      this.$http().post(url, user).then((response) => {
        this.$store.dispatch('auth/setUser', response.data.user);
        this.$store.dispatch('auth/setToken', response.data.token);
        this.$NProgress().done();
        this.$router.push({ name: 'dashboard' });
      }, (err) => {
        this.disabled = false;
        this.$NProgress().done();
        console.error('> sign-in.regular() error!', err); // eslint-disable-line
      });
    },
    socialLoginInit() {
      hello.init(
        { google: variables.social.google.clientId },
        { redirect_uri: variables.social.google.redirectUri },
      );
    },
    social(issuer) {
      if (this.disabled) return;

      this.$NProgress().start();
      hello(issuer).login({ scope: ['email'] }).then((auth) => {
        hello(auth.network).api('me').then((user) => {
          const url = 'auth/socialLogin';
          this.$http().post(url, {
            username: undefined,
            email: user.email,
            issuer,
            token: auth.authResponse.access_token,
          }).then((response) => {
            this.$store.dispatch('auth/setUser', user);
            this.$store.dispatch('auth/setToken', response.data);
            this.$NProgress().done();
            this.$router.push({ name: 'dashboard' });
          }, (err) => {
            this.$NProgress().done();
            console.log('> sign-in.social() error! (2)', err);  // eslint-disable-line
          });
        }, (err) => {
          this.$NProgress().done();
          console.log('> sign-in.social() error! (1)', err);  // eslint-disable-line
        });
      });
    },
  },
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
      .btn-google {
        background-color: $color-google;
        text-decoration: none;
        line-height: .7rem;
        span {
          padding-right: 5px;
        }
      }
      // .btn-facebook { background-color: $color-facebook; }
      // .btn-twitter { background-color: $color-twitter; }
      .btn-twitter,
      .btn-facebook {
        background-color: $color-gray-1;

        &:hover {
          cursor: not-allowed;
        }
      }
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
