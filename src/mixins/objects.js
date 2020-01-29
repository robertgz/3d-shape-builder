import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapGetters('select', {
      getSelected: 'getSelected',
    }),
    ...mapGetters('scene', {
      findObjectsFromRootByIDs: 'findObjectsFromRootByIDs',
    }), 
  },

  methods: {
    ...mapMutations('objects', {
      updateObjectPropertyFromGraph: 'updateObjectPropertyFromGraph',
    }), 
    
    getObjectID (object) {
      return object.object.parent.id;
    },

    isObjectSelected(objectID) {   
      return this.getSelected.includes(objectID);
    },

    attachObjectsToParent(objectIDList, newParent) {

      let list = this.findObjectsFromRootByIDs(objectIDList);

      list.forEach( oneObject => {
        newParent.attach(oneObject);
      });

    },

    updateObjects( objectIDList ) {

      let list = this.findObjectsFromRootByIDs(objectIDList);

      list.forEach( oneObject => {

        this.updateObjectPropertyFromGraph({          
          object: oneObject
        });

      });

    },

  }

}