import * as THREE from 'three';

function doRayCasting( mouse, camera, scene ) {

  data.raycaster.setFromCamera( mouse, camera );
  data.raycaster.params.Line.threshold = 0.1;

  return data.raycaster.intersectObjects( scene.children, true );

};

function getCentroid( objectIdList ) {

  if (objectIdList.length < 1) { return undefined; };

  let count = objectIdList.length;
  let sums = { x: 0, y: 0, z: 0 };
  let pos = new THREE.Vector3( );

  objectIdList.forEach( objectId => {
    pos = data.selected.get(objectId).getWorldPosition( pos );

    sums.x += parseFloat(pos.x);
    sums.y += parseFloat(pos.y);
    sums.z += parseFloat(pos.z);
  });

  let centroid = {
    x: sums.x/count, 
    y: sums.y/count, 
    z: sums.z/count 
  };

  return centroid;
};

const data = {
  raycaster: new THREE.Raycaster(),
  mouseUnwatch: null,
  selected: new Map(), // format { id: Object3D }
};

const selection = {
  namespaced: true,
  modules: {},

  state: {
    selectedArr: [],
    selectionActive: false,
    selectionCentroid: { x: 0, y: 0, z: 0 },
  },

  getters: {
    getSelectionStatus(state) {
      return state.selectionActive;
    },

    getSelected(state) {
      // console.log('state/getSelected', state.selectedArr);
      return state.selectedArr; // list of object IDs
    },

    getSelectionCentroid(state) {
      return state.selectionCentroid;
    },
  },

  actions: {
    setup(context, payload) {},

    mouseClicked(context, payload) {
      if (context.rootGetters['select/getSelectionStatus']) {
        context.dispatch('select', payload);
        
        context.dispatch('updateSelectedCentroid');
      }
    },

    updateSelectedCentroid(context) {
      let selected = context.rootGetters['select/getSelected'];
      
      if (selected.length < 1) {
        return;
      }
      
      let centroid = getCentroid(selected);

      if (centroid) {

        context.commit(
          'select/setSelectedCentroid',
          { centroid: centroid },
          { root: true }
        );

      }
    },

    select(context, { mouse, ctrlKey, shiftKey }) {

      let toggleSelection = ctrlKey || shiftKey;

      let intersectedObjects = doRayCasting(
        new THREE.Vector2( mouse.x, mouse.y ),
        context.rootGetters['scene/getCamera'],
        context.rootGetters['scene/getScene'],
      );

      if ( !toggleSelection ) {
        context.commit('clearSelection');
      }

      if (intersectedObjects.length > 0) {

        // context.commit('addToSelection', {
        //   object: intersectedObjects[ 0 ].object.parent,
        // });

        context.commit('updateSelection', {
          object: intersectedObjects[ 0 ].object.parent,
          toggle: toggleSelection,
        });

      }

    },

    selectMultipleByIds(context, { selected }) {
      let scene = context.rootGetters['scene/getScene'];

      // console.log('selectedArr', selected);

      context.commit('clearSelection');

      selected.forEach( selectedId => {
        // console.log('selectMultiple.selectedObject', selectedId);

        let selectedObject = scene.getObjectById(selectedId);

        // console.log('selectMultiple.selectedObject', selectedObject);

        context.commit('addToSelection', {
          object: selectedObject,
        });
      });

      context.dispatch('updateSelectedCentroid');

    },

    enableSelect(context) {
      // console.log('enableSelect');

      context.state.selectionActive = true;
      // context.dispatch('mouse/enableListening', null, { root: true });

      // data.mouseUnwatch = this.watch(function () {
      //     return context.rootGetters['mouse/location'];
      //   }, 
      //   function (newVal, oldVal) {
      //     context.dispatch('doRayCasting');
      //   },
      //   { deep: true }
      // );

    },

    disableSelect(context) {
      // console.log('disableSelect');

      context.state.selectionActive = false;
      // context.dispatch('mouse/disableListening', null, { root: true });

      // if ( context.state.mouseUnwatch ) {
      //   data.mouseUnwatch(); 
      // }

    },

  },

  mutations: {

    updateSelection(state, { object, toggle }) {
      let visibleStatus = object.getObjectByName('selected').visible;

      if (toggle) {
        visibleStatus = !visibleStatus;
      } else {
        visibleStatus = true;
      }
      object.getObjectByName('selected').visible = visibleStatus;

      if (visibleStatus) {
        data.selected.set(object.id, object);
      } else {
        data.selected.delete(object.id);
      }

      state.selectedArr = Array.from(data.selected.keys());

    },

    addToSelection(state, { object }) {
      object.getObjectByName('selected').visible = true;

      data.selected.set(object.id, object);
      state.selectedArr = Array.from(data.selected.keys());

    },

    removeFromSelection(state, { object }) {

      object.getObjectByName('selected').visible = false;

      data.selected.delete(object.id);
      state.selectedArr = Array.from(data.selected.keys());

    },

    clearSelection(state) {

      data.selected.forEach(object => {
        object.getObjectByName('selected').visible = false;
      });

      data.selected.clear();

      state.selectedArr = [];

    },

    setSelectedCentroid(state, payload) {
      
      state.selectionCentroid = payload.centroid;

    },

  },
};

export default selection;