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
  computed: {
  },

  data () {
    return {
      orbitControl: null,
    }
  },

  methods: {
    updateProperties: function() {
      for (const property in this.properties) {
        this.orbitControl[property] = this.properties[property];
      }
    }
  },
  
  mounted: function () {
    this.orbitControl = new OrbitControls( this.object, this.renderer.domElement );
    this.updateProperties();
  },
}
</script>

<style scoped>
</style>