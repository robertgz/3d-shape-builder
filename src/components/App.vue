<template>
  <div>
    <RootComponent></RootComponent>
  </div>
</template>

<script>
import RootComponent from './RootComponent.vue';

export default {
  components: {
      RootComponent,
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