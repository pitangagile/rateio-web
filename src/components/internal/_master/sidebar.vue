<template>
  <nav class="d-none d-md-block sidebar">
    <div class="sidebar-sticky py-2">
      <div class="brand mt-4 mb-2 text-center">
        <a href="#">
          <img class="brand--logo mb-2" src="/static/img/pitanga-vermelha.png"/>
        </a>
      </div>
      <ul class="nav flex-column">
        <li class="nav-item app-selection">
          <b-dropdown :text="'Rateio'">
            <b-dropdown-item @click="goTo('http://intranet.pitang.com.br/')">
              <span class="icon-network"></span>
              Intranet Pitang
            </b-dropdown-item>
            <b-dropdown-item @click="goTo('http://portalcolaborador.cesar.org.br/Corpore.Net/Login.aspx')">
              <span class="icon-lifebuoy"></span>
              Portal do Colaborador
            </b-dropdown-item>
            <b-dropdown-item @click="goTo('http://mercuri.pitang.com/atual/site/index.html')">
              <span class="icon-flash"></span>
              Mercuri
            </b-dropdown-item>
          </b-dropdown>
        </li>
      </ul>
      <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-3 text-muted">
        <span>COLABORADOR</span>
      </h6>
      <ul class="nav flex-column mb-2">
        <li class="nav-item">
          <router-link to="/internal/" class="nav-link" :class="{ 'active' : isActive('settings')}">
            <span class="icon-home mr-2"></span>
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/internal/reporting" class="nav-link" :class="{ 'active' : isActive('reporting')}">
            <span class="icon-doc-text mr-2"></span>
            Reportagem
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/internal/holiday" class="nav-link" :class="{ 'active' : isActive('holiday')}">
            <span class="icon-calendar-check-o mr-2"></span>
            Feriados
          </router-link>
        </li>
      </ul>
      <span v-show="user.role ==='gerente' || user.role ==='administrador'">
        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-3 text-muted">
          <span>GERÊNCIA</span>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <router-link to="/internal/employee" class="nav-link" :class="{ 'active' : isActive('employee')}">
              <span class="icon-vcard mr-2"></span>
              Colaboradores
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/internal/manage" class="nav-link" :class="{ 'active' : isActive('manage')}">
              <span class="icon-archive mr-2"></span>
              Rateio
            </router-link>
          </li>
        </ul>
      </span>
      <span v-show="user.role ==='administrador'">
        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-3 text-muted">
          <span>ADMINISTRAÇÃO</span>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <router-link to="/internal/costcenter" class="nav-link" :class="{ 'active' : isActive('costcenter')}">
              <span class="icon-money mr-2"></span>
              Centros de Custo
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/internal/period" class="nav-link" :class="{ 'active' : isActive('period')}">
              <span class="icon-calendar-1 mr-2"></span>
              Período
            </router-link>
          </li>
        </ul>
      </span>
      <ul class="nav flex-column mb-2">
        <hr>
        <li class="nav-item">
          <router-link to="/internal/help" class="nav-link" :class="{ 'active' : isActive('help')}">
            <span class="icon-help-circled mr-2"></span>
            Ajuda
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click.prevent="logout">
            <span class="icon-logout mr-2"></span>
            Sair
          </a>
        </li>
        <hr>
      </ul>
    </div>
  </nav>
</template>

<script>
  /* eslint-disable */
  export default {

    name: 'Sidebar',
    data() {
      return {
        currentRoute: '',
      };
    },
    created() {
      this.currentRoute = this.$route.name;

      this.$router.afterEach((to) => {
        this.currentRoute = to.name;
      });
    },
    computed: {
      user() {
        return this.$store.getters['auth/user'];
      }
    },
    methods: {
      isActive(routeName) {
        return this.currentRoute === routeName;
      },
      goTo(href) {
        window.open(href, '_blank');
      },
    },
  };
</script>

<style lang="scss">
  @import '../../../assets/styles/variables.scss';

  .sidebar {
    background-color: $color-sidebar;
    //background: linear-gradient(to bottom, $color-daredevil 0%, $color-fireworks 100%);
    bottom: 0;
    max-width: 15rem;
    min-height: 100%;
    overflow: auto;
    padding: 0;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10000;
    box-shadow: inset -5px 0 10px 0 rgba(0, 0, 0, .2);

    &:before {
      content: "";
      opacity: 0.15;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      position: absolute;
      z-index: -1;
      // background-image: url('/static/img/sidebar.jpg');
      background-repeat: no-repeat;
      background-size: cover;
      background-position: -650px 0;
    }

    .sidebar-sticky {
      .brand {
        position: relative;

        .brand--logo {
          width: 50px;
        }

        .brand--img {
          height: 50px;
          width: 65px;
          margin: 0 auto;
        }
      }

      .sidebar-heading,
      .app-selection,
      .nav-link {
        margin-left: 1.5rem;
        margin-right: 1.5rem;
      }

      .sidebar-heading {
        span {
          color: $color-dark;
          font-size: .8rem;
          font-weight: 700;
        }
      }
      .app-selection {
        .dropdown {
          width: 100%;

          .dropdown-toggle {
            background: $color-light;
            border: 0;
            border-radius: 1cm;
            color: $color-dark;
            font-size: .8rem;
            padding-left: 25px;
            padding-right: 25px;
            box-shadow: 0 1px 0 0 rgba(0, 0, 0, .2) !important;
            width: 160px;

            &:after {
              margin-left: 0.5em;
            }
          }

          .dropdown-menu {
            background: $color-light;
            box-shadow: 3px 5px 5px 0 rgba(0, 0, 0, 0.2);
            width: 100%;

            a {
              color: $color-dark;
              font-size: .8rem;
              outline: 0;
              &:hover, &:focus {
                background-color: $color-sidebar;
              }
            }
          }

          .dropdown-item {
            padding: 0.25rem;

            span {
              color: $color-dark;
            }

            &:hover span {
              color: $color-fireworks;
            }
          }
        }
      }

      .nav {
        .nav-item:not(.app-selection) {
          margin-bottom: .25rem;

          a, a span {
            font-size: .8rem;
            color: $color-dark;
          }

          a.active, a.active span,
          a:hover, a:hover span,
          a:focus, a:focus span {
            background: $color-light;
          }

          a:hover span,
          a.active span,
          a:focus span {
            color: $color-fireworks;

            &.icon-logout {
              color: $color-fireworks;
            }
          }

          a.active, a:hover, a:focus {
            margin-right: 0;
            border-radius: 1cm 0 0 1cm;
            box-shadow: -3px 5px 10px 0 rgba(0, 0, 0, 0.2) !important;
            transition: box-shadow 0.25s ease, background-color 0.25s ease;
          }
        }
      }
    }
  }
</style>
