import * as THREE from 'three';
import { mapGetters, mapActions } from 'vuex';

export default {
  // To access use prefix: this.$options
  raycaster: null,

  computed: {

    ...mapGetters('scene', {
      canvas: 'getCanvas',
      camera: 'getCamera',
      scene: 'getScene',
    }),

  },

  mounted: function () {
    this.$options.raycaster = new THREE.Raycaster();
  },

  methods: {

    getObjectUnderCoord(coord) {

      this.castRay(coord);
      
      let result = this.getIntersectedObjectList(coord);

      if (result.length > 0) {
        return result[0]
      } else {
        return null;
      }
    },

    getIntersectedObjectList(coord) {

      return this.$options.raycaster.intersectObjects( this.scene.children, true );

    },

    castRay (coord) {

      this.$options.raycaster.setFromCamera(
        new THREE.Vector2( coord.x, coord.y ),
        this.camera 
      );
      this.$options.raycaster.linePrecision = 0.1;

    },
  },

}
