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
      <span slot="h__Edit"></span>
      <div slot="Edit" slot-scope="props" class="btn-toolbar">
        <remove v-bind:table="tableUserCenter" :row="props.index">Remover</remove>
      </div>

    </v-client-table>
  </b-col>

    <b-col cols="5">
      <div>
      <v-select id="centerList" label="description" v-model="center" :options="tableCenter"></v-select>
        <button v-on:click="addCenter(tableCenter.id)">Adicionar</button>
      </div>
    </b-col>

  </b-row>
</template>

<script>
import { ClientTable } from 'vue-tables-2';
import Vue from 'vue';
import vSelect from 'vue-select';
import options from './../../../commons/helpers/grid.config';
import remove from './removeCenterUser';

Vue.use(ClientTable, options, false, 'bootstrap4', 'default');
Vue.component('v-select', vSelect);

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
      columns: ['code', 'description', 'Edit'],
      tableUserCenter: [],
      center: null,
      options: {
        sortable: ['code'],
        filterable: ['code', 'description'],
      },
    };
  },
  mounted() {
    this.AllCenters();
  },
  methods: {
    AllCenters() {
      const url = 'getCoastCenters';

      this.$NProgress().start();

      this.$http().get(url).then((response) => {
        this.tableCenter = response.data;
        this.$NProgress().done();
      });
    },
    addCenter() {
      const center = {
        code: this.center.code,
        description: this.center.description,
      };
      this.tableUserCenter.push(center);
    },
  },
};
</script>

<style lang="scss" scoped>
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

</style>
