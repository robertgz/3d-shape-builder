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
    },

  },

  render() {
    return;
  },
}