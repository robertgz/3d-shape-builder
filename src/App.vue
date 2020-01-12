<template>
  <v-app>
    <RootComponent/>
  </v-app>
</template>

<script>
import RootComponent from './components/RootComponent.vue';

export default {
  name: 'App',

  components: {
    RootComponent,
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