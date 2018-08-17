/* eslint-disable */
import variables from '../../helpers/variables';

const AuthModule = {
  namespaced: true,
  state: {
  },
  mutations: {
    setUser(state, newUser) {
      if (newUser) {
        console.log('newUser > ', newUser);
        const userDTO = {
          ID: newUser._id,
          DisplayName: newUser.name,
          Email: newUser.email,
          PictureUrl: newUser.picture,
          hours : newUser.workHours,
          registration: newUser.registration,
          workHours: newUser.workHours,
          isPj: newUser.isPj
        };
        if (userDTO.PictureUrl) {
          userDTO.PictureUrl = userDTO.PictureUrl.substring(0, userDTO.PictureUrl.indexOf('?'));
        }
        localStorage.setItem(variables.auth.userdetais, JSON.stringify(userDTO));
      } else {
        localStorage.removeItem(variables.auth.userdetais);
      }
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
    user() {
      try {
        return JSON.parse(localStorage.getItem(variables.auth.userdetais));
      } catch (e) {
        return undefined;
      }
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
