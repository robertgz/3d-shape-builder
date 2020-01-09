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

  computed: {

    ...mapGetters('scene', {
      canvas: 'getCanvas',
    }),

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
      this.canvas.addEventListener('mousemove', this.mouseMove, false);
      this.canvas.addEventListener('mouseout', this.mouseOut, false);
      this.canvas.addEventListener('mouseup', this.mouseUp, false);
    },

    removeEventListeners() {
      this.canvas.removeEventListener('mousemove', this.mouseMove, false);
      this.canvas.removeEventListener('mouseout', this.mouseOut, false);
      this.canvas.removeEventListener('mouseup', this.mouseUp, false);
    },

  },

  render() {
    return this.$scopedSlots.default({
      clicked: this.clickEvent,
      mouseDown: this.mouseDown,
    })
  },

}