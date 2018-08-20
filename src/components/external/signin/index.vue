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
      <b-button @click="social('google')" variant="link" class="btn-google btn-circle">
        <span class="icon-google">Pitang</span>
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
  /* eslint-disable */
  import Vue from 'vue'
  import * as hello from 'hellojs';
  import variables from '../../../commons/helpers/variables';

  export default {
    name: 'Signin',
    showLoading: true,
    data() {
      return {}
    },
    created() {
      this.socialLoginInit();
      this.logout(false);
    },
    methods: {
      socialLoginInit() {
        hello.init(
          {google: variables.social.google.clientId},
          {redirect_uri: variables.social.google.redirectUri},
        );
      },
      social(issuer) {
        if (this.disabled) {
          return;
        }

        this.$NProgress().start();
        hello(issuer).login({scope: 'email'}, {force: true}).then((auth) => {
          hello(auth.network).api('me').then((user) => {
            const url = 'auth/socialLogin';
            this.$http().post(url, {
              username: undefined,
              email: user.email,
              issuer,
              token: auth.authResponse.access_token,
            }).then((response) => {
              this.configureUser(user, response.data);
              this.$NProgress().done();
            }, (err) => {
              this.$NProgress().done();
              console.log('> sign-in.social() error! (2)', err);  // eslint-disable-line
            });
          },(err) => {
            this.$NProgress().done();
            console.log('> sign-in.social() error! (1)', err);  // eslint-disable-line
          });
        });
      },
      configureUser(user, token) {
        this.$http().get('employee/findEmployeeByEmail', {params: {email: user.email}}).then((user_db, err) => {
          if (err) {
            this.$snotify.warning('Colaborador não encontrado no sistema. Entre em contato com o suporte.');
          } else {
            user_db.data.picture = user.picture;
            this.$store.dispatch('auth/setUser', user_db.data);
            this.$store.dispatch('auth/setToken', token);
            this.$store.dispatch('auth/setRole', user_db.data.role);
            this.$router.push({name: 'settings'});
          }
        })
      }
    }
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

    .page--title {
      color: $color-light;
      font-size: 3rem;
      font-weight: $font-regular;
    }

    .page--subtitle {
      color: $color-light;
      font-size: 1.2rem;
      font-weight: $font-light;
    }

    .logoPitang {
      width: 50px;
    }

    .btn {
      margin-top: 3rem;
      background-color: $color-maturity;
      color: $color-light;
      pointer-events: all;
    }

    .btn-google {
      width: 150px;
      height: 50px;
      background-color: $color-google;
      text-decoration: none;
      line-height: .7rem;
      .icon-google {
        color: white;
      }
      span {
        padding-right: 5px;
      }
    }

    .btn-google:hover {
      background-color: white;
      border: 1px solid $color-google;
      .icon-google {
        color: $color-google
      }
    }

    .icon-google {
      font-size: 1rem;
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

      .page--title {
        font-size: 4rem;
        font-weight: $font-light;
      }

      .page--subtitle {
        font-size: 1.4rem;
      }
    }
  }

  @media (min-width: 992px) {

  }

  @media (min-width: 1200px) {

  }
</style>
