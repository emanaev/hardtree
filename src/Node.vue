<template>
  <g v-bind:transform="'translate('+x+' '+y+')'" @dblclick="$emit('generate-forward')">
    <rect v-bind:x="12" v-bind:y="10" width="96" height=24 rx="5" class="node" v-bind:style="primary?'':'stroke-dasharray: 2; stroke-width: 1'" />
    <text v-bind:x="13" v-bind:y="30" class="node-inn">{{node.data.name}}</text>
  </g>
</template>

<script>

export default {
  name: 'Node',
  props: ["node","x","y","primary"],
  data() {
    return {
    }
  },
  methods: {
    test() {
      $emit('generate-forward', node);
      console.log('Generated');
    }
  }
}
</script>

<style>
.node {
  fill: #F8F8F8; 
  stroke: black;
  stroke-width:2;

}
.node-inn {
    font-family: Varela Round, sans-serif;
    font-size: 8pt;
}
</style>