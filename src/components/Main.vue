<template>
  <div>
    <SceneRoot></SceneRoot>
  </div>
</template>

<script>
import SceneRoot from './SceneRoot.vue';

export default {
  components: {
      SceneRoot,
  },
  data () {
    return {
      message: ''
    }
  },
}
</script>

<style scoped>
</style>