<template>
    <div>
        <b-button class="add-button" @click="showModal">Adicionar</b-button>
        <!-- Modal Component -->
        <b-modal ref="editModal" centered title="Adicionar Centro de Custo ao Colaborador" ok-title="Adicionar" cancel-title="Cancelar">
            <b-col cols="12">
              <div slot="afterFilter" class="add-button">
                  <multiselect
                  class="select-center"
                  v-model="selectedCenter"
                  :options="costCenters"
                  :searchable="true"
                  placeholder="Centros de Custo">
                  </multiselect>
              </div>
              <div slot="afterFilter" class="add-button">
                  <multiselect
                  class="select-collaborator"
                  v-model="selectedCollaborator"
                  :options="collaboratorsList.map(collaborator => collaborator.name)"
                  :searchable="true"
                  placeholder="Colaboradores">
                  </multiselect>
              </div>
            </b-col>
        </b-modal>
    </div>
</template>

<script>
import { ClientTable } from 'vue-tables-2';
import Vue from 'vue';
import options from './../../../commons/helpers/grid.config';

Vue.use(ClientTable, options, false, 'bootstrap4', 'default');
export default {
  components: {
  },
  props: {
    collaboratorsList: {
      required: true,
    },
    costCenters: {
      required: true,
    },
  },
  data() {
    return {
      selectedCenter: null,
      selectedCollaborator: null,
      hours: 0,
      columns: ['code', 'description', 'hours', 'actions'],
      options: {
        sortable: [],
        filterable: false,
      },
    };
  },
  methods: {
    addCenter() {
      this.myCenters.splice(0, 0, this.costCenter[0]);
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
    margin-left: 7px;
}
.select-collaborator{
  margin-top: 10px;
}
</style>
