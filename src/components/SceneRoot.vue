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
    <BoxComponent
      v-bind:parentObject="group"
      v-bind:width="1"
      v-bind:height="1.25"
      v-bind:depth="1.5"
      v-bind:color="0x00ff00"
    ></BoxComponent>
    <DatGUIComponent/>
  </div>
</template>

<script>
import * as THREE from 'three';
import StatsComponent from './StatsComponent.vue';
import OrbitControlsComponent from './OrbitControlsComponent.vue';
import BoxComponent from './BoxComponent.vue';
import DatGUIComponent from './DatGUIComponent.vue';

export default {
  components: {
    StatsComponent,
    OrbitControlsComponent,
    BoxComponent,
    DatGUIComponent,
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
  }
}
</script>

<style scoped>
  canvas { width: 100%; height: 100% }
</style>