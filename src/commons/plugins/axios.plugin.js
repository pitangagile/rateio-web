// @ts-check
import axios from 'axios';

const AxiosPlugin = {
  install(Vue, options) {
    Vue.mixin({
      methods: {
        $http() {
          const authMetadata = this.$store.getters['auth/metadata'];
          const headers = authMetadata ? { Authorization: `Bearer ${authMetadata.token}` } : undefined;
          const updateProgress = (e) => {
            this.$NProgress().set((Math.floor(e.loaded * 1.0) / e.total));
          };

          const http = axios.create({
            baseURL: options.http.root,
            onDownloadProgress: updateProgress,
            onUploadProgress: updateProgress,
            headers,
          });
          return http;
        },
      },
    });
  },
};

export default AxiosPlugin;
