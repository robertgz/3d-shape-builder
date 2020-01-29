import * as THREE from 'three';

export default {
  // To access use prefix: this.$options
  // initialMouseLocation: null,

  mounted: function () {
    // this.$options.initialMouseLocation = new THREE.Vector2();
  },

  methods: {

    computeXYScreenCoords: function( x, y, element ) {

      return { 
        x:   ( x / element.innerWidth )  * 2 - 1,
        y: - ( y / element.innerHeight ) * 2 + 1,
      };

    },

    getXYZLocationFromClient ( x, y, camera ){
      
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

  },

}