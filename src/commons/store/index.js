import Vue from 'vue';
import Vuex from 'vuex';

// #region modules
import NotificationModule from './modules/notification.store';
import AuthModule from './modules/auth.store';
// #endregion modules

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    notification: NotificationModule,
    auth: AuthModule,
  },
});
