<template>
  <div v-on:keyup.delete="deletePressed">  
    <ThreeComponent />
    <!-- <UIComponent/> -->
    <ToolsUI/>
    <PropertiesUI/>
  </div>
</template>

<script>
import ThreeComponent from './ThreeComponent.vue';
import UIComponent from './UIComponent.vue';
import ToolsUI from './ToolsUI.vue';
import PropertiesUI from './PropertiesUI.vue';

export default {
  components: {
    ThreeComponent,
    UIComponent,
    ToolsUI,
    PropertiesUI,
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
</style>