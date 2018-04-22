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
      let total = 510;
      if (this.isScreen('xs')) total = 110;
      if (this.isScreen('sm')) total = 210;
      if (this.isScreen('md')) total = 310;

      let count = 0;
      for (let i = 0; i < total; i += 1) {
        count += 1;
        sources.push(`/static/img/avatars/${count}.jpg`);
        if (count === 50) count = 0;
      }

      return sources;
    },
  },
};
</script>
