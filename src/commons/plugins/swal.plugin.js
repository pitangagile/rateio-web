// @ts-check
import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const SwalPlugin = {
  install(Vue) {
    Vue.prototype.$swal = swal; // eslint-disable-line no-param-reassign
  },
};

export default SwalPlugin;
