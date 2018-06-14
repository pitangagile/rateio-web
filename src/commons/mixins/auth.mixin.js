const AuthMixin = {
  methods: {
    logout(redirect = true) {
      this.$store.dispatch('auth/setUser', undefined);
      this.$store.dispatch('auth/setToken', undefined);
      if (redirect) {
        this.$router.push({ name: 'signin' });
      }
    },
    requestCredentials() {
      this.$showAlert({
        body: 'Você precisa informar suas credeciais.',
        type: 'warning',
        config: { position: 'centerTop' },
      });
      this.logout();
    },
    tryRefreshToken() {
      try {
        const url = 'refreshToken';
        const tokenMetadata = this.$store.getters['auth/metadata'];
        if (!tokenMetadata && !tokenMetadata.token) {
          this.requestCredentials();
        } else {
          this.$http().post(url, {
            token: tokenMetadata.token,
          }).then((response) => {
            this.$store.dispatch('auth/setToken', response.data);
          }, () => {
            this.requestCredentials();
          });
        }
      } catch (e) {
        this.requestCredentials();
      }
    },
  },
};

export default AuthMixin;
