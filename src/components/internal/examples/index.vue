<template>
  <b-row class="page">
    <b-col cols="12">
      <h1 class="page--title"><span class="icon-cog h4"></span> Exemplos</h1>
    </b-col>

    <b-col cols="12">
      <v-client-table ref="grid" class="mt-5 mb-2" :data="MOCK_users" :columns="columns" :options="options">
        <span slot="h__code">Codigo</span>
        <span slot="h__description">Centro de custo</span>
        <span slot="h__actions"></span>

        <div slot="picture" slot-scope="props">
          <img :src="props.row.picture" class="user-picture">
        </div>

        <div slot="fullname" slot-scope="props">
          <div class="user-info">
            <strong>{{props.row.fullname}}</strong>
            <br>
            <small class="text-muted">{{props.row.career}}</small>
          </div>
        </div>

        <div slot="progress" slot-scope="props">
          <b-progress :value="props.row.progress * 100" :max="100" show-progress :class="getVariant(props.row.status)"
                      class="user-progress"></b-progress>
        </div>

        <div slot="status" slot-scope="props">
          <small :class="getVariant(props.row.status)" class="user-status">{{props.row.status}}</small>
        </div>

        <div slot="action" slot-scope="props">
          <b-button class="icon-edit" size="lg" variant="link"></b-button>
        </div>

        <div slot="afterFilter" class="column-coast-center">
          <multiselect
            class="select-coast-center"
            label="description"
            :custom-label="codeWithDescription"
            v-model="center"
            :options="tableCenter"
            track-by="code"
            :searchable="true"
            placeholder="Selecione o Centro de Custo"
            selectLabel=""
            value="">
          </multiselect>
        </div>
      </v-client-table>
    </b-col>
  </b-row>
</template>

