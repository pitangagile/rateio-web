<template>
  <b-row class="page">
    <b-col cols="12">
      <h1 class="page--title"><span class="icon-cog h4"></span> Configurações do colaborador</h1>
    </b-col>

    <b-col cols="12">
      <div class="profile-container">
        <div class="profile-header">
          <b-col cols="2" class="text-center header-box">
            <img :src="user.PictureUrl" class="header-avatar">
          </b-col>

          <b-col cols="5" class="profile-info">
            <div class="header-fullname">{{user.DisplayName}}</div>
            <div class="header-information">
              Desenvolvedor
            </div>
          </b-col>
        </div>
      </div>
    </b-col>

    <b-col cols="12">
        <v-client-table ref="grid" class="mt-5 mb-2" :data="tableUserCenter" :columns="columns" :options="options">
        <span slot="h__code">Codigo</span>
        <span slot="h__description">Centro de custo</span>
        <span slot="h__actions"></span>
        <div slot="actions" slot-scope="props">
          <remove v-bind:table="tableUserCenter" :row="props.index">Remover</remove>
        </div>

      </v-client-table>
    </b-col>

    <b-col cols="6">
      <b-row>
        <b-col>
          <multiselect
          label="description"
          :custom-label="codeWithDescription"
          v-model="center"
          :options="tableCenter"
          track-by="code"
          :searchable="true"
          :show-labels="false"
          :allow-empty="false"
          placeholder="Selecione o Centro de Custo"
          selectLabel = ''
          value = ''
            >
          </multiselect></b-col>
        <b-col>
          <b-button v-on:click="addCenter()">Adicionar</b-button>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import { ClientTable } from 'vue-tables-2';
import Vue from 'vue';
import Multiselect from 'vue-multiselect';
import options from './../../../commons/helpers/grid.config';
import remove from './removeCenterUser';

Vue.use(ClientTable, options, false, 'bootstrap4', 'default');
Vue.component('multiselect', Multiselect);

export default {
  components: {
    remove,
  },
  name: 'Settings',
  showLoading: true,
  computed: {
    user() {
      return this.$store.getters['auth/user'];
    },
  },
  data() {
    return {
      tableCenter: [],
      columns: ['code', 'description', 'actions'],
      tableUserCenter: [],
      center: null,
      options: {
        sortable: ['code'],
        filterable: ['code', 'description'],
        columnsClasses: {
          actions: 'action-column text-center',
        },
      },
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
          this.tableUserCenter.push(centerToAdd);
        }
      }
    },
    checkingList(code) {
      for (let i = 0; i < this.tableUserCenter.length; i += 1) {
        if (this.tableUserCenter[i].code === code) {
          return true;
        }
      }
      return false;
    },
    codeWithDescription({ code, description }) {
      return `${code} — ${description}`;
    },
  },
};
</script>

<style lang="scss" scoped >
.profile-container {
  box-sizing: border-box;
}

.profile-header {
  min-height: 175px;
  margin: 15px 15px 0;
  -webkit-box-shadow: 0 1px 2px rgba(0,0,0,.35);
  -moz-box-shadow: 0 1px 2px rgba(0,0,0,.35);
  box-shadow: 0 1px 2px rgba(0,0,0,.35);
  background-color: #fbfbfb;
}

.header-box {
  float: left;
}

.header-avatar {
  width: 125px;
  height: 125px;
  -webkit-border-radius: 50%;
  -webkit-background-clip: padding-box;
  -moz-border-radius: 50%;
  -moz-background-clip: padding;
  border-radius: 50%;
  background-clip: padding-box;
  border: 5px solid #f5f5f5;
  -webkit-box-shadow: 0 0 10px rgba(0,0,0,.15);
  -moz-box-shadow: 0 0 10px rgba(0,0,0,.15);
  box-shadow: 0 0 10px rgba(0,0,0,.15);
  margin: 25px auto;
}

.profile-info {
  min-height: 175px;
  border-right: 1px solid #eee;
  padding: 15px 40px 35px 0;
}

.header-fullname {
  font-size: 21px;
  font-weight: bold;
  margin-top: 27px;
  display: inline-block;
}

.header-information {
  line-height: 23px;
  margin-top: 15px;
  text-align: justify;
}
/deep/ td.action-column {
  width: 200px;
}

</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
