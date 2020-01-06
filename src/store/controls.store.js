
const controls = {
  namespaced: true,

  modules: {  },

  state: {
    orbitControlActive: true,
    transformControlActive: false,
    // dragControlActive: false,
  },

  getters: {
    
    isTransformControlActive(state) {
      return state.transformControlActive;
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

    setOrbitControlActiveStatus(state, { status }) {      
      state.orbitControlActive = status;
    },

  },
}

export default controls;