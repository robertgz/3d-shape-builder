<template>
  <div v-on:keyup.delete="deletePressed">  
    <ThreeComponent />
    <UIComponent/>
  </div>
</template>

<script>
import * as THREE from 'three';
import ThreeComponent from './ThreeComponent.vue';
import UIComponent from './UIComponent.vue';

export default {
  components: {
    ThreeComponent,
    UIComponent,
  },

  provide: function() {
    return {  }
  },

  data () {
    return {  }
  },

  computed: {  },

  created: function() { 
    this.setHtmlFullPage();
   },

  mounted: function () {  },

  methods: {

    deletePressed: function(event) {
      this.$store.dispatch('objects/deleteSelected');
    },

    setHtmlFullPage() {
      document.querySelector('html').style.overflowY = "auto";
    },

  }
}
</script>

<style scoped>
  canvas { width: 100%; height: 100% }
</style>