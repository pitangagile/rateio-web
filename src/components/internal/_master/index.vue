<template>
  <b-row class="page-wrapper mx-0">
    <sidebar />
    <topbar />

    <main role="main" class="ml-sm-auto pt-3 pr-4">
      <transition name="fade">
        <router-view />
      </transition>
    </main>
  </b-row>
</template>

<script>
import sidebar from './sidebar';
import topbar from './topbar';

export default {
  name: 'Master',
  components: {
    sidebar,
    topbar,
  },
};
</script>

<style lang="scss">
@import '../../../assets/styles/variables.scss';

.fade-enter-active,
.fade-leave-active { transition-property: opacity; transition-duration: 0.25s; }
.fade-enter-active { transition-delay: 0.25s; }
.fade-enter,
.fade-leave-active { opacity: 0; }

main {
  margin-top: 50px;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  width: 100%;
}

.page--title span {
  color: $color-fireworks;
}

@media (min-width: 768px) {
  main {
    padding-left: 16rem;
  }
}
</style>
