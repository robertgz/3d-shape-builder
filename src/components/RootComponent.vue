<template>
  <div v-on:keyup.delete="deletePressed">  
    <ThreeComponent />
    <!-- <UIComponent/> -->
    <BasicGUIComponent/>
  </div>
</template>

<script>
import * as THREE from 'three';
import BasicGUIComponent from './BasicGUIComponent.vue';
import ThreeComponent from './ThreeComponent.vue';

export default {
  components: {
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