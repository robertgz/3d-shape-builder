import * as THREE from 'three';

function doRayCasting( mouse, camera, scene ) {

  data.raycaster.setFromCamera( mouse, camera );
  data.raycaster.linePrecision = 0.1;

  return data.raycaster.intersectObjects( scene.children, true );

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
  },

  getters: {
    getSelectionStatus(state) {
      return state.selectionActive;
    },

    getSelected(state) {
      // console.log('state/getSelected', state.selectedArr);
      return state.selectedArr;
    },
  },

  actions: {
    setup(context, payload) {},

    mouseClicked(context, payload) {
      if (context.rootGetters['select/getSelectionStatus']) {
        context.dispatch('select', payload);
      }
    },

    // doRayCasting(context) {

    //   let camera = context.rootGetters['scene/getCamera'];
    //   let scene = context.rootGetters['scene/getScene'];
    //   let mouse = context.rootGetters['mouse/locationVector'];

    //   data.raycaster.setFromCamera( mouse, camera );
    //   data.raycaster.linePrecision = 0.1;

    //   let intersects = data.raycaster.intersectObjects( scene.children, true );

    //   context.dispatch('doSelecting', {
    //     intersectedObjects: intersects
    //   });
      
    // },

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

  },
};

export default selection;