<template>
  <div>
    <SceneRoot></SceneRoot>
  </div>
</template>

<script>
import SceneRoot from './SceneRoot.vue';

export default {
  data () {
    return {
      message: 'Main Vue app'
    }
  },
  components: {
      SceneRoot,
  },
}
</script>

<style scoped>
</style>