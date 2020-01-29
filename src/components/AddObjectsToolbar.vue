<template>

    <v-footer
      style="border-radius: 10px; left: 125px; mb-12"
      width="400" absolute color=" pink darken-2 "
      class="toolbar"
    >

        <v-row class="" justify="space-between">
          <v-col v-for="shape of shapes" cols="auto">
            <v-card 
              outlined
              class="text-center pa-1 toolBtn"
              v-bind:draggable="true"
              v-bind:data-shapetype="shape.type"
              v-on:dragstart="startDrag($event)"              
              v-on:dragend="endDrag($event)"
              v-on:dblclick.capture="doubleClick($event, shape.type)"
            > 

              <div class="subtitle-2 text-capitalize">{{shape.type}}</div>
              
              <v-img src="http://via.placeholder.com/50x50"></v-img>
            </v-card>
          </v-col>
        </v-row>

    </v-footer>
  
</template>

<script>
import * as THREE from 'three';
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {

  data: () => ({
    shapes: [ // get these from store
      { 
        type: "box",
      },
      { 
        type: "cylinder",
      },
      { 
        type: "cone",
      },
      { 
        type: "sphere",
      },
    ],
    dragGroup: null,
    transformControlStatus: false,
  }),

  inject: { rootElement: 'rootElement' },

  computed: {
    ...mapGetters('scene', {
      scene: 'getScene',
      helpersNode: 'getHelpersNode',
      getRendererElement: 'getRendererElement',
    }),
    ...mapGetters('select', {
      getSelected: 'getSelected',
    }),
    ...mapGetters('controls', {
      isTransformControlActive: 'isTransformControlActive',
    }),
  },

  mounted: function () { 
    this.getRendererElement.addEventListener('dragover', this.dragOver, false);
    this.rootElement().addEventListener('keydown', this.key, false);

  },

  methods: {
    startDrag(event) {
      let shapetype = event.target.dataset.shapetype;

      event.dataTransfer.setData( "text/plain", "shapetype:" + shapetype );
      event.dataTransfer.effectAllowed = "copy";
      event.dataTransfer.setDragImage(document.createElement('img'), 0, 0);

      this.add3DSolid( { type: shapetype } );
      let selectedId = this.getSelected[0];
      let selectedObject = this.scene.getObjectById(selectedId);

      this.dragGroup = new THREE.Group();
      this.dragGroup.add(selectedObject);
      this.helpersNode.add(this.dragGroup);
      this.dragGroup.visible = false;

      this.transformControlStatus = this.isTransformControlActive;
      this.setTransformControlActiveStatus( { status: false } );

    },

    dragOver(event){
      event.preventDefault(); // Do NOT remove!

      if ( this.dragGroup && !this.dragGroup.visible ) {
        this.dragGroup.visible = true;
      }

      let xyCoord = this.getPointerLocationXYZ( this.computeXYCoords( event.clientX, event.clientY ) );
      this.dragGroup.position = new THREE.Vector3(xyCoord.x, xyCoord.y, 0.0);

    },

    endDrag(event){
      console.log("event.dataTransfer.dropEffect", event.dataTransfer.dropEffect);
      
      let newObject = this.dragGroup.children[0];

      if (event.dataTransfer.dropEffect === "copy") {   
        this.scene.attach(newObject);
        this.updateObjectPropertyFromGraph( { object: newObject } );      
      } else if (event.dataTransfer.dropEffect === "none") {
        this.dragGroup.remove(newObject);
        this.clearSelection();
      }

      this.helpersNode.remove(this.dragGroup);
      this.dragGroup = null;
      this.setTransformControlActiveStatus( { status: this.transformControlStatus } );

    },

    doubleClick(event, type) {
      this.add3DSolid( { type: type } );
    },

    getPointerLocationXYZ ( { x, y } ){
      
      let camera = this.$store.getters['scene/getCamera'];
      var vec = new THREE.Vector3();
      var pos = new THREE.Vector3();

      vec.set(x, y, 0.5);

      vec.unproject( camera );
      vec.sub( camera.position ).normalize();
      var distance = - camera.position.z / vec.z;
      pos.copy( camera.position ).add( vec.multiplyScalar( distance ) );

      return { 
        x: pos.x, 
        y: pos.y 
      };
    },

    computeXYCoords( x, y ) {

      return { 
        x:   ( x / window.innerWidth )  * 2 - 1,
        y: - ( y / window.innerHeight ) * 2 + 1,
      };

    },

    ...mapActions('objects', {
      add3DSolid: 'add3DSolid',
    }),
    ...mapActions('select', {
      updateSelectedCentroid: 'updateSelectedCentroid',
    }),
    ...mapMutations('select', {
      clearSelection: 'clearSelection',
    }),
    ...mapMutations('controls', {
      setTransformControlActiveStatus: 'setTransformControlActiveStatus',
    }),
    ...mapMutations('objects', {
      updateObjectPropertyFromGraph: 'updateObjectPropertyFromGraph',
    }),
  },

}
</script>

<style scoped>
  .toolbar { 
    opacity: 0.8;
  }
  .toolBtn {
    opacity: 1;
  }
</style>