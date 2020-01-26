import Vue from 'vue';
import { BoxGeometry, MeshBasicMaterial, Mesh } from 'three';
import * as THREE from 'three';

const materials = {
  default: null,
  selected: null,
};
const transformTypes = ['position', 'rotation', 'scale'];
const axisTypes = ['x', 'y', 'z'];

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

    getObjectPropertyByID: (state) => (id, transform) => {
      
      if ( transformTypes.includes(transform) ) {
        return { ...state.meshObjs[id][transform] };
      }

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

      context.commit(
        'select/clearSelection', 
        null,
        { root: true }
      );

      context.commit(
        'select/addToSelection',
        { object: group, },
        { root: true }
      );

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

    deleteSelected(context) {
      let selected = context.rootGetters['select/getSelected'];
      
      // console.log('objects/deleteSelected', selected);

      context.commit(
        'select/clearSelection',
        null, 
        { root: true }
      );
      
      context.dispatch(
        'objects/deleteObjectsByIds', 
        { ids: selected }, 
        { root: true }
      );
    },

    setObjectPosition( context, { id, axis, amount } ) {
      let scene = context.rootGetters['scene/getScene'];
      let meshObject = scene.getObjectById( parseInt( id, 10 ) );
      let axisPosition = parseFloat(amount);

      if (axis === 'x') {
        meshObject.position.setX(axisPosition);
      } else if (axis === 'y') {
        meshObject.position.setY(axisPosition);
      } else if (axis === 'z') {
        meshObject.position.setZ(axisPosition);
      }

      context.commit('setMeshObjPosition', {
        id: id,
        axis: axis,
        amount: axisPosition,
      });

      context.dispatch(
        'select/updateSelectedCentroid', 
        null,
        { root: true }
      );

    },

    setObjectProperty( context, { id, axis, amount, transform } ) {
      const scene = context.rootGetters['scene/getScene'];
      const meshObject3D = scene.getObjectById( parseInt( id, 10 ) );  // Object3D
      const axisProperty = parseFloat(amount);

      if ( transformTypes.includes(transform) && axisTypes.includes(axis) ) {

        const {x, y, z} = meshObject3D[transform];
        let xyz = {x, y, z};
        xyz[axis] = axisProperty;
        meshObject3D[transform].fromArray( Object.values(xyz) );
        meshObject3D.updateMatrix();

      }

      context.commit('setMeshObjProperty', {
        id: id,
        axis: axis,
        property: transform,
        amount: axisProperty,
      });

      context.dispatch(
        'select/updateSelectedCentroid', 
        null,
        { root: true }
      );

    },

  },

  mutations: {
    updateObjectPositionFromGraph(state, { object } ){

      Vue.set(state.meshObjs, object.id, {
        position: {...object.position},
      });

    },

    updateObjectPropertyFromGraph(state, { object } ){

      Vue.set(state.meshObjs, object.id, {
        scale: {...object.scale},
        rotation: {...object.rotation.toVector3()}, // in radians, convert to degrees
        position: {...object.position},
      });

    },

    addMeshObj(state, { id, object, type }) {

      Vue.set(state.meshObjs, id, { // object.id does not work, not sure why?
        type: type,
        scale: {...object.scale},
        rotation: {...object.rotation.toVector3()}, // in radians, convert to degrees
        position: {...object.position},
        // color: object.material.color.getHexString(),
      });

    },

    setMeshObjPosition(state, { id, axis, amount }) {
      state.meshObjs[id].position[axis] = parseFloat(amount);
    },

    setMeshObjProperty(state, { id, axis, amount, property }) {
      state.meshObjs[id][property][axis] = parseFloat(amount);
    },

    deleteMeshObj(state, { id }) {
      Vue.delete(state.meshObjs, id);
    },

  },

}

export default objects;