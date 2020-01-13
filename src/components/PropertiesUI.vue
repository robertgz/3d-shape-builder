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
      <v-expansion-panel :disabled="isTransformDisabled">
        <v-expansion-panel-header>
          Position
        </v-expansion-panel-header>
        <v-expansion-panel-content>

          <v-row v-for="position in positions" v-bind:key="position.key">
            <v-col class=" py-0">
              <v-text-field 
                @input="updatePosition({ value: $event, on: position.axis})"
                :value="getPositionFromAxis(position.axis)"
                :label="position.label"
                :disabled="isTransformDisabled"
                :step="stepAmount"
                type="number"
                class="white" 
              ></v-text-field>     
            </v-col>
          </v-row>

        </v-expansion-panel-content>
      </v-expansion-panel>
    
      <v-expansion-panel>
        <v-expansion-panel-header>Rotation</v-expansion-panel-header>
        <v-expansion-panel-content>
        </v-expansion-panel-content>
      </v-expansion-panel>
    
      <v-expansion-panel>
        <v-expansion-panel-header>Scale</v-expansion-panel-header>
        <v-expansion-panel-content>
        </v-expansion-panel-content>
      </v-expansion-panel>

    </v-expansion-panels>
    </v-container>

    </v-navigation-drawer>
  </v-content>

</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  data: function () {
    return {
      drawer: true,
      stepAmount: 0.125,
      decimalPlaces: 3,
      positions: [
        { axis: 'x', label: 'X', key: 1 },
        { axis: 'y', label: 'Y', key: 2 },
        { axis: 'z', label: 'Z', key: 3 },
      ]
    }
  },

  computed: {
    ...mapGetters('objects', {
      getObjectPositionByID: 'getObjectPositionByID',
    }), 
    ...mapGetters('select', {
      getSelected: 'getSelected',
    }), 
    isTransformDisabled() {
      return ( this.getSelected.length !== 1 );
    },
  
  },

  methods: {
    ...mapActions('objects', {
      setObjectPosition: 'setObjectPosition',
    }),

    getPositionFromAxis(axis) {

      if ( !this.isTransformDisabled && axis) {
        let amount = this.getObjectPositionByID(this.getSelected[0])[axis];
        return parseFloat(amount).toFixed(this.decimalPlaces);
      } else {
        return '';
      }
    },

    updatePosition(event) {

      if ( !this.isTransformDisabled ) {

         let options = {
             id: this.getSelected[0],
             axis: event.on,
             amount: parseFloat(event.value),
          };

          this.setObjectPosition(options);
      }

    },

  },
}

</script>

<style scoped>
</style>