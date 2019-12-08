import Vue from 'vue';
import Vuex from 'vuex';

import Main from './components/Main.vue';

function mainVue() {
  Vue.use(Vuex)

  var app = new Vue({
    el: '#app',
    components: {
      Main,
    },
    template: '<div><Main></Main></div>',
  });

}

mainVue();