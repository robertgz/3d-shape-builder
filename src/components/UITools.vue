<template>
  <v-container
    fluid
    fill-height
    id="tools-container"
  >
    <v-row
      class="blue-grey ma-2"
      id="tools"      
    >
      <v-col>

        <v-row class="my-2">
          <v-tooltip right>
            <template v-slot:activator="{ on }">  
              <v-btn v-on:click="activateSelect" 
                class="mx-2" 
                fab dark  
                color="blue"
                v-on="on">
                <v-icon large>mdi-arrow-top-left-thick</v-icon>
              </v-btn>
            </template>
            <span>Select</span>
          </v-tooltip>
        </v-row>

        <v-row class="my-2">
          <v-tooltip right>
            <template v-slot:activator="{ on }">  
              <v-btn v-on:click="activateMove" 
                class="mx-2" 
                fab dark 
                color="blue"
                v-on="on">
                <v-icon large>mdi-cursor-move</v-icon>
              </v-btn>
            </template>
            <span>Move</span>
          </v-tooltip>
        </v-row>

        <v-row  class="my-2">
          <v-tooltip right>
            <template v-slot:activator="{ on }">  
              <v-btn  v-on:click="activateRotate"
                class="mx-2" 
                fab dark 
                color="blue"
                v-on="on">
                <v-icon large>mdi-rotate-3d-variant</v-icon>
              </v-btn>
            </template>
            <span>Rotate</span>
          </v-tooltip>
        </v-row>
 
        <v-row class="my-2">
          <v-tooltip right>
            <template v-slot:activator="{ on }">  
              <v-btn v-on:click="activateScale"
                class="mx-2" 
                fab dark 
                color="blue"
                v-on="on">
                <v-icon large>mdi-resize</v-icon>
              </v-btn>
            </template>
            <span>Scale</span>
          </v-tooltip>
        </v-row>

        <v-row class="my-2">
          <v-tooltip right>
            <template v-slot:activator="{ on }">  
              <v-btn v-on:click="deleteSelected" 
                class="mx-2" 
                fab dark 
                color="red"
                v-on="on">
                <v-icon large>mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Delete</span>
          </v-tooltip>
        </v-row>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  data: function () {
    return {
      drawer: true,
      selectEnabled: false,
      tools: [
        {},
      ],
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
#tools {
  border-radius: 10px;
  z-index: 5;
  position: fixed;
}
</style>