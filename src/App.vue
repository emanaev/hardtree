<template>
  <div id="app">
    <Schema v-bind:graph="graph" v-on:generate-forward="generateForward"/>
  </div>
</template>

<script>
import Schema from './Schema.vue';
import VGraph from './vgraph.js'

var company_idx = 0;
function company() {
  company_idx++;
  return {
    id: '77'+Math.floor(Math.random()*100000000),
    name: 'ООО "Ромашка '+company_idx.toString()+'"',
    cluster: Math.random()>.5 ? Math.floor(Math.random()*3+1).toString() : false
  }
}
var g = new VGraph();
g.addNode(company());
for(var i=1; i<4; i++) {
  var node = g.addNode(company());
  g.addLink(g.nodes[i-1],node);
}
var node3 = g.nodes[3];
var node4 = g.addNode(company());
g.addLink(node3, node4);
for(var i=5; i<9; i++) {
  var node = g.addNode(company());
  g.addLink(node3, node);
  g.addLink(node, node4);
}
for(var i=9; i<20; i++) {
  var node = g.addNode(company());
  for(var j=4; j<9; j++) {
    g.addLink(g.nodes[j], node);
  }
}
g.addLink(g.nodes[17], g.nodes[6]);
g.addLink(g.nodes[13], g.nodes[6]);

g.prepare();

export default {
  components: { Schema },
  data() {
    return {
      graph: g
    }
  },
  methods: {
    generateForward(source) {
      for(var i=0; i<3; i++) {
        if (Math.random()>.5) {
          var newNode = this.graph.addNode(company());
          this.graph.addLink(source, newNode);
          for(var j=0; j<2; j++) {
            this.graph.addLink(newNode, this.graph.randomRealNode());
          }
        } else {
          this.graph.addLink(source, this.graph.randomRealNode());
        }
      }
      this.graph.prepare();
    }
  }
}
</script>

<style>
html, body, div {

    margin: 0;
    background-color: #EEEEEE;
}
</style>
