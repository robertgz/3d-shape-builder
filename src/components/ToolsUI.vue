<template>

  <v-content>
    <v-navigation-drawer app 
      v-model="drawer"
      floating
      permanent
      width="auto"
      height="auto"
      class="blue lighten-2 ml-2 mt-2"
    >
    <v-container>
      <v-row >
        <v-col>
          <v-btn class="mx-2" fab dark color="green">
            <v-icon large >mdi-plus-thick</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-row >
        <v-col>
          <v-btn class="mx-2" fab dark  color="blue">
            <v-icon large>mdi-arrow-top-left-thick</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-row >
        <v-col>
          <v-btn class="mx-2" fab dark color="blue">
            <v-icon large>mdi-cursor-move</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-row >
        <v-col>
          <v-btn class="mx-2" fab dark color="blue">
            <v-icon large>mdi-rotate-3d-variant</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-row >
        <v-col>
          <v-btn class="mx-2" fab dark color="blue">
            <v-icon large>mdi-resize</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-row >
        <v-col>
          <v-btn class="mx-2" fab dark color="red">
            <v-icon large>mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>

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