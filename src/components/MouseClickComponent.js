import { mapActions } from 'vuex';

export default {

  methods: {

    ...mapActions('select', {
      mouseClickedAction: 'mouseClicked',
    }),
    
    clickEvent (event) {

      let options = {
        x:   ( event.clientX / window.innerWidth )  * 2 - 1,
        y: - ( event.clientY / window.innerHeight ) * 2 + 1,
      };

      this.mouseClickedAction({
        mouse: options,
        ctrlKey: event.ctrlKey,
        shiftKey: event.shiftKey,        
      });

    },

  },

  render() {
    return this.$scopedSlots.default({
      clicked: this.clickEvent,
    })
  },

}