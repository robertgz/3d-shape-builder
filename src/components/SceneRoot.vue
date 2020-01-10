<template>
<div v-on:keyup.delete="deletePressed">
  
    <ThreeComponent />
    <!--
    <StatsComponent 
      v-bind:parentNodeSelector="canvasNodeSelector" 
      v-bind:panel="0"
    ></StatsComponent>   -->

    <!-- <UIComponent/> -->
    <BasicGUIComponent/>
</div>
</template>

<script>
import * as THREE from 'three';
import StatsComponent from './StatsComponent.vue';
import BasicGUIComponent from './BasicGUIComponent.vue';
import ThreeComponent from './ThreeComponent.vue';

export default {
  components: {
    StatsComponent,
    ThreeComponent,
    BasicGUIComponent,
  },

  provide: function() {
    return {  }
  },

  data () {
    return {  }
  },

  computed: {  },

  created: function() {  },

  mounted: function () {  },

  methods: {

    deletePressed: function(event) {
      this.$store.dispatch('objects/deleteSelected');
    },

  }
}
</script>

<style scoped>
  canvas { width: 100%; height: 100% }
</style>