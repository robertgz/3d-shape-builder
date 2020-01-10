<template>
  <div>
    <button      
      v-on:click="toggle" 
      class="pure-button panelBtn"
    >
      Transform: {{ transformButtonStatus }}
    </button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  components: {  },

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

  methods: {
    toggle (event) {
     
      this.setTransformControlStatus({ 
        status: !this.isTransformControlActive
      });

    },

    ...mapMutations('controls', {
      setTransformControlStatus: 'setTransformControlActiveStatus',
    }),

   },

}
</script>

<style scoped>
  .panelBtn {
    width: 100%;
  }
</style>
