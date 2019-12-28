<template>
</template>

<script>
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default {
  props: { 
    object: {
      type: Object,
      required: true
    },
    renderer: Object,
    properties: Object,
  },

  data () {
    return {
      orbitControl: null,
    }
  },
  
  mounted: function () {
    this.orbitControl = new OrbitControls( this.object, this.renderer.domElement );
    
    this.orbitControl.mouseButtons = {
      LEFT: 0,
      MIDDLE: 1,
      RIGHT: 2
    };

    this.updateProperties();
  },

  methods: {
    updateProperties: function() {
      for (const property in this.properties) {
        this.orbitControl[property] = this.properties[property];
      }
    }
  },
}
</script>

<style scoped>
</style>