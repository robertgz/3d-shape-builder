<template>
  <div 
    ref="rootElement"
    id="rootComponent"
  >

    <TheThreeRoot />
    <TheUIRoot/>

  </div>
</template>

<script>
import TheThreeRoot from './TheThreeRoot.vue';
import TheUIRoot from './TheUIRoot.vue';

export default {
  components: {
    TheThreeRoot,
    TheUIRoot,
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

    // getRootElement () {
    //   return this.$refs.rootElement;
    // },

  }
}
</script>

<style scoped>
</style>