// @ts-check

const ConfigPlugin = {
  install(Vue, options) {
    Vue.mixin({
      created() {
        this.$i18n.locale = (navigator.language || navigator.userLanguage).split('-')[0]; // en-US or pt-BR
      },
    });

    Object.defineProperty(Vue.prototype, '$env', {
      get() {
        return options;
      },
    });
  },
};

export default ConfigPlugin;
