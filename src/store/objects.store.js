import Vue from 'vue';
import { BoxGeometry, MeshBasicMaterial, Mesh } from 'three';
import * as THREE from 'three';

const materials = {
  default: null,
  selected: null,
};

const objects = {
  namespaced: true,
  state: {
    meshObjs: {},
    defaultColor: 0x808080,
  },

  getters: {

    getObjectIds: (state) => {
      return Object.keys(state.meshObjs);
    },

    getMeshDataByID: (state) => (id) => {
      return state.meshObjs[id];
    },

    getObjectSizeByID: (state) => (id) => {
      return { ...state.meshObjs[id].scale };
    },

    getObjectPositionByID: (state) => (id) => {
      return { ...state.meshObjs[id].position };
    },

  },

  actions: {
    setup(context, payload) {

      materials.default = new THREE.MeshBasicMaterial({
        color: context.state.defaultColor,
        polygonOffset: true,
        polygonOffsetFactor: 1, // positive value pushes polygon further away
        polygonOffsetUnits: 1
      });

      materials.selected = new THREE.LineBasicMaterial({
        color: 0xffffff,
        linewidth: 1,
      });

    },

    addBox(context, payload) {
      let geometry = new THREE.BoxGeometry( 1, 1, 1 );

      context.dispatch('addMesh', { geometry: geometry, type: 'box' });
    },

    addMesh(context, { geometry, type }) {

      if (!geometry) {
        geometry = new THREE.BoxGeometry( 1, 1, 1 );
      }

      if (!type) { type = 'box'; }

      let mesh = new THREE.Mesh( geometry, materials.default );
      mesh.name = 'mesh';

      var edgesGeometry = new THREE.EdgesGeometry( geometry );
      var line = new THREE.LineSegments( edgesGeometry, materials.selected );
      line.name = 'selected';
      line.visible = false;

      let group = new THREE.Group();

      group.add(mesh, line);

      context.commit(
        'scene/addToScene', 
        { object: group },
        { root: true }
      );

      context.commit('addMeshObj', {
        object: group,
        id: group.id, // needed to use as key name, added
        type: type,
      });

    },

    deleteObjectsByIds( context, { ids } ) {
      let scene = context.rootGetters['scene/getScene'];

      ids.forEach(id => {
        let objectId = parseInt( id, 10 );

        let meshObject = scene.getObjectById( objectId );

        scene.remove( meshObject );    
        // meshObject.dispose();
      
        context.commit('deleteMeshObj', { id: id });
      });

    },

    setObjectPosition( context, { id, axis, amount } ) {
      let scene = context.rootGetters['scene/getScene'];
      let meshObject = scene.getObjectById( parseInt( id, 10 ) );

      if (axis === 'x') {
        meshObject.position.setX(amount);
      } else if (axis === 'y') {
        meshObject.position.setY(amount);
      } else if (axis === 'z') {
        meshObject.position.setZ(amount);
      }

      context.commit('setMeshObjPosition', {
        id: id,
        axis: axis,
        amount: amount,
      });
    },
  },

  mutations: {
    addMeshObj(state, { id, object, type }) {

      Vue.set(state.meshObjs, id, { // object.id does not work, not sure why?
        type: type,
        position: {...object.position},
        scale: {...object.scale},
        // color: object.material.color.getHexString(),
      });

    },

    setMeshObjPosition(state, { id, axis, amount }) {
      state.meshObjs[id].position[axis] = parseFloat(amount);

      // state.meshObjs[id].scale[axis] = parseFloat(amount);
    },

    deleteMeshObj(state, { id }) {
      Vue.delete(state.meshObjs, id);
    },

  },

}

export default objects;