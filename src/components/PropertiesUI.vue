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
      <v-expansion-panel>
        <v-expansion-panel-header>
          Position
        </v-expansion-panel-header>
        <v-expansion-panel-content>

      <v-row>
        <v-col class=" py-0">
          <v-text-field
            label="X"
            type="number" 
            :step=".25"
            placeholder="0.00"
            class="white" 
          ></v-text-field>     
        </v-col>
      </v-row>

      <v-row>
        <v-col class=" py-0">
          <v-text-field
            label="Y"
            type="number" 
            :step=".25"
            placeholder="0.00"
            class="white" 
          ></v-text-field>     
        </v-col>
      </v-row>

      <v-row>
        <v-col class=" py-0">
          <v-text-field
            label="Z"
            type="number" 
            :step=".25"
            placeholder="0.00"
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
export default {
  data: function () {
    return {
      drawer: true
    }
  },
}

</script>

<style scoped>
</style>