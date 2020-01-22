<template>

  <v-content>
    <v-navigation-drawer app 
      v-model="drawer"
      floating
      permanent
      right
      width="200"
      height="auto"
      class="blue lighten-2 mr-2 mt-2 px-1"
    >
    <v-container>
    <v-expansion-panels accordion >
      <v-expansion-panel 
        :disabled="isTransformDisabled"
        v-for="transform of transforms"
      >
        <v-expansion-panel-header class="capitalize">
          {{transform}}
        </v-expansion-panel-header>
        <v-expansion-panel-content>

          <v-row v-for="axis in axes">
            <v-col class=" py-0">
              <CoordinateInputComponent
                v-bind:transform="transform"
                v-bind:axis="axis"
                v-bind:stepAmount="stepAmount"
                v-bind:blurPrecision="2"
                v-bind:focusPrecision="8"
                v-bind:elementID="transform + '-' + axis"
                v-bind:isDisabled="isTransformDisabled"
              ></CoordinateInputComponent>
            </v-col>
          </v-row>

        </v-expansion-panel-content>        
      </v-expansion-panel>

    </v-expansion-panels>
    </v-container>

    </v-navigation-drawer>
  </v-content>

</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

import CoordinateInputComponent from './CoordinateInputComponent.vue';

export default {
  components: {
    CoordinateInputComponent,
  },

  data: function () {
    return {
      drawer: true,
      stepAmount: 0.25,
      decimalPlaces: 3,
      transforms: [ 'position', 'rotation', 'scale' ],
      axes: ['x', 'y', 'z'],
    }
  },

  computed: {
    ...mapGetters('select', {
      getSelected: 'getSelected',
    }), 
    isTransformDisabled() {
      return ( this.getSelected.length !== 1 );
    },
  
  },

  methods: {
  },
}

</script>

<style scoped>
.capitalize {
  text-transform: capitalize;
}
</style>