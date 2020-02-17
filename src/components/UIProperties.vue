<template>
  <div id="properties-container" class="d-flex flex-column justify-top" >
    <div id="properties-toolbar" class="d-flex flex-column teal darken-1 ma-3 pa-1" >
      <div class="ma-2">

        <v-expansion-panels accordion >
          <v-expansion-panel 
            :disabled="isTransformDisabled"
            v-for="transform of transforms"
            :key="transform.id"
          >
            <v-expansion-panel-header class="capitalize">
              {{transform.property}}
            </v-expansion-panel-header>
            <v-expansion-panel-content>

              <v-row v-for="axis in axes" :key="axis.id">
                <v-col class=" py-0">
                  <UIPropertiesCoordinateInput
                    v-bind:transform="transform.property"
                    v-bind:axis="axis.direction"
                    v-bind:stepAmount="stepAmount"
                    v-bind:blurPrecision="2"
                    v-bind:focusPrecision="8"
                    v-bind:elementID="transform.property + '-' + axis.direction"
                    v-bind:isDisabled="isTransformDisabled"
                  ></UIPropertiesCoordinateInput>
                </v-col>
              </v-row>

            </v-expansion-panel-content>        
          </v-expansion-panel>

        </v-expansion-panels>

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

import UIPropertiesCoordinateInput from './UIPropertiesCoordinateInput.vue';

export default {
  components: {
    UIPropertiesCoordinateInput,
  },

  data: function () {
    return {
      drawer: true,
      stepAmount: 0.25,
      decimalPlaces: 3,
      transforms: [
        {
          id: 1,
          property: 'position',
        },
        {
          id: 2,
          property: 'rotation',
        },
        {
          id: 3,
          property: 'scale',
        },
      ],
      axes: [
        {
          id: 1,
          direction: 'x',
        },
        {
          id: 2,
          direction: 'y',
        },
        {
          id: 3,
          direction: 'z',
        },
      ],
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
#properties-container {
  position: fixed;
  z-index: 6;
  right: 0px;
  height: 100%;
  width: 200px;
}
#properties-toolbar {
  border-radius: 10px;
}
.capitalize {
  text-transform: capitalize;
}
</style>