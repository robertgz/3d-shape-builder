import Vue from 'vue';
import store from './store/index.store';
import App from './components/App.vue';

function mainVue() {

  var app = new Vue({
    el: '#app',
    store,
    components: {
      App,
    },
    template: '<div><App></App></div>',
  });

}

mainVue();