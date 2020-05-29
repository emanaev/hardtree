<template>
  <div>
    <Schema v-bind:graph="graph"/>
  </div>
</template>

<script>
import Schema from './Schema.vue';
import {defaultSchema, groupedSchema, strangeSchema} from './data.js'
import { VGraph } from './vgraph.js'

export default {
  name: 'Random',
  components: { Schema },
  data() {
    return {
      graph: null
    }
  },
  created() {
    let g_src = groupedSchema(true);
    let g = new VGraph();
    g.load(g_src);//.reversed());
    //g.show_reversed = true;
    g.prepare();
    g.clusters["1"].text = 'Согласованность';
    g.clusters["2"].text = 'Подконтрольность';
    console.log(g.toJSON());
    this.graph = g;
  }
}
</script>

<style>
html, body, div {

    margin: 0;
    background-color: #EEEEEE;
}
</style>
