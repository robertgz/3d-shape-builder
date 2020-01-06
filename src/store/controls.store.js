import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const data = {
  orbitControl: null,
  // dragControl: null,
};

const controls = {
  namespaced: true,
  modules: {    
  },
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
  actions: {

    setup(context) {
      let renderer = context.rootGetters['scene/getRenderer'];
      let camera = context.rootGetters['scene/getCamera'];

      data.orbitControl = new OrbitControls( 
        camera,
        renderer.domElement
      );

      data.orbitControl.zoomSpeed = 1

      data.orbitControl.mouseButtons = {
        LEFT: 0,
        MIDDLE: 1,
        RIGHT: 2
      };     

    },

  },
  mutations: {

    setTransformControlActiveStatus(state, { status }) {

      state.transformControlActive = status;

    },

    setOrbitControlActiveStatus(state, { status }) {
      
      state.orbitControlActive = status;
      data.orbitControl.enabled = status;

    },

  },
}

export default controls;
