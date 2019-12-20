<template>
  <div>
    <button v-on:click="addBox" class="btn1">
      Add box to scene
    </button>

    <select class="sel1" v-model="selected">
      <option disabled value="">-choose a mesh-</option>
      <option v-for="item in meshIds" v-bind:key="item" v-bind:value="item">
        {{ item }}
      </option >
    </select>

    <button v-on:click="deleteMesh" class="btn2">
      Delete from scene
    </button>
    
    <button v-on:click="getBoxSize" class="btn3">
      Log box size
    </button>

  </div>
</template>

<script>

export default {
  inject: { util: 'util', getScene: 'getScene' },

  props: {
  },

  data () {
    return {
      selected: '',
    }
  },

  computed: {
    meshIds () {
      return this.$store.getters.getMeshIds;
    }
  },


  watch: {
  },

  created: function () {
  },

  mounted: function () {
  },

  methods: {
    addBox: function (event) {
      this.util.createBoxDefault( this.getScene(), this.$store);
    },
    deleteMesh: function (event) {
      this.util.deleteMesh( this.getScene(), this.$store, this.selected);
    },
    getBoxSize: function (event) {
      let size = this.$store.getters.getMeshSizeByID( this.selected );
      console.log('size: ');
      console.log(size);
    },
  },
}
</script>

<style scoped>
  .btn1, .sel1, .btn2, .btn3 {
    position: absolute;
    width: 150px;
    height: 30px;
  }

  .btn1 {    
    left: 200px;
    top: 20px;
  }

  .btn2 {    
    left: 200px;
    top: 60px;
  }

  .btn3 {    
    left: 200px;
    top: 100px;
  }
  
  .sel1 {
    width: 150px;
    height: 30px;
    left: 400px;
    top: 20px;
  }
</style>