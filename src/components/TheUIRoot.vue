<template>
  <v-main  
    ref="rootUIElement"
    id="rootUIComponent"
  >

    <UITools/>
    <UIProperties/>
    <UIAddObjects/>

  </v-main>
</template>

<script>
import UITools from './UITools.vue';
import UIProperties from './UIProperties.vue';
import UIAddObjects from './UIAddObjects.vue';

export default {
  components: {
    UITools,
    UIProperties,
    UIAddObjects,
  },

  data () {
    return {  }
  },

  computed: {  },

  created: function() {  },

  mounted: function () {  },

  methods: { }
}
</script>

<style scoped>
</style>