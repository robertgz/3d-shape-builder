import Vue from 'vue'
import Vuex from 'vuex';
import meshes from './meshes.store';
import scene from './scene.store';
import mouse from './mouse.store';
import select from './select.store';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    meshes: meshes,
    scene: scene,
    mouse: mouse,
    select: select,
  },
  state: {},
  getters: {},
  actions: {},
  mutations: {},
});