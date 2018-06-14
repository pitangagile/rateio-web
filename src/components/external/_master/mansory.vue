<template>
  <div class="mansory">
    <img v-for="(src, index) in contributors" :key="index" :data-img="index" :src="src">
  </div>
</template>

<script>
import WindowMixin from './../../../commons/mixins/window.mixin';
import { addClass, removeClass } from '../../../commons/helpers/dom.helper';

let intervalOne;
let intervalTwo;
let intervalThree;

export default {
  name: 'Mansory',
  mixins: [WindowMixin],
  data() {
    return {
      contributors: [],
      total: 0,
      currentHover1: undefined,
      currentHover2: undefined,
      currentHover3: undefined,
    };
  },
  mounted() {
    this.start();
    window.onresize = () => { setTimeout(this.start, 100); };
  },
  methods: {
    generateSources() {
      const sources = [];
      const imgSize = 60;
      const horizontal = Math.ceil(this.windowWidth / imgSize);
      const vertical = Math.ceil(this.windowHeight / imgSize);
      this.total = (horizontal * vertical) + imgSize;

      let count = 0;
      for (let i = 0; i < this.total; i += 1) {
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
    hoverRandom(currentHover) {
      const index = parseInt(Math.random() * this.total, 10);
      const next = document.querySelector(`[data-img="${index}"]`);
      if (currentHover) removeClass(currentHover, 'hover');
      addClass(next, 'hover');

      return next;
    },
    start() {
      if (intervalOne) clearInterval(intervalOne);
      if (intervalTwo) clearInterval(intervalTwo);
      if (intervalThree) clearInterval(intervalThree);
      if (this.currentHover1) removeClass(this.currentHover1, 'hover');
      if (this.currentHover2) removeClass(this.currentHover2, 'hover');
      if (this.currentHover3) removeClass(this.currentHover3, 'hover');

      this.contributors = this.generateSources();

      intervalOne = setInterval(
        () => { this.currentHover1 = this.hoverRandom(this.currentHover1); },
        1000,
      );
      intervalTwo = setInterval(
        () => { this.currentHover2 = this.hoverRandom(this.currentHover2); },
        1400,
      );
      intervalThree = setInterval(
        () => { this.currentHover3 = this.hoverRandom(this.currentHover3); },
        1800,
      );
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
    transition: all 1.5s ease;

    &:hover, &.hover {
      border-radius: 10px;
      opacity: 1;
      filter: grayscale(0);
      transform: scale(1.3);
      z-index: 1;
      transition: all .0s ease;
    }
  }
}
</style>
