import Vue from 'vue';
import Master from '@/components/external/_master/index';

describe('external/_master/index.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Master);
    const vm = new Constructor().$mount();
    // expect(vm.$el.querySelector('.page-wrapper').textContent)
    //   .to.equal('...');
  });
});
