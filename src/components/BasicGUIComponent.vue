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
        <label for="objectSelect">Select objects:</label>
        <select name="abc" size="5" class="" id="objectSelect" v-model.number="selected" multiple>
          <option v-for="item in objectIds" v-bind:key="item" v-bind:value="item">
            {{ item }}
          </option >
        </select>
      </div>

      <button 
        v-on:click="getObjectSize" 
        class="pure-button panelBtn">
         Log size
      </button>      

      <button 
        v-on:click="getObjectPosition" 
        class="pure-button panelBtn">
         Log position
      </button>      

      <button 
        v-on:click="deleteSelected" 
        class="pure-button panelBtn">
         Delete
      </button>

      <button 
        v-on:click="toggleSelect" 
        class="pure-button panelBtn">
         Select: {{selectButtonStatus}}
      </button>

    </div>


    <div id="sPanel">
      <div>Location</div>

      <div class="axis-holder">
        <label for="xPos" class="axis">X</label>
        <input v-model="x_position" type=number 
          id="xPos" name="x" class="axis"
          :step=stepAmount 
          :disabled=isDisabled>
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
  // inject: { },

  props: {
  },

  data () {
    return {
      stepAmount: 0.25,
      selectEnabled: false,
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

    objectIds () {
      return this.$store.getters['objects/getObjectIds'];
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

    selectButtonStatus () {
      if (this.selectEnabled) {
        return 'on'
      } else {
        return 'off';
      }
    },

    x_position: {
      get() {

        if ( this.oneSelected ) {

          let amount = this.$store.getters['objects/getObjectPositionByID']( this.selected[0] ).x;          
          return parseFloat(amount).toFixed(2);

        } else {

          return undefined;

        }

      },

      set (value) {

        if ( this.oneSelected ) {

          let options = {
             id: this.selected[0],
             axis: 'x',
             amount: value,
          };

          this.$store.dispatch('objects/setObjectPosition', options);
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

    deleteSelected: function (event) {

      this.$store.dispatch('objects/deleteSelected');

    },

    getObjectSize: function (event) {
      if ( this.oneSelected ) {
        let size = this.$store.getters['objects/getObjectSizeByID']( this.selected[0] );
        console.log('size: ', size);
      }
    },

    getObjectPosition: function (event) {
      if ( this.oneSelected ) {
        let size = this.$store.getters['objects/getObjectPositionByID']( this.selected[0] );
        console.log('size: ', size);
      }
    },

    toggleSelect: function (event) {

      this.selectEnabled = !this.selectEnabled;

      if (this.selectEnabled) {
        this.$store.dispatch('select/enableSelect');
      } else {
        this.$store.dispatch('select/disableSelect');
      }

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
  #objectSelect {
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