<template>
  <div ref="threeElement" id="threeElementID" >
    <SceneComponent />
    <MouseClickComponent />
    <OrbitControlsComponent/>
    <!-- <TransformControlsComponent/> -->
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

import SceneComponent from './SceneComponent.vue';
import MouseClickComponent from './MouseClickComponent.js';
import OrbitControlsComponent from './OrbitControlsComponent.js';
// import TransformControlsComponent from './TransformControlsComponent.js';


export default {

  components: {
    SceneComponent,
    MouseClickComponent,
    OrbitControlsComponent,
    // TransformControlsComponent,
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
