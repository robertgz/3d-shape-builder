<template>
  <div v-bind:id="canvasID">
    <StatsComponent 
      v-bind:parentNodeSelector="canvasNodeSelector" 
      v-bind:panel="0"
    ></StatsComponent>
    <OrbitControlsComponent 
      v-bind:object="camera" 
      v-bind:renderer="renderer" 
      v-bind:properties="{zoomSpeed: 1}"
    ></OrbitControlsComponent>
  </div>
</template>

<script>
import * as THREE from 'three';
import StatsComponent from './StatsComponent.vue';
import OrbitControlsComponent from './OrbitControlsComponent.vue';

export default {
  data () {
    return {
      canvasID: "sceneRoot",
      sceneRootNode: null,
      renderer: null,
      scene: null,
      camera: null,
      cube: null,
    }
  },

  computed: {
    canvasNodeSelector: function() {
        return '#' + this.canvasID;
      },
  },

  components: {
    StatsComponent,
    OrbitControlsComponent,
  },

  methods: {
    // Based on code from: https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene
    init: function() {
      this.sceneRootNode = document.querySelector( this.canvasNodeSelector );
      this.sceneRootNode.appendChild( this.renderer.domElement );
    },
    createObject: function() {
      var geometry = new THREE.BoxGeometry( 1, 1, 1 );
      var material = new THREE.MeshBasicMaterial( { color: 0x44aa88 } );
      this.cube = new THREE.Mesh( geometry, material );
      this.scene.add( this.cube );
    },
    animate: function() {
      requestAnimationFrame( this.animate );

      this.cube.rotation.x += 0.01;
      this.cube.rotation.y += 0.01;

      this.renderer.render( this.scene, this.camera );
    },
  },

  created: function() {
    this.renderer = new THREE.WebGLRenderer();
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );  
    
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.camera.position.z = 5;

    this.createObject(); 
  },

  mounted: function () {
    this.init();       
    this.animate();
  }
}
</script>

<style scoped>
  canvas { width: 100%; height: 100% }
</style>