<template>
<div v-on:keyup.delete="deletePressed">
    <MouseClickComponent v-slot:default="{ clicked }" >
      <div v-bind:id="canvasID" v-on:click="clicked" ></div>
    </MouseClickComponent>

    <StatsComponent 
      v-bind:parentNodeSelector="canvasNodeSelector" 
      v-bind:panel="0"
    ></StatsComponent>
    <OrbitControlsComponent/>
    <BasicGUIComponent/>  
</div>
</template>

<script>
import * as THREE from 'three';
import StatsComponent from './StatsComponent.vue';
import OrbitControlsComponent from './OrbitControlsComponent.js';
import MouseClickComponent from './MouseClickComponent.js';
import BasicGUIComponent from './BasicGUIComponent.vue';

export default {
  components: {
    StatsComponent,
    OrbitControlsComponent,
    MouseClickComponent,
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
        return this.$store.getters['scene/getRenderer'];

      },
      camera: function() {
        return this.$store.getters['scene/getCamera'];

      },
  },

  created: function() {
    this.$store.dispatch('scene/setup3', {
      width: window.innerWidth, height: window.innerHeight
    });
  },

  mounted: function () {
    // this.init();

    this.$store.dispatch('scene/addSceneToCanvas', {
      canvas: this.canvasNodeSelector,
    });

    this.$store.dispatch('scene/startRendering');
  },

  methods: {
    init: function() {  },

    deletePressed: function(event) {
      this.$store.dispatch('objects/deleteSelected');
    },

  }
}
</script>

<style scoped>
  canvas { width: 100%; height: 100% }
</style>