import Vue from 'vue'
import * as THREE from 'three';

const graph = {
  root: null,
  scene: null,
  selected: null,
  renderer: null,
  camera: null,
  renderList: [],
  sceneRootNode: null, // canvas HTML element
};

const scene = {
  // namespaced: true,
  state: {
    renderList: [],
  },

  getters: {
    getScene (state) {
      return graph.scene;
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

  },

  actions: {
    setup3 (context, { width, height }) {
      context.commit('setupRenderer', { width, height });
      context.commit('setupScene');
      context.commit('setupCamera', { width, height });
      console.log('setup done');
    },
    
    addSceneToCanvas(context, payload) {
      graph.sceneRootNode = document.querySelector( payload.canvas );
      graph.sceneRootNode.appendChild( graph.renderer.domElement );
      console.log('scene added');
    },

    startRendering(context) {
      console.log('rendering1 started');

      let animate = () => {
        requestAnimationFrame( animate );

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
      
      graph.root.add( graph.scene );
      graph.root.add( graph.selected );
    },

    setupCamera (state, payload) {
      graph.camera = new THREE.PerspectiveCamera( 75, payload.width/payload.height, 0.1, 1000 );  
    
      graph.camera.position.z = 5;
    },

    addToScene(state, payload) {
      graph.scene.add(payload.object);
    },

  },
}

export default scene;