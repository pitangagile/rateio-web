<i18n>
{
  "en": {
    "about": "This is a {0}{1}{2} Lab app made with"
  },
  "pt": {
    "about": "Este é um app {0}{1}{2} Lab feito com"
  }
}
</i18n>

<template>
  <b-row class="page-wrapper mx-0">
    <div class="cover">
      <mansory />
    </div>
    <b-col cols="12" class="content-container">
      <transition name="fade">
        <router-view />
      </transition>
      <div class="about">
        <div class="message">
          <i18n path="about" tag="span">
            P<strong>it</strong>ang
          </i18n> <span class="icon-heart"></span>
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import mansory from './mansory';
import { addClass, removeClass } from '../../../commons/helpers/dom.helper';

export default {
  name: 'Master',
  components: { mansory },
  created() {
    addClass(document.body, 'scroll-hidden-y');
  },
  destroyed() {
    removeClass(document.body, 'scroll-hidden-y');
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/variables.scss';
.fade-enter-active, .fade-leave-active { transition-property: opacity; transition-duration: .25s; }
.fade-enter-active { transition-delay: .25s; }
.fade-enter, .fade-leave-active { opacity: 0 }

@keyframes beat{
	to { transform: scale(1.2); }
}

html, body {
  overflow: hidden;

  .page-wrapper {
    .content-container {
      pointer-events: none;
    }

    .about {
      position: fixed;
      left: 50%;
      bottom: 2rem;

      .message {
        color: $color-light;
        position: relative;
        left: -50%;
        width: 225px;
        font-size: .8rem;
        font-weight: $font-light;

        /deep/ strong, span {
          color: $color-light;
        }

        span.icon-heart {
          color: $color-senescent;
          &:before {
            animation: beat .25s infinite alternate;
            transform-origin: center;
          }
        }
      }
    }
  }
}

.cover {
  background-color: black;
  position: fixed;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
