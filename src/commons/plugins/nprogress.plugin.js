// @ts-check
/* eslint-disable no-param-reassign */

import NProgress from 'nprogress';

const NProgressPlugin = {
  install(Vue, options) {
    Vue.prototype.$NProgress = (opt) => {
      if (opt) NProgress.configure(opt);
      else if (options) NProgress.configure(options);

      return NProgress;
    };

    Vue.mixin({
      created() {
        if (this.$options.showLoading) {
          this.$NProgress().start();
        }
      },
      mounted() {
        if (this.$options.showLoading) {
          this.$NProgress().done();
        }
      },
    });
  },
};

export default NProgressPlugin;
