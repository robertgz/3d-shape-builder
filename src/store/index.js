import Vue from 'vue'
import Vuex from 'vuex';
import meshes from './meshes';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    md: meshes,
  },
  state: {},
  getters: {},
  actions: {},
  mutations: {},
});