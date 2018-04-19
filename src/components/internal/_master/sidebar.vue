<template>
  <nav class="d-none d-md-block sidebar">
    <div class="sidebar-sticky py-2">
      <div class="brand mb-4 text-center">
        <a href="#">
          <img class="brand--logo" src="/static/img/pitanga-branca.png"/>
          <!-- <div class="brand--img red"></div> -->
        </a>
      </div>

      <!-- <ul class="nav flex-column">
        <li class="nav-item project-selection">
          <b-dropdown :text="currentProjectSelection">
            <b-dropdown-item>Sky TN</b-dropdown-item>
            <b-dropdown-item>ONS</b-dropdown-item>
            <b-dropdown-item>SEE-PE</b-dropdown-item>
          </b-dropdown>
        </li>
      </ul> -->

      <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-3 text-muted">
        <span>SISTEMA DE RATEIO</span>
      </h6>

      <ul class="nav flex-column mb-2">
        <li class="nav-item">
          <router-link to="/internal/" class="nav-link" :class="{ 'active' : isActive('dashboard')}">
            <span class="icon-chart-line mr-2"></span>
            Dashboard
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/internal/reporting" class="nav-link" :class="{ 'active' : isActive('reporting')}">
            <span class="icon-doc-text mr-2"></span>
            Reportagem
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/internal/manage" class="nav-link" :class="{ 'active' : isActive('manage')}">
            <span class="icon-crown mr-2"></span>
            Gerenciar Rateio
          </router-link>
        </li>
        
        <li class="nav-item">
          <router-link to="/internal/allocation" class="nav-link" :class="{ 'active' : isActive('allocation')}">
            <span class="icon-calendar mr-2"></span>
            Alocação
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/internal/allocationmap" class="nav-link" :class="{ 'active' : isActive('allocationmap')}">
            <span class="icon-calendar mr-2"></span>
            Mapa alocação
          </router-link>
        </li>
      </ul>

      <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-3 text-muted">
        <span>CONFIGURAÇÃO</span>
      </h6>

      <ul class="nav flex-column mb-2">
        <li class="nav-item">
          <router-link to="/internal/settings" class="nav-link" :class="{ 'active' : isActive('settings')}">
            <span class="icon-cog mr-2"></span>
            Colaborador
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/internal/costcenter" class="nav-link" :class="{ 'active' : isActive('costcenter')}">
            <span class="icon-user-o mr-2"></span>
            Centros de custo
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/internal/schedule" class="nav-link" :class="{ 'active' : isActive('schedule')}">
            <span class="icon-user-o mr-2"></span>
            Rotinas batch
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/internal/support" class="nav-link" :class="{ 'active' : isActive('support')}">
            <span class="icon-umbrella mr-2"></span>
            Ajuda
          </router-link>
        </li>
        <hr>
        <li class="nav-item">
          <a class="nav-link" href="#" @click.prevent="logout">
            <span class="icon-logout mr-2"></span>
            Sair
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      selectedProject: 'Sky Digital',
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
    currentProjectSelection() {
      return `Project: ${this.selectedProject}`;
    },
  },
  methods: {
    isActive(routeName) {
      return this.currentRoute === routeName;
    },
  },
};
</script>

<style lang="scss">
@import '../../../assets/styles/variables.scss';

.sidebar {
  background-color: rgba(53,57,93,1);
  background: linear-gradient(to bottom, rgba(53,57,93,1) 0%, rgba(42,45,68,1) 100%);
  bottom: 0;
  max-width: 15rem;
  padding: 0;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10000;

  .sidebar-sticky {
    .brand {
      position: relative;
      height: 50px;
      width: 100%;
      
      .brand--logo{
        position: relative;
        width: 30%;
      }

      .brand--img {
        background-image: url('/static/img/pitangas.png') ;
        height: 50px;
        width: 65px;
        background-size: cover;
        background-repeat: no-repeat;        
        margin: 0 auto;

        &.orange {
          background-position: 0 0;
        }
        &.red {
          background-position: -368px 0;
        }
      }
    }

    .sidebar-heading,
    .project-selection,
    .nav-link
    {
      margin-left: 1.5rem;
      margin-right: 1.5rem;
    }

    .sidebar-heading {
      span {
        color: $color-light;
        font-size: .7rem;
      }
    }
    .project-selection {
      .dropdown {
        width: 100%;

        .dropdown-toggle {
          background: #3e4368;
          border: 0;
          border-radius: 1cm;
          font-size: .8rem;
          padding-left: 25px;
          padding-right: 25px;
          width: 160px;

          &:after{
            margin-left: 0.5em;
          }
        }

        .dropdown-menu {
          background: #3e4368;
          box-shadow: 3px 5px 15px 2px rgba(0, 0, 0, .5);
          width: 100%;

          a {
            color: $color-light;
            font-size: .8rem;
            outline: 0;
            &:hover, &:focus{
              background-color: #2a2c44;
            }
          }
        }
      }
    }

    .nav {
      .nav-item:not(.project-selection) {
        margin-bottom: .25rem;

        a, a span {
          font-size: .8rem;
          color: $color-light;
        }

        a.active, a.active span,
        a:hover, a:hover span {
          background: #2a2c44;
        }

        a:hover span,
        a.active span{
          color: #00b6e3;
        }

        a.active, a:hover {
          margin-right: 0;
          border-radius: 1cm 0 0 1cm;
        }
      }
    }
  }
}
</style>

