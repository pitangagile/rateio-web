<template>
    <div>
        <b-button class="icon-edit" style="color: #3f3f40;" size="lg" variant="link" @click="showModal"></b-button>
        <!-- Modal Component -->
        <b-modal ref="editModal" centered title="Colaborador" ok-title="Ok" cancel-title="Sair">
            <b-col cols="12">
                <v-client-table class="table mt-5 mb-2" ref="grid" :data="myCenters" :columns="columns" :options="options">
                    <span slot="h__code">Codigo</span>
                    <span slot="h__description">Centro de custo</span>
                    <span slot="h__hours">Horas</span>
                    <span slot="h__actions"></span>
                    <div slot="actions" slot-scope="props" class="btn-toolbar">

                      <editHours v-bind:table="reportingsList" :row="props.row"></editHours>
                    </div>
                    <div slot="afterFilter" class="add-button">
                        <multiselect
                        class="select-period"
                        v-model="selected"
                        :options="coastcenters.map(data => data.description)"
                        :searchable="true"
                        placeholder="Centros de Custo">
                        </multiselect>
                    </div>
                    <div slot="afterFilter" class="add-button">
                      <b-button class="add-button" v-on:click="addCenter()">Adicionar</b-button>
                    </div>
                </v-client-table>
            </b-col>
        </b-modal>
    </div>
</template>

<script>
import { ClientTable } from 'vue-tables-2';
import Vue from 'vue';
import options from './../../../commons/helpers/grid.config';
import editHours from './editHours';

Vue.use(ClientTable, options, false, 'bootstrap4', 'default');

export default {
  components: {
    editHours,
  },
  props: {
  },
  data() {
    return {
      selected: null,
      hours: 0,
      columns: ['code', 'description', 'hours', 'actions'],
      periods: [],
      myCenters: [
        { code: '1.1.1.001', description: 'Centro de custo 1', hours: 10 },
        { code: '1.1.1.002', description: 'Centro de custo 2', hours: 10 },
      ],
      coastcenters: [
        { code: '1.1.1.003', description: 'Centro de custo 3', hours: 0 },
        { code: '1.1.1.004', description: 'Centro de custo 4', hours: 0 },
        { code: '1.1.1.005', description: 'Centro de custo 5', hours: 0 },
        { code: '1.1.1.006', description: 'Centro de custo 6', hours: 0 },
        { code: '1.1.1.007', description: 'Centro de custo 7', hours: 0 },
        { code: '1.1.1.008', description: 'Centro de custo 8', hours: 0 },
        { code: '1.1.1.009', description: 'Centro de custo 9', hours: 0 },
      ],
      options: {
        sortable: [],
        filterable: false,
      },
    };
  },
  methods: {
    addCenter() {
      this.myCenters.splice(0, 0, this.coastcenters[0]);
    },
    showModal() {
      this.$refs.editModal.show();
    },
    hideModal() {
      this.$refs.editModal.hide();
    },
    clearModal() {
      this.hours = 0;
    },
    onChange(e) {
      this.tableCenter.map(item => item.id).indexOf(e);
      this.hours = '';
    },
  },
};
</script>
<style>
.add-button{
    margin-left: 15px;
}
</style>
