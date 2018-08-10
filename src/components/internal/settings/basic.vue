<template>
  <b-card no-footer :header="user.DisplayName"
          header-tag="header"
          title="" style="max-width: 300px;">
    <img style="border-radius:50%; max-height:90%;" :src="user.PictureUrl" class="card-img"></img>
    <b-card-body>
      <b-form-checkbox id="checkbox"
                       v-model="isPj"
                       value="false"
                       unchecked-value="true">
        <label for="checkbox" id="checkbox-pj">Pessoa Jurídica</label>
      </b-form-checkbox>
    </b-card-body>
  </b-card>
</template>

<script>
  /*eslint-disable*/
  export default {
    props: {
      user:
        {
          require: true,
        },
    },
    data(){
      return{
        isPj : null,
      }
    }
  }
</script>

<style lang="scss" scoped>
  .card-header div {
    font-size: 18px;
    font-weight: bold;
    text-align: center;
  }

  .card-body {
    text-align: center;
  }

  #checkbox-pj {
    font-weight: bold;
  }

</style>
