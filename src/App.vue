<template>
  <v-app>
    <TheThreeRoot />
    <TheUIRoot />
  </v-app>
</template>

<script>
import TheThreeRoot from './components/TheThreeRoot.vue';
import TheUIRoot from './components/TheUIRoot.vue';

export default {
  name: 'App',

  components: {
    TheThreeRoot,
    TheUIRoot,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
  html {
    overflow-y: auto !important;
  }
</style>