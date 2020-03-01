<template>
  <svg v-bind:width="totalWidth" v-bind:height="totalHeight">
    <Cluster v-for="(key, i) in Object.keys(graph.clusters)" v-bind:cluster="graph.clusters[key]" v-bind:i="i" v-bind:nodes="graph.nodes"/>
    <LinkCircle v-for="(key, i) in Object.keys(graph.circles)" v-bind:i="i" v-bind:rec="graph.circles[key]" v-bind:totalWidth="totalWidth" />
    <g v-for="node in graph.nodes">
      <Node v-if="!graph.isCircleNode(node)" v-bind:node="node" v-bind:y="node.x*50" v-bind:x="node.y*110+50"  v-bind:primary="true" v-on:generate-forward="$emit('generate-forward', node)"/>
      <Node v-if="graph.isCircleNode(node)" v-bind:node="node" v-bind:y="node.x*50" v-bind:x="node.y*110+50"  v-bind:primary="false"/>
    </g>
    <g v-for="link in graph.links" >
      <Node v-if="link.y!=link.target.y" v-bind:node="link.target" v-bind:y="link.target.x*50" v-bind:x="link.y*110+50" v-bind:primary="false"/>
      <LinkNds v-bind:link="link" />
    </g>
  </svg>
</template>

<script>
import LinkNds from './LinkNds.vue';
import LinkCircle from './LinkCircle.vue';
import Cluster from './Cluster.vue';
import Node from './Node.vue';

export default {
  name: 'Schema',
  props: ["graph"],
  components: { LinkNds, Node, LinkCircle, Cluster },
  computed: {
    totalWidth: function() {
      return this.graph.links.length*110-20;
    },
    totalHeight: function() {
      return this.graph.nodes.length*50+100;
    }
  },
  data() {
    return {
    }
  },
  methods: {
    generateForward(node) {
      alert(node.data.name);
    }
  }
}
</script>
