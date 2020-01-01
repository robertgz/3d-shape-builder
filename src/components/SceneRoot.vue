<template>
<div v-on:keyup.delete="deletePressed">
    <div v-bind:id="canvasID" v-on:click="clicked"></div>
    <StatsComponent 
      v-bind:parentNodeSelector="canvasNodeSelector" 
      v-bind:panel="0"
    ></StatsComponent>
    <!-- <OrbitControlsComponent 
      v-bind:object="camera" 
      v-bind:renderer="renderer" 
      v-bind:properties="{zoomSpeed: 1}"
    ></OrbitControlsComponent> -->
    <BasicGUIComponent/>  
</div>
</template>

<script>
import * as THREE from 'three';
import StatsComponent from './StatsComponent.vue';
// import OrbitControlsComponent from './OrbitControlsComponent.vue';
import BasicGUIComponent from './BasicGUIComponent.vue';

export default {
  components: {
    StatsComponent,
    // OrbitControlsComponent,
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
      // listenForClick () {
      //   return this.$store.getters['mouse/listen'];
      // }      
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

    clicked: function(event) {
      // if (this.listenForClick) {

        let options = {
          x:   ( event.clientX / window.innerWidth )  * 2 - 1,
          y: - ( event.clientY / window.innerHeight ) * 2 + 1,
        };

        // this.$store.dispatch('mouse/clicked', options);
        // console.log('SceneRoot:clicked', event)
        this.$store.dispatch('select/mouseClicked', { 
          mouse: options,
          ctrlKey: event.ctrlKey,
          shiftKey: event.shiftKey,
        });
      // }

    },

    deletePressed: function(event) {
      this.$store.dispatch('objects/deleteSelected');
    },

  }
}
</script>

<style scoped>
  canvas { width: 100%; height: 100% }
</style>