const WindowMixin = {
  data() {
    return {
      windowHeight: 0,
      windowWidth: 0,
    };
  },
  mounted() {
    const self = this;
    self.windowHeight = window.innerHeight;
    self.windowWidth = window.innerWidth;

    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        self.windowHeight = window.innerHeight;
        self.windowWidth = window.innerWidth;
      });
    });
  },
  methods: {
    isScreen(breakpoint) {
      if (breakpoint === 'xs') {
        return this.windowWidth < 576;
      } else if (breakpoint === 'sm') {
        return this.windowWidth >= 576 && this.windowWidth < 768;
      } else if (breakpoint === 'md') {
        return this.windowWidth >= 768 && this.windowWidth < 992;
      } else if (breakpoint === 'xl') {
        return this.windowWidth >= 1366 && this.windowWidth < 1366;
      } else if (breakpoint === 'ul') {
        return this.windowWidth >= 1366;
      }

      return false;
    },
    screenBreakpoint() {
      if (this.isScreen('xs')) return 'xs';
      else if (this.isScreen('sm')) return 'sm';
      else if (this.isScreen('md')) return 'md';
      else if (this.isScreen('xl')) return 'xl';
      else if (this.isScreen('ul')) return 'ul';

      return 'unknown';
    },
  },
};

export default WindowMixin;
