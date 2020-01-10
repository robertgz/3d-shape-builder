import { mapGetters, mapMutations, mapActions } from 'vuex'

import * as THREE from 'three';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';

export default {
// To access use prefix: this.$options
  transformControl: null,
  transformGroup: null,

  props: {  },

  data() {
    return {
      transformToolEnabled: false,
      transformGizmoShowing: false,
      selectedWatcherFn: null,
      transformDragging: false,
    }
  },

  computed: {
    ...mapGetters('scene', {
      scene: 'getScene',
      renderer: 'getRenderer',
      camera: 'getCamera',
      controlsNode: 'getControlsNode',
      getObjectsFromRootByIDs: 'findObjectsFromRootByIDs',
    }),

    ...mapGetters('controls', {
      isTransformControlActive: 'isTransformControlActive',
      isOrbitControlActive: 'isOrbitControlActive',
    }),

    ...mapGetters('select', {
      selected: 'getSelected',
      centroid: 'getSelectionCentroid',
    }),

  },

  watch: {
    'isTransformControlActive': function(newActiveStatus, oldActiveStatus) {

      if ( newActiveStatus ) { // tool IS active

        this.selectedWatcherFn = this.$watch(
          'selected', function(newArr, oldArr) {

          if (newArr.length > 0 ) {

            this.setTransformPosition(this.centroid);
            this.enableTransform();
          } else {
            this.disableTransform();
          }

        }, {
          immediate: true
        })

      } else { // tool is NOT active
        this.disableTransform();

        if (this.selectedWatcherFn) {
          this.selectedWatcherFn(); // stop watching 'selected'
        }
      }
    },

    'centroid': function (newCentroid, oldCentroid) {
      this.setTransformPosition(this.centroid);
    },

  },
  
  // Lifecycle Events
  mounted: function () {

    this.$options.transformControl = new TransformControls(
      this.camera,
      this.renderer.domElement
    );
    // this.$options.transformControl.translationSnap = 0.25;

    this.$options.transformGroup = new THREE.Group();
    this.$options.transformGroup.name = 'transformGroup';

    this.setTransformControlStatus( { status: false } );

    this.controlsNode.add(this.$options.transformControl);
    this.controlsNode.add(this.$options.transformGroup);

  },

  methods: {

    setTransformPosition(centroid) {

      this.$options.transformGroup.position.set(
        centroid.x, 
        centroid.y, 
        centroid.z
      );

    },

    transform(event) {

      let objectList = this.getObjectsFromRootByIDs(this.selected);

      this.setOrbitControlStatus({ status: !event.value });
      this.setTransformDraggingStatus({ status: event.value });

      if (event.value) {

        objectList.forEach( oneObject => {
          this.$options.transformGroup.attach(oneObject);
        });

      } else {

        objectList.forEach( oneObject => {
          this.scene.attach(oneObject); // change to previous parent
          this.updateObjectPosition({ object: oneObject });
        });

      }

    },

    enableTransform () {

      this.updateSelectedCentroid();

      this.$options.transformControl.attach(this.$options.transformGroup);
      this.transformGizmoShowing = true;

      this.$options.transformControl.addEventListener(
        'dragging-changed', 
        this.transform,
        false
      );

    },

    disableTransform() {

      // console.log('disableTransform');
      this.$options.transformControl.detach();
      this.transformGizmoShowing = false;

      this.$options.transformControl.removeEventListener(
        'dragging-changed', 
        this.transform,
        false
      );

    },

    ...mapMutations('controls', {
      setTransformControlStatus: 'setTransformControlActiveStatus',
      setOrbitControlStatus: 'setOrbitControlActiveStatus',
      setTransformDraggingStatus: 'setTransformDraggingStatus',
    }),
    
    ...mapMutations('objects', {
      updateObjectPosition: 'updateObjectPositionFromGraph',
    }),
    
    ...mapActions('select', {
      updateSelectedCentroid: 'updateSelectedCentroid',
    }),

  },

  render() {
    return;
  },

}
