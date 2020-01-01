import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';

const data = {
  orbitControl: null,
  transformControl: null,
};

const controls = {
  namespaced: true,
  modules: {    
  },
  state: {},
  getters: {},
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

      data.transformControl = new TransformControls( 
        camera,
        renderer.domElement
      );
    },
    
    enableTransform(context, { selected } ) {
      let scene = context.rootGetters['scene/getScene'];
      let object = scene.getObjectById( selected );

      console.log('controls/enableTransform', object);
      
      data.transformControl.attach(object);
      
      console.log('data.transformControls', data.transformControl);

      data.transformControl.enabled = true;

      scene.add(data.transformControl);

    },
    disableTransform(context) {
      data.transformControl.detach();
    },

  },
  mutations: {},
}

export default controls;
