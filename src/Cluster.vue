<template>
  <g>
    <g v-for="blk in cluster.blocks">
      <rect v-bind:x="blk.start_y*110+60-i*2" v-bind:width="(blk.stop_y-blk.start_y)*110+100+i*4"
        v-bind:y="nodes[blk.start_i].x*50+5-i*2" v-bind:height="(nodes[blk.stop_i].x-nodes[blk.start_i].x)*50+34+i*4"
        rx="10"
        v-bind:style="'fill-opacity: 10%; stroke-width: 1; stroke: '+cluster.color+'; fill: '+cluster.color"/>
      <path class="link-cluster" v-if="cluster.blocks.length>1" v-bind:style="'stroke: '+cluster.color"
        v-bind:d="'M'+(blk.start_y*110+60-i*2)+','+((nodes[blk.start_i].x+nodes[blk.stop_i].x)*25+22+i*4)+' H'+(10+i*4)" />
    </g>
    <path class="link-cluster" v-if="cluster.blocks.length>1" v-bind:style="'stroke: '+cluster.color"
      v-bind:d="'M'+(10+i*4)+','+((nodes[cluster.blocks[0].start_i].x+nodes[cluster.blocks[0].stop_i].x)*25+22+i*4)+' V'+((nodes[cluster.blocks[cluster.blocks.length-1].start_i].x + nodes[cluster.blocks[cluster.blocks.length-1].stop_i].x)*25+22+i*4)" />
  </g>
</template>
  
<script>
export default {
  name: 'Cluster',
  props: ["cluster", "i", "nodes"],
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