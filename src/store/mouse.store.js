import * as THREE from 'three';

const mouse = {
  namespaced: true,
  modules: {},
  
  state: {
    mouse: { x: 0, y: 0 },
    listenForClick: false,
  },

  getters: {
    listen(state) {
      return state.listenForClick;
    },

    location(state) {
      return state.mouse;
    },

    locationVector(state) {
      return new THREE.Vector2( state.mouse.x, state.mouse.y );
    },
  },

  actions: {
    clicked(context, payload) {
      // console.log('mouseClicked', payload);

      if (context.state.listenForClick) {
        context.commit('updateLocation', { x: payload.x, y: payload.y });
        // console.log('context.state.mouse', context.state.mouse);
      }

    },

    enableListening(context, payload) {
      context.state.listenForClick = true;
    },

    disableListening(context, payload) {
      context.state.listenForClick = false;
    },
  },

  mutations: {
    updateLocation (state, payload) {
      // state.mouse.set(payload.x, payload.y);
      state.mouse = { x: payload.x, y: payload.y };
    },
  },
};

export default mouse;