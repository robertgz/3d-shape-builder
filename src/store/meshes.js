import Vue from 'vue'

const meshes = {
  state: {
    meshObjs: {},
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

  },

  actions: {},

  mutations: {

    addMeshObj(state, payload) {

      Vue.set(state.meshObjs, payload.id, {
        type: payload.type,
        location: { ...payload.location },
        scale: { ...payload.scale },
        color: payload.color,
      });

    },

    deleteMeshObj(state, payload) {
      Vue.delete(state.meshObjs, payload.id);
    },

  },

}

export default meshes;