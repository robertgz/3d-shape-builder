<template>
  <v-text-field 
    v-bind:label="axis.toUpperCase()"
    v-bind:id="elementID"
    v-bind:value="coordinate"
    v-on:change.native="updateCoord($event.target.value)"
    v-on:blur="[hasFocus = false, updateCoord($event.target.value)]"
    v-on:focus="[hasFocus = true, selectedAfterFocus = false]"
    v-on:keyup.enter="[updateCoord($event.target.value), $event.target.blur()]"
    v-on:keyup.delete.stop
    v-bind:step="stepAmount"
    v-bind:disabled="isDisabled"
    type="number"
    class="white"
  ></v-text-field>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import * as THREE from 'three';

export default {

  props: [ 'transform', 'axis', 'stepAmount', 'blurPrecision', 'focusPrecision', 'elementID', 'isDisabled' ], 

  data: function () {
    return {
      hasFocus: false,
      selectedAfterFocus: false,
     }
  },

  computed: {
    ...mapGetters('objects', {
      getObjectPropertyByID: 'getObjectPropertyByID',
    }),
    ...mapGetters('select', {
      getSelected: 'getSelected',
    }),

    coordinate: {
      get (event) {

        let axis = this.axis;
        let transform = this.transform;

        if ( !this.isDisabled && axis && transform) {

          let amount = parseFloat(
            this.getObjectPropertyByID(this.getSelected[0], transform)[axis]
          );

          if (transform === 'rotation') {
            amount = amount * THREE.Math.RAD2DEG;
          }

          if (!this.hasFocus) {
            return amount.toFixed(this.blurPrecision);
          } else {
            return parseFloat(amount.toFixed(this.focusPrecision));
          }

        } else {
          return '';
        }
      },

      set (newValue) {
        let axis = this.axis;
        let transform = this.transform;

        let value = newValue;

        if (transform === 'rotation') {
          value = newValue * THREE.Math.DEG2RAD;
        }

        let options = {
          id: this.getSelected[0],
          axis: axis,
          transform: transform,
          amount: value,
        };

        this.setObjectProperty(options);
      },

    },    
  },

  methods: {
    ...mapActions('objects', {
      setObjectProperty: 'setObjectProperty',
    }),

    updateCoord(event) {
      this.coordinate = event;          
    },

  },

  updated() {

    if (this.hasFocus && !this.selectedAfterFocus) {
      
      var element = document.getElementById(this.elementID);
      if (element) {
        element.select();
      }
      this.selectedAfterFocus = true;
    }

  },

}
</script>

<style scoped>
</style>