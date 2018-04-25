<template>
  <div class="mansory">
    <img v-for="(src, index) in contributors" :key="index" :src="src">
  </div>
</template>

<script>
import WindowMixin from './../../../commons/mixins/window.mixin';

export default {
  name: 'Mansory',
  mixins: [WindowMixin],
  data() {
    return {
      contributors: [],
    };
  },
  mounted() {
    this.contributors = this.generateSources();
  },
  methods: {
    generateSources() {
      const sources = [];
      const imgSize = 60;
      const horizontal = Math.ceil(this.windowWidth / imgSize);
      const vertical = Math.ceil(this.windowHeight / imgSize);
      const total = (horizontal * vertical) + imgSize;

      // if (this.isScreen('xs')) total = 110;
      // if (this.isScreen('sm')) total = 210;
      // if (this.isScreen('md')) total = 310;

      let count = 0;
      for (let i = 0; i < total; i += 1) {
        count += 1;
        sources.push(`/static/img/avatars/${count}.jpg`);
        if (count === 50) count = 0;
      }

      return this.shuffle(sources);
    },
    shuffle(arr) {
      return arr
        .map(a => [Math.random(), a])
        .sort((a, b) => a[0] - b[0])
        .map(a => a[1]);
    },
  },
};
</script>

<style lang="scss">
$img-size: 60px;

.mansory {
  width: calc(100% + #{$img-size});
  height: calc(100% + #{$img-size});

  img {
    filter: grayscale(100%);
    opacity: .3;
    position: relative;
    height: $img-size;
    width: $img-size;
    transition: all .3s ease;

    &:hover {
      border-radius: 10px;
      opacity: 1;
      filter: grayscale(0);
      transform: scale(1.3);
      z-index: 1;
      transition: all .5s ease;
    }
  }
}

// Small devices (landscape phones, 576px and up)
@media (min-width: 576px) {
  .mansory {
    // column-count: 15;
  }
}

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) {
  .mansory {
    // column-count: 13;
  }
}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) {
  .mansory {
    // column-count: 20;
  }
}

// Extra large devices (large desktops, 1366px and up)
@media (min-width: 1366px) {
  .mansory {
    // column-count: 30;
  }
}
</style>
