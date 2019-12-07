import Vue from 'https://unpkg.com/vue@2.6.10/dist/vue.esm.browser.js';

function mainVue() {

  var app = new Vue({
    el: '#app',
    template: '<div>Vue app</div>'
  });

}

mainVue();