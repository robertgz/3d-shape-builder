import * as THREE from 'three';
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  data: function () {
    return {
      grid: {
        size: 10,
        divisions: 10,
      },
      gridHelper: null,
    }
  },
  
  computed: {
    ...mapGetters('scene', {
      scene: 'getScene',
      helpersNode: 'getHelpersNode',
    }),
  },

  mounted: function () {
    this.createGrid();
  },

  methods: {
    createGrid() {
      this.gridHelper = new THREE.GridHelper( this.size, this.divisions );
      this.gridHelper.rotateX(Math.PI / 2.0);
      this.helpersNode.add( this.gridHelper );
      // In Three 113.2 GridHelper shows two errors with Chrome Version 82.0.4051.0 (Official Build) canary (32-bit) are seen,
      //    but not in Firefox, nor Chrome 80
      // EXT_frag_depth, EXT_shader_texture_lod extensions not supported.
    },

  },

  render() {
    return;
  },
}