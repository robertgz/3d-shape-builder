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
import BasicGUIComponent from './BasicGUIComponent.vue';
// import * as util from '../libs/utils.js';

export default {
  components: {
    StatsComponent,
    OrbitControlsComponent,
    BasicGUIComponent,
  },

  provide: function() {
    return {  }
  },

  data () {
    return {
      canvasID: "sceneRoot",
      sceneRootNode: null,
    }
  },

  computed: {
    canvasNodeSelector: function() {
        return '#' + this.canvasID;
      },
      renderer: function() {
        return this.$store.getters.getRenderer;
      },
      camera: function() {
        return this.$store.getters.getCamera;
      },
  },

  created: function() {
    this.$store.dispatch('setup3', {
      width: window.innerWidth, height: window.innerHeight
    });
  },

  mounted: function () {
    // this.init();

    this.$store.commit('addSceneToCanvas', {
      canvas: this.canvasNodeSelector,
    });

    this.$store.commit('startRendering');
  },

  methods: {
    init: function() {  },

  }
}
</script>

<style scoped>
  canvas { width: 100%; height: 100% }
</style>