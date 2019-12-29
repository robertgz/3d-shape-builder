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

    getMeshIds: (state) => {
      return Object.keys(state.meshObjs);
    },

    getMeshDataByID: (state) => (id) => {
      return state.meshObjs[id];
    },

    getMeshSizeByID: (state) => (id) => {
      return { ...state.meshObjs[id].scale };
    },

    getMeshPositionByID: (state) => (id) => {
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

    addMesh(context, payload) {

      let geometry = null;
      if (payload.geometry) {
        geometry = payload.geometry;
      } else {
        geometry = new THREE.BoxGeometry( 1, 1, 1 );
      }

      let material = new MeshBasicMaterial( { color: context.state.defaultColor } );
      let mesh = new Mesh( geometry, material );

      context.commit(
        'scene/addToScene', 
        { object: mesh }, 
        { root: true }
      );

      context.commit('addMeshObj', {
        mesh: mesh,
        id: mesh.id, // needed to use as key name, added
        type: 'box', //payload.type
      });

    },

    deleteMesh( context, payload ) {
      let id = parseInt( payload.id, 10 );

      let scene = context.rootGetters['scene/getScene'];
      let meshObject = scene.getObjectById( id );

      scene.remove( meshObject );    
      // meshObject.dispose();
    
      context.commit('deleteMeshObj', { id: id });
    },

    setMeshPosition( context, payload ) {
      let scene = context.rootGetters['scene/getScene'];
      let meshObject = scene.getObjectById( parseInt( payload.id, 10 ) );

      if (payload.axis === 'x') {
        meshObject.position.setX(payload.amount);
      } else if (payload.axis === 'y') {
        meshObject.position.setY(payload.amount);
      } else if (payload.axis === 'z') {
        meshObject.position.setZ(payload.amount);
      }

      context.commit('setMeshObjPosition', {
        id: payload.id,
        axis: payload.axis,
        amount: payload.amount,
      });
    },
  },

  mutations: {
    addMeshObj(state, payload) {

      Vue.set(state.meshObjs, payload.id, { // payload.mesh.id does not work, not sure why?
        type: payload.type,
        position: {...payload.mesh.position},
        scale: {...payload.mesh.scale},
        color: payload.mesh.material.color.getHexString(),
      });

    },

    setMeshObjPosition(state, payload) {  
      state.meshObjs[payload.id].position[payload.axis] = parseInt( payload.amount, 10 );
      // state.meshObjs[payload.id].scale[payload.axis] = parseInt( payload.amount, 10 );
    },

    deleteMeshObj(state, payload) {
      Vue.delete(state.meshObjs, payload.id);
    },

  },

}

export default objects;