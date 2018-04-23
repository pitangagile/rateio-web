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
  </b-row>
</template>

<script>
export default {
  name: 'Settings',
  showLoading: true,
  computed: {
    user() {
      return this.$store.getters['auth/user'];
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
