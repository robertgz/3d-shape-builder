<template>
</template>

<script>
import * as dat from 'dat.gui';

export default {
  props: {
  },

  data () {
    return {
      gui: null,
    }
  },
  
  mounted: function () {
    this.init();
  },

  methods: {
    init: function() {
      this.gui = new dat.GUI();
    }
  },
}
</script>

<style scoped>
</style>