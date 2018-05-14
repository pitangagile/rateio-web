<template>
  <b-row class="page">
    <b-col cols="12">
      <h1 class="page--title"><span class="icon-cog h4"></span> Server Table</h1>
    </b-col>

    <b-col cols="12">
      <v-server-table class="grid mt-5 mb-2" url="http://localhost:3000/api/examples/table/fetch" :columns="columns" :options="options">
        <div slot="picture" slot-scope="props">
          <img :src="props.row.picture.thumbnail" class="user-picture">
        </div>

        <div slot="name" slot-scope="props">
          <div class="user-info">
            <small class="text-muted">{{props.row.name.title}}</small>
            <strong>{{props.row.name.first}} {{props.row.name.last}}</strong>
          </div>
        </div>
      </v-server-table>
    </b-col>
  </b-row>
</template>

<script>
import Vue from 'vue';
import { ServerTable } from 'vue-tables-2';
import options from './../../../commons/helpers/grid.config';

Vue.use(ServerTable, options, false, 'bootstrap4', 'default');

export default {
  name: 'ServerTable',
  showLoading: true,
  data() {
    const self = this;
    return {
      columns: ['picture', 'name', 'gender', 'cell'],
      options: {
        requestFunction(data) {
          return self.$http().get('examples/table/fetch', { params: data })
            .catch((e) => {
              this.dispatch('error', e);
            });
        },
        responseAdapter(response) {
          return { data: response.data.data, count: response.data.count };
        },
        headings: {
          picture: '#',
          name: 'Nome',
          gender: 'Gênero',
          cell: 'Celular',
        },
        sortable: ['name', 'gender'],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/variables.scss';

.grid {
  .user-picture {
    border-radius: 10cm;
    border: 1px solid $color-gray-1;
    max-width: 35px;
    padding: 3px;
  }
  .user-info {
    text-transform: capitalize;
  }
}
</style>
