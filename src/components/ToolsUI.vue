<template>

  <v-content>
    <v-navigation-drawer app 
      v-model="drawer"
      floating
      permanent
      width="auto"
      height="auto"
      class="blue-grey lighten-2 ml-2 mt-2"
      style="border-radius: 10px;"
    >
    <v-container>

      <v-row >
        <v-col>
          <v-btn v-on:click="activateSelect" 
            class="mx-2" 
            fab dark  
            color="blue">
            <v-icon large>mdi-arrow-top-left-thick</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-row >
        <v-col>
          <v-btn v-on:click="activateMove" 
            class="mx-2" 
            fab dark 
            color="blue">
            <v-icon large>mdi-cursor-move</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-row >
        <v-col>
          <v-btn  v-on:click="activateRotate"
            class="mx-2" 
            fab dark 
            color="blue">
            <v-icon large>mdi-rotate-3d-variant</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-row >
        <v-col>
          <v-btn v-on:click="activateScale"
            class="mx-2" 
            fab dark 
            color="blue">
            <v-icon large>mdi-resize</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-row >
        <v-col>
          <v-btn v-on:click="deleteSelected" 
            class="mx-2" 
            fab dark 
            color="red">
            <v-icon large>mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>

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
      selectEnabled: false,
    }
  },

  computed: {
    ...mapGetters('controls', {
      isTransformControlActive: 'isTransformControlActive',
    }), 
  
  },


  methods: {
    ...mapActions('objects', {
      // addBox: 'addBox',
      deleteSelected: 'deleteSelected',
    }),
    ...mapActions('select', {
      enableSelect: 'enableSelect',
      disableSelect: 'disableSelect',
    }),
    ...mapMutations('controls', {
      setTransformControlStatus: 'setTransformControlActiveStatus',
      setTransformStatus: 'setTransformControlActiveStatus',
      setTransformControlMode: 'setTransformControlMode',
    }),

    activateSelect() {
      this.selectEnabled = true;
      this.enableSelect();
      this.setTransformStatus({ status: false });
    },

    activateMove() {
      this.selectEnabled = true;
      this.enableSelect();
      this.setTransformStatus({ status: true });
      this.setTransformControlMode( { mode: "translate" });
    },

    activateRotate() {
      this.selectEnabled = true;
      this.enableSelect();
      this.setTransformStatus({ status: true });
      this.setTransformControlMode( { mode: "rotate" });
    },

    activateScale() {
      this.selectEnabled = true;
      this.enableSelect();
      this.setTransformStatus({ status: true });
      this.setTransformControlMode( { mode: "scale" });
    },

    // toggleSelect: function (event) {

    //   this.selectEnabled = !this.selectEnabled;

    //   if (this.selectEnabled) {
    //     this.enableSelect();
    //   } else {
    //     this.disableSelect();
    //   }

    // },

    // toggleMove (event) {
     
    //   this.setTransformControlStatus({ 
    //     status: !this.isTransformControlActive
    //   });

    // },

    // deleteSelected: function (event) {
    //   this.$store.dispatch('objects/deleteSelected');
    // },
    
  },
}

</script>

<style scoped>
</style>