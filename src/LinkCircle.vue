<template>
  <path class="link-circle" v-bind:d="d"/>
</template>
  
<script>
export default {
  name: 'LinkCircle',
  props: ["rec", "i", "totalWidth"],
  computed: {
    start: function() {
      return {
        x: this.rec.origin.start_y*110+100,
        y: this.rec.origin.x*50+22
      }
    },
    stop: function() {
      return {
        x: this.rec.circle.start_y*110+100,
        y: this.rec.circle.x*50+22
      };
    },
    d: function() {
      return 'M'+this.start.x+','+this.start.y+' H'+(this.totalWidth-10)+' V'+this.stop.y+' H'+this.stop.x;
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style>
  .link-circle {
    fill: none;
    stroke: #999999;
    stroke-width: 2;
    stroke-dasharray: 4;
  }

</style>