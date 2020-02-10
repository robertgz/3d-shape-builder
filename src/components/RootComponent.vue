<template>
  <v-content  
    v-on:keyup.native.delete="deletePressed" 
    ref="rootElement"
    id="rootComponent"
  >

    <ThreeComponent />
    <ToolsUI/>
    <PropertiesUI/>
    <AddObjectsToolbar/>

  </v-content>
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
      // rootElement: this.getRootElement,
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

    // getRootElement () {
    //   return this.$refs.rootElement;
    // },

  }
}
</script>

<style scoped>
</style>