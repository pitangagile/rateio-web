<template>
  <b-row class="page">
    <b-col cols="12">
      <h1 class="page--title"><span class="icon-cog h4"></span> Configurações do colaborador</h1>
    </b-col>

    <b-col cols="12">
      <div class="card active-bg text-white">
        <div class="body profile-header">
          <img :src="user.PictureUrl" class="user_pic rounded img-raised" alt="User">
          <div class="detail">
            <div class="u_name">
              <h4><strong>{{user.FirstName}}</strong> {{user.LastName}}</h4>
            </div>
            <div class="user_information">
              <form class="form-horizontal" role="form">
                <div class="form-group">
                  <label for="txtWorkedHours" class="control-label col-sm-3">Horas de trabalho por dia:</label>
                  <div class="col-sm-1">
                    <input id="txtWorkedHours" type="number" v-model="hoursOfWork" class="form-control">
                  </div>
                </div>
                <div class="form-group">
                  <div class="checkbox">
                    <label>
                      <input type="checkbox">
                      <span class="text"> Colaborador PJ</span>
                    </label>
                  </div>
                </div>
              </form>
              <div class="form-group">
              </div>
            </div>

          </div>
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
        <div slot="afterFilter" class="add-button">
          <b-button v-on:click="addCenter()">Adicionar</b-button>
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
      hoursOfWork: 8,
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
    // this.AllCenters(); // eslint-disable-line
  },
  methods: {
    AllCenters() {
      const url = 'coastcenter/getAll';

      this.$http().get(url).then((response) => {
        this.tableCenter = response.data;
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

.card {
  background: #fff;
  margin-bottom: 30px;
  transition: .5s;
  border: 0;
  border-radius: .55rem;
  position: relative;
  width: 100%;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.1);
  margin-top: 20px;
}

.card .body {
  font-size: 14px;
  color: #424242;
  padding: 20px;
  font-weight: 400;
  height: 225px;
}

.profile-header .user_pic {
  position: absolute;
  bottom: -13px;
  z-index: 99;
}

.img-raised {
  box-shadow: 0px 10px 25px 0px rgba(0,0,0,0.3);
}

img {
  max-width: 100%;
  border-radius: 1px;
  width: 250px;
}

.profile-header .detail {
  margin-left: 250px;
}

.profile-header .detail .u_name {
  margin-left: 20px;
}

.profile-header .detail .user_information {
  margin-left: 20px;
}

h4 {
  font-size: 1.714em;
  line-height: 1.45em;
  margin-bottom: 15px;
}

.add-button {
  float: left;
  margin-left: 15px;
}

/deep/ strong {
  font-weight: bolder;
  font-size: inherit;
}

/deep/ td.action-column {
  width: 200px;
}

</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
