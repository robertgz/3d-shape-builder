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
    selectedSet: new Set(), // list of Object3D.ids
    selectionActive: false,
  },

  getters: {
    getSelectionStatus(state) {
      return state.selectionActive;
    },
  },

  actions: {
    setup(context, payload) {},

    doRayCasting(context) {

      let camera = context.rootGetters['scene/getCamera'];
      let scene = context.rootGetters['scene/getScene'];
      let mouse = context.rootGetters['mouse/locationVector'];

      data.raycaster.setFromCamera( mouse, camera );
      data.raycaster.linePrecision = 0.1;

      let intersects = data.raycaster.intersectObjects( scene.children, true );

      context.dispatch('doSelecting', {
        intersectedObjects: intersects
      });
      
    },

    doSelecting(context, { intersectedObjects }) {

      if (intersectedObjects.length > 0) {

        context.commit('clearSelection');

        context.commit('addToSelection', {
          object: intersectedObjects[ 0 ].object.parent,
        });

      } else if (intersectedObjects.length === 0) {

        context.commit('clearSelection');

      }

    },

    enableSelect(context) {
      // console.log('enableSelect');

      context.state.selectionActive = true;
      context.dispatch('mouse/enableListening', null, { root: true });

      data.mouseUnwatch = this.watch(function () {
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
        data.mouseUnwatch(); 
      }

    },

  },

  mutations: {

    addToSelection(state, { object }) {
      
      state.selectedSet.add(object.id);

      object.getObjectByName('selected').visible = true;

      data.selected.set(object.id, object);

    },

    removeFromSelection(state, { object }) {

      state.selectedSet.delete(object.id);

      object.getObjectByName('selected').visible = false;

      data.selected.delete(object.id);

    },

    clearSelection(state) {

      state.selectedSet.clear();

      data.selected.forEach(object => {
        object.getObjectByName('selected').visible = false;
      });

      data.selected.clear();

    },

  },
};

export default selection;