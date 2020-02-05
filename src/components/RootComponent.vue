<template>
  <div 
    v-on:keyup.delete="deletePressed" 
    ref="rootElement"
  >  

    <ThreeComponent />
    <ToolsUI/>
    <PropertiesUI/>
    <AddObjectsToolbar/>

  </div>
</template>

<script>
import ThreeComponent from './ThreeComponent.vue';
import ToolsUI from './ToolsUI.vue';
import PropertiesUI from './PropertiesUI.vue';
import AddObjectsToolbar from './AddObjectsToolbar.vue';

export default {
  components: {
    ThreeComponent,
    ToolsUI,
    PropertiesUI,
    AddObjectsToolbar,
  },

  provide: function() {  
    return {
      rootElement: this.getRootElement,
    }
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

    getRootElement () {

      return this.$refs.rootElement;

    },

  }
}
</script>

<style scoped>
</style>