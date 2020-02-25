<template>
  <g>
    <g v-for="blk in cluster.blocks">
      <rect v-bind:x="blk.start_y*50+45" v-bind:width="(blk.stop_y-blk.start_y)*50+130"
        v-bind:y="blk.start_x*50+5" v-bind:height="(blk.stop_x-blk.start_x)*50+34"
        rx="12"
        v-bind:style="'fill-opacity: 20%; stroke-width: 1; stroke: '+cluster.color+'; fill: '+cluster.color"/>
      <path class="link-cluster" v-if="cluster.blocks.length>1" v-bind:style="'stroke: '+cluster.color"
        v-bind:d="'M'+(blk.start_y*50+45)+','+((blk.start_x+blk.stop_x)*25+22)+' H'+(10+i*4)" />
    </g>
    <path class="link-cluster" v-if="cluster.blocks.length>1" v-bind:style="'stroke: '+cluster.color"
      v-bind:d="'M'+(10+i*4)+','+((cluster.blocks[0].start_x+cluster.blocks[0].stop_x)*25+22)+' V'+((cluster.blocks[cluster.blocks.length-1].start_x+cluster.blocks[cluster.blocks.length-1].stop_x)*25+22)" />
  </g>
</template>
  
<script>
export default {
  name: 'Cluster',
  props: ["cluster", "i"],
  /*
  computed: {
    start: function() {
      return {
        x: this.rec.origin.start_y*50+100,
        y: this.rec.origin.x*50+22
      }
    },
    stop: function() {
      return {
        x: this.rec.circle.start_y*50+100,
        y: this.rec.circle.x*50+22
      };
    },
    d: function() {
      return 'M'+this.start.x+','+this.start.y+' H'+(this.totalWidth-10)+' V'+this.stop.y+' H'+this.stop.x;
    }
  },
  */
  data() {
    return {
    }
  }
}
</script>

<style>
  .link-cluster {
    fill: none;
    stroke-width: 2;
    stroke-dasharray: 4;
  }

</style>