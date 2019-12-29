import * as THREE from 'three';

const data = {
  raycaster: new THREE.Raycaster(),
  mouseUnwatch: null,
  selected: new Map(), // format { id: Object3D }
};

const selection = {
  namespaced: true,
  modules: {},

  state: {
    raycaster: new THREE.Raycaster(),
    selectedSet: new Set(),
    selectionActive: false,
    mouseUnwatch: null,
  },

  getters: {
    getSelectionStatus(state) {
      return state.selectionActive;
    },
  },

  actions: {
    
    doRayCasting(context, payload) {
      let camera = context.rootGetters['scene/getCamera'];
      let scene = context.rootGetters['scene/getScene'];
      let mouse = context.rootGetters['mouse/locationVector'];

      context.state.raycaster.setFromCamera( mouse, camera );
      
      let intersects = context.state.raycaster.intersectObjects( scene.children );

      for ( var i = 0; i < intersects.length; i++ ) {
        intersects[ i ].object.material.color.set( 0x00ff00 );
        // console.log('intersected object.id: ', intersects[ i ].object.id);
      }

      if (intersects.length > 0) {
        context.state.selectedSet.add(intersects[ 0 ].object.id);
      } else if (intersects.length === 0) {
        context.state.selectedSet.clear();
      }
      console.log('context.state.selectedSet', context.state.selectedSet);
    },

    enableSelect(context) {
      // console.log('enableSelect');

      context.state.selectionActive = true;
      context.dispatch('mouse/enableListening', null, { root: true });

      context.state.mouseUnwatch = this.watch(function () {
        return context.rootGetters['mouse/location'];
      }, 
      function (newVal, oldVal) {
        context.dispatch('doRayCasting');
      },
        { deep: true }
      );
    },

    disableSelect(context) {
      // console.log('disableSelect');

      context.state.selectionActive = false;
      context.dispatch('mouse/disableListening', null, { root: true });

      if ( context.state.mouseUnwatch ) {
        context.state.mouseUnwatch(); 
      }
    },

  },

  mutations: {
  },
};

export default selection;