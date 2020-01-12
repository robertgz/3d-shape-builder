<template>
  <div ref="threeElement" id="threeElementID" >

    <!-- <StatsComponent       
      v-bind:panel="0"
    ></StatsComponent> -->

    <SceneComponent />
    <MouseClickComponent />
    <OrbitControlsComponent/>
    <TransformControlsComponent/>
  </div>
</template>

<script>
import * as THREE from 'three';
import { mapGetters, mapMutations, mapActions } from 'vuex';

import StatsComponent from './StatsComponent.vue';

import SceneComponent from './SceneComponent.vue';
import MouseClickComponent from './MouseClickComponent.js';
import OrbitControlsComponent from './OrbitControlsComponent.js';
import TransformControlsComponent from './TransformControlsComponent.js';


export default {

  components: {
    StatsComponent,
    SceneComponent,
    MouseClickComponent,
    OrbitControlsComponent,
    TransformControlsComponent,
  },

  provide: function () {

    return {
      threeElement: this.getThreeElement,
    }
    
  },

  methods: {
    
    getThreeElement () {

      return this.$refs.threeElement;

    },

  },

}
</script>

<style scoped>
</style>
