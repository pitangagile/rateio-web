<template>
    <b-nav-item-dropdown right class="user-settings">
        <!-- Using button-content slot -->
        <template slot="button-content">
            <img :src="user.PictureUrl">
            <span class="user-name d-block d-md-none">{{user.FistName}}</span>
        </template>
        <b-dropdown-item href="#">
            <span class="icon-user-o"></span> Configurações
        </b-dropdown-item>
            <b-dropdown-item href="#" @click.prevent="logout">
            <span class="icon-logout"></span> Sair
        </b-dropdown-item>
    </b-nav-item-dropdown>
</template>

<script>
export default {
  name: 'TopbarUser',
  computed: {
    user() {
      return this.$store.getters['auth/user'];
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/variables.scss';
.user-settings {
    position: relative;
    margin-top: 10px;

    .user-name {
        position: absolute;
        left: 55px;
        top: 10px;
    }
    img {
        border-radius: 1cm;
        border: 1px solid $color-gray-1;
        padding: 2px;
        max-width: 30px;
    }

    .dropdown-toggle::after {
        margin-top: 10px !important;
    }
}
</style>
