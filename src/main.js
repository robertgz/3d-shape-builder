import Vue from 'https://unpkg.com/vue@2.6.10/dist/vue.esm.browser.js';

import Main from './components/Main.vue';

function mainVue() {

  var app = new Vue({
    el: '#app',
    components: {
      Main,
    },
    template: '<div><Main></Main></div>',
  });

}

mainVue();