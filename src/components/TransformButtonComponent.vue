<template>
  <TransformControlsComponent 
    v-slot:default="{ status, toggle }"
  >
    <button      
      v-on:click="toggle" 
      class="pure-button panelBtn"
    >
      Transform: {{ transformButtonStatus }}
    </button>
  </TransformControlsComponent>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import TransformControlsComponent from './TransformControlsComponent.js';

export default {
  components: {
    TransformControlsComponent,
  },

  props: {  },

  data: function () {
    return {    }
  },

  computed: {
    ...mapGetters('controls', {
      isTransformControlActive: 'isTransformControlActive',
    }),    
    
    transformButtonStatus () {
      if (this.isTransformControlActive) {
        return 'on'
      } else {
        return 'off';
      }
    },

  },

  methods: { },

}
</script>

<style scoped>
  .panelBtn {
    width: 100%;
  }
</style>
