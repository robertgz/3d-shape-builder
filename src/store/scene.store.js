import Vue from 'vue'
import * as THREE from 'three';

const scene = {
  state: {
    renderer: null,
    scene: null,
    camera: null,
    sceneRootNode: null, // canvas
  },

  getters: {
    getScene (state) {
      return state.scene;
    },
    
    getRenderer (state) {
      return state.renderer;
    },
    
    getCamera (state) {
      return state.camera;
    },

   },

  actions: {
    setup3 (context, { width, height }) {
      context.commit('setupRenderer', { width, height });
      context.commit('setupScene');
      context.commit('setupCamera', { width, height });
      console.log('setup done');
    },
  },

  mutations: { 
    setupRenderer (state, payload) {
      state.renderer = new THREE.WebGLRenderer();
      state.renderer.setSize( payload.width, payload.height );      
    },
    setupScene (state, payload) {
      state.scene = new THREE.Scene();
    },
    setupCamera (state, payload) {
      state.camera = new THREE.PerspectiveCamera( 75, payload.width/payload.height, 0.1, 1000 );  
    
      state.camera.position.z = 5;
    },
    addSceneToCanvas(state, payload) {
      state.sceneRootNode = document.querySelector( payload.canvas );
      state.sceneRootNode.appendChild( state.renderer.domElement );
      console.log('scene added');
    },
    startRendering(state) {
      console.log('rendering started');

      // let raycaster = new THREE.Raycaster();
      // let mouse = new THREE.Vector2();
      // function onMouseMove(event) {
      //   // console.log('event', event);
      //   mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      //   mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;        
      // };

      let animate = () => {
        requestAnimationFrame( animate );

        // raycaster.setFromCamera( mouse, state.camera );
        // var intersects = raycaster.intersectObjects( state.scene.children );
        // for ( var i = 0; i < intersects.length; i++ ) {
        //   intersects[ i ].object.material.color.set( 0xff0000 );      
        // }

        state.renderer.render( state.scene, state.camera );
      };

      // window.addEventListener( 'mousemove', onMouseMove, false );

      animate();
    },
    addToScene(state, payload) {
      state.scene.add(payload.object);
    }
  },

}

export default scene;