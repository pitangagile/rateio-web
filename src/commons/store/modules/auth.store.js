/* eslint-disable no-param-reassign */
import variables from '../../helpers/variables';

const AuthModule = {
  namespaced: true,
  state: {
    user: {
      firstName: '',
      lastName: '',
      email: '',
    },
  },
  mutations: {
    setUser(state, newUser) {
      state.user = newUser;
    },
    setToken(state, newToken) {
      if (newToken) {
        const week = new Date();
        week.setDate(week.getDate() + (variables.auth.expires * 60));

        const data = {
          expires: week.getTime(),
          token: newToken,
        };

        localStorage.setItem(variables.auth.appToken, JSON.stringify(data));
      } else {
        localStorage.removeItem(variables.auth.appToken);
      }
    },
  },
  actions: {
    /**
     * Set logged user
     */
    async setUser(context, newUser) {
      context.commit('setUser', newUser);
    },
    /**
     * Set the authentication metadata
     * @returns {token: string, expires: number}
     */
    async setToken(context, newToken) {
      context.commit('setToken', newToken);
    },
  },
  getters: {
    /**
     * Get Logged user
     */
    user(state) {
      return state.user;
    },
    /**
     * Get the authentication metadata
     * @returns {token: string, expires: number}
     */
    metadata() {
      try {
        return JSON.parse(localStorage.getItem(variables.auth.appToken));
      } catch (e) {
        return undefined;
      }
    },
  },
};

export default AuthModule;
