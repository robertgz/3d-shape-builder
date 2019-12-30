<template>
  <div>
    <div id="mPanel">
      <div>
        <button 
          v-on:click="addBox" 
          class="pure-button panelBtn">
           Add box
        </button>        
      </div>

      <div class="" id="">
        <label for="meshSelect">choose a mesh:</label>
        <select name="abc" size="5" class="" id="meshSelect" v-model="selected">
          <option v-for="item in meshIds" v-bind:key="item" v-bind:value="item">
            {{ item }}
          </option >
        </select>
      </div>

      <button 
        v-on:click="getMeshSize" 
        class="pure-button panelBtn">
         Log size
      </button>      

      <button 
        v-on:click="getMeshPosition" 
        class="pure-button panelBtn">
         Log position
      </button>      

      <button 
        v-on:click="deleteMesh" 
        class="pure-button panelBtn">
         Delete
      </button>

      <button 
        v-on:click="selectOn" 
        class="pure-button panelBtn">
         Select:on
      </button>

      <button 
        v-on:click="selectOff" 
        class="pure-button panelBtn">
         Select:off
      </button>
    </div>


    <div id="sPanel">
      <div>Location</div>
      <div class="axis-holder">
        <label for="xPos" class="axis">X</label>
        <input v-model="x_position" type=number id="xPos" name="x" class="axis">
      </div>      

      <div class="axis-holder">
        <label for="yPos" class="axis">Y</label>
        <input type=number id="yPos" name="y" class="axis">  
      </div>

      <div class="axis-holder">
        <label for="zPos" class="axis">Z</label>
        <input type=number id="zPos" name="z" class="axis">  
      </div>             
    </div>

  </div>
</template>

<script>

export default {
  // inject: { util: 'util', getScene: 'getScene' },

  props: {
  },

  data () {
    return {
    }
  },

  computed: {
    oneSelected () {

      if (this.selected.length === 1) {
        return true;
      } else {
        return false;
      }

    },
    
    isDisabled (){
      
      if (this.oneSelected) {
        return false;
      } else {
        return true;
      }

    },

    meshIds () {
      return this.$store.getters['objects/getMeshIds'];
    },
    xPosition () {
      return this.$store.getters['objects/getMeshSizeByID']( this.selected ).x;
    },

    selected: {
      get() {
        let selected = this.$store.getters['select/getSelected']
        // console.log('selected_get', selected);

        if (selected.length > 0) {
          return Array.from(selected);
        } else {
          return [];
        }
      },

      set(newSelected) {
        // console.log('selected_set.newSelected', newSelected);

        this.$store.dispatch('select/selectMultipleByIds', {
          selected: newSelected
        });

      },      
    },

    x_position: {
      get() {
        if ( this.selected ) {         
          return this.$store.getters['objects/getMeshSizeByID']( this.selected ).x;
        }

        return '';
      },
      set (value) {
        if ( this.selected ) {
          let options = {
             id: this.selected,
             axis: 'x',
             amount: value,
          };

          this.$store.dispatch('objects/setMeshPosition', options);
        }

      }
    },
  },


  watch: {
  },

  created: function () {
  },

  mounted: function () {
  },

  methods: {
    addBox: function (event) {
      this.$store.dispatch('objects/addBox');
    },

    deleteMesh: function (event) {

      this.$store.dispatch('objects/deleteMesh', { id: this.selected });

      this.selected = '';
    },

    getMeshSize: function (event) {
      if ( this.selected ) {
        let size = this.$store.getters['objects/getMeshSizeByID']( this.selected );
        console.log('size: ', size);
      }
    },

    getMeshPosition: function (event) {
      if ( this.selected ) {
        let size = this.$store.getters['objects/getMeshPositionByID']( this.selected );
        console.log('size: ', size);
      }
    },

    selectOn: function (event) {
      this.$store.dispatch('select/enableSelect');
    },

    selectOff: function (event) {
      this.$store.dispatch('select/disableSelect');
    },
    
  },
}
</script>

<style scoped>
  .btn1, .sel1, .btn2, .btn3 {
    position: absolute;
    /* width: 150px; */
    /* height: 30px; */
  }

  .btn1 {
    position: absolute;
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
  
  .button-warning {
    background: rgb(223, 117, 20); /* this is an orange */
  }

  .button-secondary {
      color: white;
      /* border-radius: 4px; */
      /* text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2); */
      background: rgb(66, 184, 221); /* this is a light blue */
  }

  /* .sel1 { */
  #meshSelect {
    /* z-index: 2; */
    width: 100%;
    /* height: 100px; */
    /* left: 400px; */
    /* top: 20px; */
    /* background-color: #122c82; */
  }

  /* #myContainer {
   position: relative; 
  } */

  #mPanel {
    position: absolute;
    z-index: 1;
    padding: 6px;
    top: 60px;
    left: 20px;
    width: 150px;
    height: 340px;
    background-color: #cfc;
  }

  #sPanel {
    position: absolute;
    z-index: 1;
    padding: 15px 6px 15px 6px;
    top: 420px;
    left: 20px;
    width: 150px;
    /* height: 150px; */
    background-color: #f0ffcc;  
  }

  input.axis {
    /* display: inline; */
    width: 100px;
  }
  
  .axis-holder {
    display: block;
  }

  .panelBtn {
    width: 100%;
  }
</style>