<script>
  /* eslint-disable */
  import 'vue-multiselect/dist/vue-multiselect.min.css';
  import {ClientTable} from 'vue-tables-2';
  import Vue from 'vue';
  import Multiselect from 'vue-multiselect';
  import options from './../../../commons/helpers/grid.config';

  Vue.use(ClientTable, options, false, 'bootstrap4', 'default');
  Vue.component('multiselect', Multiselect);

  export default {
    name: 'Settings',
    showLoading: true,
    computed: {
      user() {
        return this.$store.getters['auth/user'];
      },
    },
    data() {
      return {
        allCoastCenters: [],
        columns: ['picture', 'fullname', 'progress', 'status', 'action'],
        tableUserCoastCenters: [],
        center: null,
        options: {
          sortable: ['status', 'fullname', 'progress'],
          filterable: ['status', 'fullname'],
          headings: {
            picture: '#',
            fullname: 'Colaborador',
            progress: 'Progresso',
            status: 'Status',
            actions: 'Ações',
          },
          columnsClasses: {
            actions: 'action-column text-center',
          },
        },
        MOCK_users: [
          {
            picture: '/static/img/avatars/1.jpg',
            fullname: 'Jacqueline Sanders',
            career: 'Desenvolvedor',
            progress: 1,
            status: 'approved'
          },
          {
            picture: '/static/img/avatars/2.jpg',
            fullname: 'Brittany Bates',
            career: 'Testador',
            progress: 0.8,
            status: 'suspended'
          },
          {
            picture: '/static/img/avatars/3.jpg',
            fullname: 'Tamara Steward',
            career: 'Analista',
            progress: 0.9,
            status: 'blocked'
          },
          {
            picture: '/static/img/avatars/4.jpg',
            fullname: 'Arthur Rose',
            career: 'Testador',
            progress: 0.5,
            status: 'pending'
          },
          {
            picture: '/static/img/avatars/5.jpg',
            fullname: 'Yolanda Craig',
            career: 'Analista',
            progress: 1,
            status: 'approved'
          },
          {
            picture: '/static/img/avatars/6.jpg',
            fullname: 'Alvin Ward',
            career: 'Desenvolvedor',
            progress: 1,
            status: 'pending'
          },
          {
            picture: '/static/img/avatars/7.jpg',
            fullname: 'Meghan Garcia',
            career: 'Analista',
            progress: 0.7,
            status: 'suspended'
          },
          {
            picture: '/static/img/avatars/8.jpg',
            fullname: 'Terry Jordan',
            career: 'Desenvolvedor',
            progress: 1,
            status: 'approved'
          },
          {
            picture: '/static/img/avatars/9.jpg',
            fullname: 'Holly Schmidt',
            career: 'Testador',
            progress: 0.3,
            status: 'pending'
          },
          {
            picture: '/static/img/avatars/10.jpg',
            fullname: 'Clifton Burton',
            career: 'Desenvolvedor',
            progress: 0.63,
            status: 'pending'
          },
          {
            picture: '/static/img/avatars/11.jpg',
            fullname: 'John Douglas',
            career: 'Desenvolvedor',
            progress: 0.75,
            status: 'pending'
          },
          {
            picture: '/static/img/avatars/12.jpg',
            fullname: 'Tracey Diaz',
            career: 'Desenvolvedor',
            progress: 0.7,
            status: 'pending'
          },
        ],
      };
    },
    mounted() {
      this.AllCenters();
    },
    methods: {
      AllCenters() {
        const url = 'coastcenter/getAll';

        this.$NProgress().start();

        this.$http().get(url).then((response) => {
          this.tableCenter = response.data;
          this.$NProgress().done();
        });
      },
      getVariant(status) {
        if (status === 'approved') return 'success';
        else if (status === 'pending') return 'info';
        else if (status === 'suspended') return 'warning';

        return 'danger';
      },
      addCenter() {
        if (this.center === undefined || this.center === null) {
          this.$snotify.info('Centro nulo');
        } else {
          const centerToAdd = {
            code: this.center.code,
            description: this.center.description,
          };
          if (this.checkingList(centerToAdd.code)) {
            this.$snotify.info('Centro ja adicionado');
          } else {
            this.tableUserCoastCenters.push(centerToAdd);
          }
        }
      },
      checkingList(code) {
        for (let i = 0; i < this.tableUserCoastCenters.length; i += 1) {
          if (this.tableUserCoastCenters[i].code === code) {
            return true;
          }
        }
        return false;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../../assets/styles/variables.scss';

  .page {

    /deep/ .VueTables__search {
      display: inline-block;
      .VueTables__search-field {
        float: left;
      }
    }

    .column-coast-center {
      float: left;
      margin-left: 15px;

      /deep/ .select-coast-center {
        .multiselect__tags {
          border-color: #ced4da;
          border-radius: 10cm;
          padding-top: 5px;
          min-height: 32px;
          font-size: .9rem;

          .multiselect__input {
            font-size: .9rem;
          }
        }

        .multiselect__select {
          height: 32px;
        }

        .multiselect__single {
          font-size: .9rem;
          margin: 0;
        }
      }
    }

    .user-picture {
      border-radius: 10cm;
      border: 1px solid $color-gray-1;
      max-width: 35px;
      padding: 3px;
    }

    .user-info {
      small {
        font-size: 11px;
      }
    }

    /deep/ .user-progress {
      &.success {
        .progress-bar {
          background-color: $color-success;
        }
      }
      &.danger {
        .progress-bar {
          background-color: $color-danger;
        }
      }
      &.warning {
        .progress-bar {
          background-color: $color-warning;
        }
      }
      &.info {
        .progress-bar {
          background-color: $color-info;
        }
      }
    }

    .user-status {
      border: 1px solid;
      border-radius: 1cm;
      padding: 5px 10px;
      text-transform: uppercase;

      &.success {
        border-color: $color-success;
        color: $color-success;
      }
      &.danger {
        border-color: $color-danger;
        color: $color-danger;
      }
      &.warning {
        border-color: $color-warning;
        color: $color-warning;
      }
      &.info {
        border-color: $color-info;
        color: $color-info;
      }
    }

    .icon-edit {
      color: $color-gray-5;
      text-decoration: none;
    }
  }
</style>
