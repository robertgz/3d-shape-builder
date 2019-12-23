import Vue from 'vue'
import Vuex from 'vuex';
import meshes from './meshes';
import scene from './scene.store';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    md: meshes,
    sc: scene,
  },
  state: {},
  getters: {},
  actions: {},
  mutations: {},
});