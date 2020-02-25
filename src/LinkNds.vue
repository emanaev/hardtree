<template>
  <path class="link-nds" v-bind:d="d"/>
</template>
  
<script>
export default {
  name: 'LinkNds',
  props: ["link"],
  computed: {
    start: function() {
      return {
        x: this.link.source.y*50+110,
        y: this.link.source.x*50+34
      }
    },
    stop: function() {
      return {
        x: this.link.y*50+110,
        y: this.link.target.x*50+10
      };
    },
    d: function() {
      return 'M'+this.start.x+','+this.start.y+'v9 H'+this.stop.x+' V'+this.stop.y+'l-3,-3h6l-3,3';
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style>
  .link-nds {
    fill: none;
    stroke: #000;
    stroke-width: 1;
  }
  .link-pay {
    fill: none;
    stroke: navy;
    stroke-opacity: .2;
    stroke-width: 2;
  }

</style>