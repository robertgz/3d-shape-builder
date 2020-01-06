import { mapGetters, mapMutations } from 'vuex'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default {
// To access use prefix: this.$options
  orbitControl: null,

  data () {
    return {    }
  },

  computed: {
    ...mapGetters('scene', {
      scene: 'getScene',
      renderer: 'getRenderer',
      camera: 'getCamera',
    }),
    
    ...mapGetters('controls', {
      isOrbitControlActive: 'isOrbitControlActive',
    }),
  },

  watch: {
    'isOrbitControlActive': function (newActiveStatus, oldActiveStatus) {

      this.orbitControl.enabled = newActiveStatus;

    },
  },
  
  created: function () {

    this.orbitControl = new OrbitControls( 
      this.camera,
      this.renderer.domElement
    );

    this.orbitControl.zoomSpeed = 1

    this.orbitControl.mouseButtons = {
      LEFT: 0,
      MIDDLE: 1,
      RIGHT: 2
    };
    
  },

  methods: {  },

  render() {  },

}