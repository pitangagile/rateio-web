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
      <!--<router-link to="/external/signin" class="btn btn-default btn-rounded">{{$t('enter')}}</router-link>-->
      <!--<b-button @click="social('google')" variant="link" class="btn-google btn-circle">-->
      <b-button @click="social()" variant="link" class="btn-google btn-circle">
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
      /*this.socialLoginInit();
      this.logout(false);*/
    },
    methods: {
      /*socialLoginInit() {
        hello.init(
          {google: variables.social.google.clientId},
          {redirect_uri: variables.social.google.redirectUri},
        );
      },*/
      social() {
        /*await gapi.load('client', {
          callback: function () {
            console.log('info >', 'client initialized with success!');
          },
          onerror: function () {
            alert('gapi.client failed to load!');
          },
          timeout: 5000, // 5 seconds.
          ontimeout: function () {
            // Handle timeout.
            alert('gapi.client could not load in a timely manner!');
          }
        });*/
        gapi.auth2.init({
          clientId: '432671285072-bh09ij6l9s3hub9l2vi3tha71rpeoobl.apps.googleusercontent.com'
        }).then(
          callback => {
            console.log('oauth2 inicializado com sucesso');
          },
          onerror => {
            console.log('erro ao inicializar oauth2');
          },
          ontimeout => {
            console.log('timeout em outh2');
          }
        );

        gapi.client.init({
          apiKey: 'AIzaSyAW21tlYY92HlX9SqfgC043SE1A53POdnM',
          clientId: '432671285072-bh09ij6l9s3hub9l2vi3tha71rpeoobl.apps.googleusercontent.com',
          scope: 'profile'
        }).then(
          callback => {
            console.log('client inicializado com sucesso');
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
            updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          }, onerror => {
            console.log('client com error');
          }, ontimeout => {
            console.log('client com timeout');
          }
        );
        //
        // await gapi.client.request({
        //   path: 'https://people.googleapis.com/v1/people/me/',
        //   params: {
        //     'personFields': 'names'
        //   }
        // }).then(function (response) {
        //   console.log('response > ', response);
        // }, function (reason) {
        //   console.log('reason > ' + reason.result.error.message);
        // });
      },
    }
    /*
    var user = gapi.auth2.getAuthInstance().currentUser.get();
    var oauthToken = user.getAuthResponse().access_token;
    var xhr = new XMLHttpRequest();
    xhr.open('GET',
      'https://people.googleapis.com/v1/people/me');
    xhr.setRequestHeader('Authorization',
      'Bearer ' + oauthToken);
    xhr.send();*/
  };
  gapi.load('client', this.social);
  gapi.load('auth2', this.social);
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
