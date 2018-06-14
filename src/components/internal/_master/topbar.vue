<template>
  <b-navbar class="topbar" toggleable="md" type="light" variant="" fixed="top">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#">
      <img src="/static/img/icons/favicon-32x32.png">
    </b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-form class="search-form" @submit.prevent="search">
          <b-form-input size="sm" class="mr-sm-2" type="text" v-model="term" />
          <b-button size="sm" type="submit">
            <span class="icon-search"></span>
          </b-button>
        </b-nav-form>

        <topbaruser />
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
import topbaruser from './topbaruser';

export default {
  name: 'Topbar',
  components: {
    topbaruser,
  },
  data() {
    return {
      term: '',
    };
  },
  methods: {
    search() {
      console.log('> Do search: ', this.term); // eslint-disable-line
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/variables.scss';

.topbar {
  background-color: rgba(255, 255, 255, .8);
  border-bottom: 1px solid $color-gray-1;

  .navbar-toggler {
    border: 0;
  }

  .search-form {
    position: relative;
    margin-top: 15px;

    input {
      border-radius: 1cm;
      padding-right: 30px;
    }

    button {
      background: none;
      border: 0;
      right: 8px;
      position: absolute;

      span {
        color: $color-gray-1;
      }
    }
  }
}
@media (min-width: 768px) {
  .topbar.bg-light {
    background-color: transparent !important;
  }
  .topbar {
    .search-form,
    .user-settings {
      margin: 0;
    }
  }
}
</style>
