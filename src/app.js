import Vue from 'vue';
import store from './store/index.store';

import Main from './components/Main.vue';

function mainVue() {

  var app = new Vue({
    el: '#app',
    store,
    components: {
      Main,
    },
    template: '<div><Main></Main></div>',
  });

}

mainVue();