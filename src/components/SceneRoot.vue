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
    <BasicGUIComponent/>
  </div>
</template>

<script>
import * as THREE from 'three';
import StatsComponent from './StatsComponent.vue';
import OrbitControlsComponent from './OrbitControlsComponent.vue';
import BoxComponent from './BoxComponent.vue';
import DatGUIComponent from './DatGUIComponent.vue';
import BasicGUIComponent from './BasicGUIComponent.vue';
import * as util from '../libs/utils.js';

export default {
  components: {
    StatsComponent,
    OrbitControlsComponent,
    BoxComponent,
    DatGUIComponent,
    BasicGUIComponent,
  },

  provide: function() {
    return {
      util: util,
      getScene: this.getScene
    }
  },

  data () {
    return {
      canvasID: "sceneRoot",
      sceneRootNode: null,
      renderer: null,
      scene: null,
      camera: null,
      cube: null,
      group: null,
    }
  },

  computed: {
    canvasNodeSelector: function() {
        return '#' + this.canvasID;
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
  },

  methods: {
    // Based on code from: https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene
    init: function() {
      this.sceneRootNode = document.querySelector( this.canvasNodeSelector );
      this.sceneRootNode.appendChild( this.renderer.domElement );      
    },
    createObject: function() {
      this.group = new THREE.Group();
      this.scene.add( this.group );
    },
    animate: function() {
      requestAnimationFrame( this.animate );

      this.group.rotation.x += 0.01;
      this.group.rotation.y += 0.01;

      this.renderer.render( this.scene, this.camera );
    },
    getScene: function () {
      return this.scene;
    },
  }
}
</script>

<style scoped>
  canvas { width: 100%; height: 100% }
</style>