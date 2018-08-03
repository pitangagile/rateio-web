<template>
  <div>
    <b-row nam="title" class="page">
      <b-col cols="12">
        <h1 class="page--title">Configurações do colaborador</h1>
      </b-col>
    </b-row>
    <b-row nam="basic_information">
      <b-col cols="12">
        <BasicUserInformation v-bind:user="user"></BasicUserInformation>
      </b-col>
    </b-row>
    <b-row name="coast_centers">
      <b-col cols="12">
        <CoastCenters></CoastCenters>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  /* eslint-disable */
  // import {ClientTable} from 'vue-tables-2';
  import Vue from 'vue';
  // import Multiselect from 'vue-multiselect';
  // import options from './../../../commons/helpers/grid.config';
  import remove from './removeCenterUser';
  import BasicUserInformation from './basicUserInformation';
  import CoastCenters from './coastCenters';

  // Vue.use(ClientTable, options, false, 'bootstrap4', 'default');
  // Vue.component('multiselect', Multiselect);

  export default {
    components: {
      remove,
      BasicUserInformation,
      CoastCenters,
    },
    name: 'Settings',
    showLoading: true,
    computed: {
      user() {
        return this.$store.getters['auth/user'];
      },
    },
    // data() {
    //   return {
    //     // hoursOfWork: 8,
    //     allCoastCenters: [],
    //     tableUserCoastCenters: [],
    //     columns: ['code', 'description', 'actions'],
    //     center: null,
    //     options: {
    //       sortable: ['code'],
    //       filterable: ['code', 'description'],
    //       columnsClasses: {
    //         actions: 'action-column text-center',
    //       },
    //     },
    //   };
    // },
    // mounted() {
    //   this.AllCenters();
    // },
    // methods: {
    //   AllCenters() {
    //     const url = 'coastcenter';
    //
    //     this.$http().get(url).then((response) => {
    //       console.log('response > ', response);
    //       this.allCoastCenters = response.data;
    //     });
    //   },
    //   addCenter() {
    //     if (this.center === undefined || this.center === null) {
    //       this.$snotify.info('Centro nulo');
    //     } else {
    //       const centerToAdd = {
    //         code: this.center.code,
    //         description: this.center.description,
    //       };
    //       if (this.checkingList(centerToAdd.code)) {
    //         this.$snotify.info('Centro ja adicionado');
    //       } else {
    //         this.tableUserCoastCenters.push(centerToAdd);
    //       }
    //     }
    //   },
    //   checkingList(code) {
    //     for (let i = 0; i < this.tableUserCoastCenters.length; i += 1) {
    //       if (this.tableUserCoastCenters[i].code === code) {
    //         return true;
    //       }
    //     }
    //     return false;
    //   },
    //   codeWithDescription({code, description}) {
    //     return `${code} — ${description}`;
    //   },
    // },
  };
</script>

<style lang="scss" scoped>
  .page--title {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .add-button {
    float: left;
    margin-left: 15px;
  }

  /deep/ td.action-column {
    width: 200px;
  }

  .multiselect--active {
    z-index: 100;
  }

  .control-label {
    float: left;
    width: 155px;
    top: 7px;
    padding-left: 0px;
    padding-right: 0px;
  }

  .form-control {
    width: 60px;
    padding-bottom: 4px;
    padding-top: 4px;
  }

  .coastcenter {
    width: 550px;
  }

</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
