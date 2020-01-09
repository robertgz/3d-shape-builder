
const controls = {
  namespaced: true,

  modules: {  },

  state: {
    orbitControlActive: true,
    transformControlActive: false,
    transformDragging: false,
    // dragControlActive: false,
  },

  getters: {
    
    isTransformControlActive(state) {
      return state.transformControlActive;
    },

    isTransformDragging(state) {
      return state.transformDragging;
    },

    isOrbitControlActive(state) {
      return state.orbitControlActive;
    },

  },

  actions: {  },

  mutations: {

    setTransformControlActiveStatus(state, { status }) {
      state.transformControlActive = status;
    },

    setTransformDraggingStatus(state, { status }) {
      state.transformDragging = status;
    },

    setOrbitControlActiveStatus(state, { status }) {      
      state.orbitControlActive = status;
    },

  },
}

export default controls;