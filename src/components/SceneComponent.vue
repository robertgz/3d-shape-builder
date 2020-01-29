<template>
  <div class="scene-holder" id="canvasID" ref="sceneContainer">
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

import * as THREE from "three";

export default {

  data () {
    return {
      scene: null,
      renderer: null,
      size: {width: 0, height: 0 },
      camera: null,
      cameraPosition: {
        x: 6,
        y: 3,
        z: 1,
      },
    }
  },

  mounted: function () {

    this.scene = new THREE.Scene();
    THREE.Object3D.DefaultUp = new THREE.Vector3(0,0,1); // set the coordinate system to be Z-up

    this.setSize();
    this.setupRenderer();
    this.setupCamera();

    this.addSceneData({
      scene: this.scene,
      renderer: this.renderer,
      camera: this.camera,
    });
    
    this.startRendering();

  },

  methods: {
    setSize() {

      this.size.width = this.$refs.sceneContainer.clientWidth;
      this.size.height = this.$refs.sceneContainer.clientHeight;  
   
    },

    setupRenderer (state, payload) {
      this.renderer = new THREE.WebGLRenderer();

      this.renderer.setSize( 
        this.size.width, 
        this.size.height
      );

      this.$refs.sceneContainer.appendChild( this.renderer.domElement );

      this.renderer.domElement.setAttribute("style", "width: 100%; height: 100%; display: block;");
      window.addEventListener( 'resize', this.onElementResize, false );
    },

    onElementResize(event) {
      let width  = window.innerWidth;
      let height = window.innerHeight;

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    
      this.renderer.setSize(width, height);
    },

    setupCamera() {
      this.camera = new THREE.PerspectiveCamera( 75, this.size.width / this.size.height, 0.1, 1000 );
      this.camera.position.x = this.cameraPosition.x;
      this.camera.position.y = this.cameraPosition.y;
      this.camera.position.z = this.cameraPosition.z;
    },

    startRendering() {
      // this.$store.dispatch('scene/startRendering');

      let animate = () => {      
        requestAnimationFrame( animate );
        
        this.renderer.render( this.scene, this.camera );
      }

      animate();

    },

    ...mapActions('scene', {
      addSceneData: 'addSceneData',
    }),

  },

};

</script>

<style scoped>
  .scene-holder {
    position: fixed;
    width: 100%;
    height: 100%;
    margin: 0;
    top: 0;
    left: 0;
    bottom: 0;
    /* z-index: 2; */
  }

  /* body { margin: 0; } */

</style>