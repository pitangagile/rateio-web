// @ts-check

const ConfigPlugin = {
  install(Vue, options) {
    Object.defineProperty(Vue.prototype, '$env', {
      get() {
        return options;
      },
    });
  },
};

export default ConfigPlugin;
