<template>
  <div>  </div>
</template>

<script>
import Stats from 'three/examples/jsm/libs/stats.module';

export default {
  props: { 
    parentNodeSelector: String,
    panel: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      stats: null,
      sceneRootNode: null,
    }
  },

  methods: {
    init: function() {
      this.stats = new Stats();
      this.stats.showPanel(this.panel);

      this.sceneRootNode = document.querySelector(this.parentNodeSelector)
      this.sceneRootNode.appendChild( this.stats.dom );
    },
    update: function () {
      this.stats.update();
      requestAnimationFrame( this.update );
    }
  },
  
  mounted: function () {
    this.init();
    this.update();
  },
}
</script>

<style scoped>
</style>