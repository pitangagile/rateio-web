/* eslint-disable no-param-reassign */
const NotificationModule = {
  namespaced: true,
  state: {
    notification: undefined,
  },
  mutations: {
    notify(state, newNotification) {
      state.notification = newNotification;
    },
  },
  actions: {
    async notify(context, newNotification) {
      context.commit('notify', newNotification);
    },
  },
  getters: {
    notification(state) { return state.notification; },
  },
};

export default NotificationModule;
