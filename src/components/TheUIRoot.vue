<template>
  <v-content  
    v-on:keyup.native.delete="deletePressed" 
    ref="rootElement"
    id="rootComponent"
  >

    <UITools/>
    <UIProperties/>
    <UIAddObjects/>

  </v-content>
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

  methods: {

    deletePressed: function(event) {
      this.$store.dispatch('objects/deleteSelected');
    },

  }
}
</script>

<style scoped>
</style>