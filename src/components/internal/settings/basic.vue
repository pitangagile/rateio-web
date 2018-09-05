<template>
  <b-row>
    <b-col cols="3">
      <b-card no-footer :header="user.DisplayName.toUpperCase()"
              header-tag="header"
              title="">
        <img style="border-radius:50%; max-height:90%;" :src="user.PictureUrl" class="card-img"></img>
        <b-card-body>
          <span>MATRÍCULA : {{user.registration | toUpper}}</span>
        </b-card-body>
      </b-card>
    </b-col>
    <b-col cols="9">
      <b-card no-footer :header="'INFORMAÇÕES'"
              header-tag="header"
              title="">
        <b-card-body style="padding: 0px !important;">
          <!-- Carga Horária Diária -->
          <b-row class="row-form">
            <b-col cols="2">
              <label for="workHours">CARGA HORÁRIA:</label>
            </b-col>
            <b-col cols="10">
              <b-form-select id="workHours" class="selectWorkHours" disabled v-model="user.workHours" :options="options"></b-form-select>
            </b-col>
          </b-row>
          <!-- PJ -->
          <b-row class="row-form" style="padding-top: 10px;">
            <b-col cols="2">
              <label for="checkbox" id="checkbox-pj">PESSOA JURÍDICA</label>
            </b-col>
            <b-col cols="10">
              <b-form-checkbox id="checkbox" disabled
                               required
                               v-model="user.isPj">
              </b-form-checkbox>
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
  /*eslint-disable*/

  import VueSingleSelect from "vue-single-select";

  export default {
    components: {VueSingleSelect},
    data() {
      return {
        isPj: null,
        options: [{value: 6, text: '6hs'},{value: 8, text: '8hs'}]
      }
    },
    computed: {
      user() {
        return this.$store.getters['auth/user'];
      },
    },
    filters : {
      toUpper(value){
        if (value !== null && value !== undefined){
          return value.toUpperCase();
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .card-header div {
    /*font-size: 18px;*/
    text-align: center;
  }

  .card-body {
    text-align: center;
  }

  #checkbox-pj {
    /*font-weight: bold;*/
  }

  .selectWorkHours {
    max-width: 100px;
  }

  .row-form {
    text-align: left;
  }

</style>
