// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable import/first */

// #region global styles
import 'nprogress/nprogress.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-snotify/styles/material.scss';
import './assets/icons/css/fontello.css';
import './assets/icons/css/animation.css';
import './assets/styles/app.scss';
// #endregion global styles

import Vue from 'vue';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';
import BootstrapVue from 'bootstrap-vue';
import Snotify from 'vue-snotify';
import ToggleButton from 'vue-js-toggle-button';

import App from './App'; // eslint-disable-line

import router from './commons/router';
import store from './commons/store';
import variables from './commons/helpers/variables';
import ConfigPlugin from './commons/plugins/config.plugin';
import NProgressPlugin from './commons/plugins/nprogress.plugin';
import AxiosPlugin from './commons/plugins/axios.plugin';

import AuthMixin from './commons/mixins/auth.mixin';

// #region Usings
Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(BootstrapVue);
Vue.use(Snotify);
Vue.use(ToggleButton);
Vue.use(NProgressPlugin, { showSpinner: true });
Vue.use(AxiosPlugin, variables); // axios plugin depends on the Progress Bar
Vue.use(ConfigPlugin, variables);

Vue.mixin(AuthMixin);
// #endregion Plugins

Vue.config.productionTip = variables.env.prodTip;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
});
