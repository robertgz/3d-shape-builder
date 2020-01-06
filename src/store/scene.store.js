import Vue from 'vue'
import * as THREE from 'three';

const graph = {
  root: null,
  scene: null,
  selected: null,
  controls: null,
  helpers: null,
  renderer: null,
  camera: null,
  renderList: [],
  sceneRootNode: null, // canvas HTML element
};

const scene = {
  namespaced: true,
  state: {
  },

  getters: {
    getScene (state) {
      return graph.scene;
    },

    getControlsNode (state) {
      return graph.controls;
    },

    getHelpersNode (state) {
      return graph.helpers;
    },
    
    getRenderer (state) {
      return graph.renderer;
    },
    
    getCamera (state) {
      return graph.camera;
    },
    
    getCanvas (state) {
      return graph.sceneRootNode;
    },

    findObjectFromRootByID: (state) => (id) => {
      return graph.root.getObjectById( id );
    },

    findObjectsFromRootByIDs: (state) => (ids) => {      
      let objectList = [];
      ids.forEach( id => {
        objectList.push( graph.root.getObjectById( id ) )
      });

      return objectList;
    },

  },

  actions: {
    setup3 (context, { width, height }) {
      context.commit('setupRenderer', { width, height });
      context.commit('setupScene');
      context.commit('setupCamera', { width, height });
      context.dispatch('objects/setup', null, { root: true });
      context.dispatch('controls/setup', null, { root: true });

      console.log('setup done');
    },
    
    addSceneToCanvas(context, payload) {
      graph.sceneRootNode = document.querySelector( payload.canvas );
      graph.sceneRootNode.appendChild( graph.renderer.domElement );
    },

    startRendering(context) {
      console.log('rendering1 started');

      let animate = () => {
        requestAnimationFrame( animate );

        // if (graph.renderList.length > 0) {
        //   graph.renderList[0]();
        // }

        graph.renderer.render( graph.root, graph.camera );
      };
      animate();
    },
  },

  mutations: {
    setupRenderer (state, payload) {
      graph.renderer = new THREE.WebGLRenderer();
      graph.renderer.setSize( payload.width, payload.height );
    },

    setupScene (state, payload) {
      graph.root = new THREE.Scene();

      graph.scene = new THREE.Group();
      graph.selected = new THREE.Group();
      graph.controls = new THREE.Group();
      graph.helpers = new THREE.Group();

      graph.root.name = 'RootScene';
      graph.scene.name = 'Working Scene';
      graph.controls.name = 'ControlsParent';
      graph.helpers.name = 'HelpersParent';
      
      graph.root.add( graph.scene );
      graph.root.add( graph.selected );
      graph.root.add( graph.controls );
      graph.root.add( graph.helpers );
    },

    setupCamera (state, payload) {
      graph.camera = new THREE.PerspectiveCamera( 75, payload.width/payload.height, 0.1, 1000 );  
    
      graph.camera.position.z = 5;
    },

    addToScene(state, payload) {
      graph.scene.add(payload.object);
    },

    // addRenderer(state, payload) {
    //   console.log('addRenderer');
    //   graph.renderList.push(payload.renderer);
    // },

    // removeRenderer(state, payload) {},

    // removeAllRenderers(state) {
    //   graph.renderList.length = 0;
    // },

  },
}

export default scene;