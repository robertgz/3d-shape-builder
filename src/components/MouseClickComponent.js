import { mapGetters, mapActions } from 'vuex';

export default {
  
  data () {
    return {
      // mouseDownCoord: { x: 0, y: 0 },
      // mouseUpCoord: { x: 0, y: 0 },
      mouseDragged: false,
      mouseIsDown: false,
    }
  },

  inject: { threeElement: 'threeElement' },

  computed: {

    ...mapGetters('scene', {
      canvas: 'getCanvas',
    }),

  },

  mounted: function () {
    this.threeElement().addEventListener('click', this.clickEvent, false);
    this.threeElement().addEventListener('mousedown', this.mouseDown, false);
  },

  beforeDestroy: function() {
    if (this.threeElement()) {
      this.threeElement().removeEventListener('click', this.clickEvent, false);
      this.threeElement().removeEventListener('mousedown', this.mouseDown, false);
    }

   },

  methods: {

    ...mapActions('select', {
      mouseClickedAction: 'mouseClicked',
    }),
    
    clickEvent (event) {

      let options = this.computeXYCoords({
        x: event.clientX,
        y: event.clientY,
      });

      if (!this.mouseDragged) {
        
        this.mouseClickedAction({
          mouse: options,
          ctrlKey: event.ctrlKey,
          shiftKey: event.shiftKey,        
        });

      }

    },

    mouseDown(event) {

      this.mouseIsDown = true;

      // this.mouseDownCoord = this.computeXYCoords({
      //   x: event.clientX,
      //   y: event.clientY,
      // });

      this.mouseDragged = false;

      this.addEventListeners();

    },

    mouseMove(event) {

      if (this.mouseIsDown) {
        this.mouseDragged = true;
      }

    },

    mouseOut(event) {

      this.removeEventListeners();

    },

    mouseUp(event) {

      this.mouseIsDown = false;

      // this.mouseUpCoord = this.computeXYCoords({
      //   x: event.clientX,
      //   y: event.clientY,
      // });

      this.removeEventListeners();

    },

    computeXYCoords({ x, y }) {

      return { 
        x:   ( x / window.innerWidth )  * 2 - 1,
        y: - ( y / window.innerHeight ) * 2 + 1,
      };

    },

    addEventListeners() {
      this.threeElement().addEventListener('mousemove', this.mouseMove, false);
      this.threeElement().addEventListener('mouseout', this.mouseOut, false);
      this.threeElement().addEventListener('mouseup', this.mouseUp, false);
    },

    removeEventListeners() {
      this.threeElement().removeEventListener('mousemove', this.mouseMove, false);
      this.threeElement().removeEventListener('mouseout', this.mouseOut, false);
      this.threeElement().removeEventListener('mouseup', this.mouseUp, false);
    },

  },

  render() {
    return;
  },

}