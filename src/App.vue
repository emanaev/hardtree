<template>
  <div id="app">
    <Schema v-bind:graph="graph" v-on:generate-forward="generateForward"/>
  </div>
</template>

<script>
import Schema from './Schema.vue';
import {defaultSchema, groupedSchema} from './data.js'

var g = defaultSchema();
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
