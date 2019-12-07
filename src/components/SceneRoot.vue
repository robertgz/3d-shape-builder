<template>
  <div id="sceneRoot">
  </div>
</template>

<script>
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default {
  data () {
    return {
    }
  },
  methods: {
    // Based on code from: https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene
    init: function() { 
      var sceneRoot = document.querySelector('#sceneRoot');

      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

      var renderer = new THREE.WebGLRenderer();
      renderer.setSize( window.innerWidth, window.innerHeight );
      sceneRoot.appendChild( renderer.domElement );

      var geometry = new THREE.BoxGeometry( 1, 1, 1 );
      var material = new THREE.MeshBasicMaterial( { color: 0x44aa88 } );
      var cube = new THREE.Mesh( geometry, material );
      scene.add( cube );

      camera.position.z = 5;
      
      var stats = new Stats();
      sceneRoot.appendChild( stats.dom );

      var orbitControl = new OrbitControls( camera, renderer.domElement );

      function animate() {
        requestAnimationFrame( animate );

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        
        renderer.render( scene, camera );
        stats.update();
      }
      animate();

    }
  },
    mounted: function () {
    this.init();
  }
}
</script>

<style scoped>
  canvas { width: 100%; height: 100% }
</style>