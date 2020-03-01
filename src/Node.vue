<template>
  <g v-bind:transform="'translate('+x+' '+y+')'" @dblclick="$emit('generate-forward')">
    <rect v-bind:x="11" v-bind:y="10" width="98" height=24 rx="10" v-if="!node.data.group" class="node" v-bind:style="primary?'':'stroke-dasharray: 2; stroke-width: 1'" />
    <rect v-bind:x="39" v-bind:y="13" width="48" height=24 rx="10" v-if="node.data.group" class="node-shadow" v-bind:style="primary?'':'stroke-dasharray: 2; stroke-width: 1'" />
    <rect v-bind:x="36" v-bind:y="10" width="48" height=24 rx="10" v-if="node.data.group" class="node" v-bind:style="primary?'':'stroke-dasharray: 2; stroke-width: 1'" />
    <text v-bind:x="node.data.group?37:12" v-bind:y="27" class="node-inn">{{node.data.name}}</text>
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
  stroke-width:1;

}
.node-shadow {
  fill: #F8F8F8; 
  stroke: black;
  stroke-width:1;

}
.node-inn {
    font-family: Varela Round, sans-serif;
    font-size: 8pt;
}
</style>