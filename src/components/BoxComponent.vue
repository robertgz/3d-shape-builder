<template>
</template>

<script>
import { BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

export default {
  props: { 
    parentObject: Object,
    width: {
      type: Number,
      default: 1     
    },
    height: {
      type: Number,
      default: 1     
    },
    depth: {
      type: Number,
      default: 1     
    },
    color: {
      type: Number,
      default: 0x555555
    },
  },

  data () {
    return {
      geometry: null,
      material: null,
      box: null,
    }
  },

  methods: {
    init: function() {
      this.geometry = new BoxGeometry( this.width, this.height, this.depth );
      this.material = new MeshBasicMaterial( { color: this.color } );
      this.box = new Mesh( this.geometry, this.material );
      this.parentObject.add( this.box );
    }
  },
  
  mounted: function () {
    this.init();
  },
}
</script>

<style scoped>
</style>