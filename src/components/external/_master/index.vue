<template>
  <b-row class="page-wrapper mx-0">
    <div class="cover">
      <!-- <div class="cover--image"></div> -->
      <mansory />
    </div>
    <b-col cols="12">
      <transition name="fade">
        <router-view />
      </transition>
      <div class="about">
        <div class="message">
          This is a P<strong>it</strong>ang Lab app made with <span class="icon-heart"></span>
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import mansory from './mansory';

export default {
  name: 'Master',
  components: { mansory },
};
</script>

<style lang="scss">
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
    // .cover {
    //   background-color: black;
    //   position: fixed;
    //   height: 100%;
    //   width: 100%;
    //   overflow: hidden;
    //   z-index: -1;

    //   .cover--image {
    //     background-image: url('/static/img/external-cover-5.jpg');
    //     background-position: center;
    //     background-repeat: no-repeat;
    //     background-attachment: fixed;
    //     background-size: cover;
    //     height: 100%;
    //     width: 100%;
    //     opacity: .5;
    //   }
    // }

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

        strong, span {
          color: $color-light;
        }

        span {
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
  z-index: -1;

  .mansory {
    column-count: 8;
    column-gap: 0;

    img {
      opacity: .3;
      width: 100%;
    }
  }
}

// Small devices (landscape phones, 576px and up)
@media (min-width: 576px) {
  .cover {
    .mansory {
      column-count: 15;
    }
  }
}

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) {
  .cover {
    .mansory {
      column-count: 13;
    }
  }
}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) {
  .cover {
    .mansory {
      column-count: 20;
    }
  }
}

// Extra large devices (large desktops, 1366px and up)
@media (min-width: 1366px) {
  .cover {
    .mansory {
      column-count: 30;
    }
  }
}
</style>
