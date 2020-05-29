<template>
  <div>
    <h1>Схема №{{id}}</h1>
    <Schema v-bind:graph="graph"/>
  </div>
</template>

<script>
import Schema from './Schema.vue';
import { VGraph, CGraph } from './vgraph.js'
export default {
  name: 'Typology',
  components: { Schema },
  props: ["id"],
  data() {
    return {
      graph: null
    }
  },
  created() {
    /*
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then((response) => {
        if(response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then((json) => {
        this.posts.push({
          title: json.title,
          body: json.body
        });
      })
      .catch((error) => {
        console.log(error);
      });
    */
    let data = {"schema_id":103,"risk_id":103,"template_id":4,"template_version_id":4,"graph_data":null,"leading_role_id":112,"assignment":"7700","links":[{"id":121,"link_type_id":3,"participant_id1":114,"participant_id2":112,"directed":false,"has_gap":false,"gap_value":0.0,"parameter_list":[{"Id":255,"template_value":"true","weight":10.0,"match":null,"feedback":true,"feedback_comment":false,"type_id":27,"mandatory":false,"valid":false,"value":null},{"Id":254,"template_value":"true","weight":10.0,"match":null,"feedback":true,"feedback_comment":false,"type_id":28,"mandatory":false,"valid":false,"value":null},{"Id":253,"template_value":"true","weight":10.0,"match":null,"feedback":true,"feedback_comment":false,"type_id":31,"mandatory":false,"valid":false,"value":null},{"Id":252,"template_value":"true","weight":10.0,"match":null,"feedback":true,"feedback_comment":false,"type_id":32,"mandatory":false,"valid":false,"value":null}]},{"id":122,"link_type_id":3,"participant_id1":113,"participant_id2":112,"directed":false,"has_gap":false,"gap_value":0.0,"parameter_list":[{"Id":259,"template_value":"true","weight":10.0,"match":null,"feedback":true,"feedback_comment":false,"type_id":27,"mandatory":false,"valid":false,"value":null},{"Id":258,"template_value":"true","weight":10.0,"match":null,"feedback":true,"feedback_comment":false,"type_id":28,"mandatory":false,"valid":false,"value":null},{"Id":257,"template_value":"true","weight":10.0,"match":null,"feedback":true,"feedback_comment":false,"type_id":31,"mandatory":false,"valid":false,"value":null},{"Id":256,"template_value":"true","weight":10.0,"match":null,"feedback":true,"feedback_comment":false,"type_id":32,"mandatory":false,"valid":false,"value":null}]},{"id":123,"link_type_id":2,"participant_id1":112,"participant_id2":115,"directed":false,"has_gap":false,"gap_value":0.0,"parameter_list":[{"Id":261,"template_value":"true","weight":10.0,"match":null,"feedback":true,"feedback_comment":false,"type_id":17,"mandatory":false,"valid":false,"value":null},{"Id":260,"template_value":"true","weight":10.0,"match":null,"feedback":true,"feedback_comment":false,"type_id":18,"mandatory":false,"valid":false,"value":null}]},{"id":124,"link_type_id":1,"participant_id1":115,"participant_id2":114,"directed":true,"has_gap":true,"gap_value":200000.10,"parameter_list":[{"Id":264,"template_value":"true","weight":10.0,"match":null,"feedback":true,"feedback_comment":false,"type_id":45,"mandatory":true,"valid":true,"value":null},{"Id":263,"template_value":"true","weight":10.0,"match":null,"feedback":true,"feedback_comment":false,"type_id":48,"mandatory":false,"valid":false,"value":null},{"Id":262,"template_value":"200000.0","weight":50.0,"match":null,"feedback":true,"feedback_comment":false,"type_id":49,"mandatory":true,"valid":true,"value":"200000.10"}]},{"id":125,"link_type_id":1,"participant_id1":115,"participant_id2":113,"directed":true,"has_gap":true,"gap_value":200000.10,"parameter_list":[{"Id":267,"template_value":"true","weight":10.0,"match":null,"feedback":true,"feedback_comment":false,"type_id":45,"mandatory":true,"valid":true,"value":null},{"Id":266,"template_value":"true","weight":10.0,"match":null,"feedback":true,"feedback_comment":false,"type_id":48,"mandatory":false,"valid":false,"value":null},{"Id":265,"template_value":"200000.0","weight":50.0,"match":null,"feedback":true,"feedback_comment":false,"type_id":49,"mandatory":true,"valid":true,"value":"200000.10"}]},{"id":126,"link_type_id":1,"participant_id1":114,"participant_id2":112,"directed":true,"has_gap":false,"gap_value":0.0,"parameter_list":[{"Id":269,"template_value":"true","weight":59.0,"match":null,"feedback":true,"feedback_comment":false,"type_id":45,"mandatory":true,"valid":true,"value":null},{"Id":268,"template_value":"true","weight":10.0,"match":null,"feedback":true,"feedback_comment":false,"type_id":48,"mandatory":false,"valid":false,"value":null}]},{"id":127,"link_type_id":1,"participant_id1":113,"participant_id2":112,"directed":true,"has_gap":false,"gap_value":0.0,"parameter_list":[{"Id":271,"template_value":"true","weight":59.0,"match":null,"feedback":true,"feedback_comment":false,"type_id":45,"mandatory":true,"valid":true,"value":null},{"Id":270,"template_value":"true","weight":10.0,"match":null,"feedback":true,"feedback_comment":false,"type_id":48,"mandatory":false,"valid":false,"value":null}]}],"participants":[{"id":112,"name":"ООО \"Сетвард\"","inn":"0304144277","fid":11,"role_id":1,"business_role_id":null,"region_id":null,"parameter_list":[{"Id":231,"template_value":"true","weight":10.0,"match":0.1,"feedback":true,"feedback_comment":false,"type_id":4,"mandatory":true,"valid":true,"value":"true"},{"Id":230,"template_value":"true","weight":10.0,"match":0.1,"feedback":true,"feedback_comment":false,"type_id":5,"mandatory":true,"valid":true,"value":"true"},{"Id":229,"template_value":"2","weight":10.0,"match":0.1,"feedback":true,"feedback_comment":false,"type_id":6,"mandatory":true,"valid":true,"value":"2.10"},{"Id":234,"template_value":"0.3","weight":10.0,"match":null,"feedback":true,"feedback_comment":false,"type_id":1,"mandatory":false,"valid":false,"value":"0.40"},{"Id":233,"template_value":"98","weight":10.0,"match":null,"feedback":true,"feedback_comment":false,"type_id":2,"mandatory":false,"valid":false,"value":"98.10"},{"Id":232,"template_value":"200000","weight":10.0,"match":null,"feedback":true,"feedback_comment":false,"type_id":3,"mandatory":false,"valid":false,"value":"200000.10"}]},{"id":113,"name":"ООО \"Джорган\"","inn":"0361915222","fid":12,"role_id":2,"business_role_id":null,"region_id":null,"parameter_list":[{"Id":239,"template_value":"3","weight":10.0,"match":0.1,"feedback":true,"feedback_comment":false,"type_id":9,"mandatory":true,"valid":true,"value":"3.10"},{"Id":237,"template_value":"true","weight":10.0,"match":0.1,"feedback":true,"feedback_comment":false,"type_id":11,"mandatory":true,"valid":true,"value":"true"},{"Id":235,"template_value":"true","weight":10.0,"match":0.1,"feedback":true,"feedback_comment":false,"type_id":13,"mandatory":true,"valid":true,"value":"true"},{"Id":241,"template_value":"0.2","weight":10.0,"match":null,"feedback":true,"feedback_comment":false,"type_id":7,"mandatory":false,"valid":false,"value":"0.30"},{"Id":240,"template_value":"98","weight":10.0,"match":null,"feedback":true,"feedback_comment":false,"type_id":8,"mandatory":false,"valid":false,"value":"98.10"},{"Id":238,"template_value":"200000","weight":10.0,"match":null,"feedback":true,"feedback_comment":false,"type_id":10,"mandatory":false,"valid":false,"value":"200000.10"},{"Id":236,"template_value":"1","weight":0.0,"match":null,"feedback":true,"feedback_comment":false,"type_id":12,"mandatory":false,"valid":false,"value":"1"}]},{"id":114,"name":"ООО \"Элвер\"","inn":"0398510132","fid":13,"role_id":2,"business_role_id":null,"region_id":null,"parameter_list":[{"Id":246,"template_value":"3","weight":10.0,"match":0.1,"feedback":true,"feedback_comment":false,"type_id":9,"mandatory":true,"valid":true,"value":"3.10"},{"Id":244,"template_value":"true","weight":10.0,"match":0.1,"feedback":true,"feedback_comment":false,"type_id":11,"mandatory":true,"valid":true,"value":"true"},{"Id":242,"template_value":"true","weight":10.0,"match":0.1,"feedback":true,"feedback_comment":false,"type_id":13,"mandatory":true,"valid":true,"value":"true"},{"Id":248,"template_value":"0.2","weight":10.0,"match":null,"feedback":true,"feedback_comment":false,"type_id":7,"mandatory":false,"valid":false,"value":"0.30"},{"Id":247,"template_value":"98","weight":10.0,"match":null,"feedback":true,"feedback_comment":false,"type_id":8,"mandatory":false,"valid":false,"value":"98.10"},{"Id":245,"template_value":"200000","weight":10.0,"match":null,"feedback":true,"feedback_comment":false,"type_id":10,"mandatory":false,"valid":false,"value":"200000.10"},{"Id":243,"template_value":"1","weight":0.0,"match":null,"feedback":true,"feedback_comment":false,"type_id":12,"mandatory":false,"valid":false,"value":"1"}]},{"id":115,"name":"ООО \"Аарди\"","inn":"0421200135","fid":14,"role_id":3,"business_role_id":null,"region_id":null,"parameter_list":[{"Id":251,"template_value":"99","weight":10.0,"match":0.1,"feedback":true,"feedback_comment":false,"type_id":14,"mandatory":true,"valid":true,"value":"99.10"},{"Id":250,"template_value":"true","weight":10.0,"match":null,"feedback":true,"feedback_comment":false,"type_id":15,"mandatory":false,"valid":false,"value":"true"},{"Id":249,"template_value":"true","weight":10.0,"match":null,"feedback":true,"feedback_comment":false,"type_id":16,"mandatory":false,"valid":false,"value":"true"}]}]};
    let g = new VGraph();
    let cg = new CGraph();
    let nodes = {};
    let c_nodes = {};
    data.participants.forEach(participant => {
      let data = {
        id: participant.inn,
        name: participant.name,
        clusters: [],
        analytic_role_id: parseInt(participant.role_id),
        Break_NDS: 0
      };
      nodes[participant.id] = g.addNode(data);
      c_nodes[participant.id] = cg.addNode(data);
    });
    data.links.forEach(link => {
      if(link.link_type_id==1) {
        g.addLink(nodes[link.participant_id1], nodes[link.participant_id2]);
        if (link.has_gap) {
          nodes[link.participant_id1].data.Break_NDS += link.gap_value;
        }
      } else {
        cg.addLink(c_nodes[link.participant_id1], c_nodes[link.participant_id2]);
      }
    });
    Object.keys(nodes).forEach(id => {
      nodes[id].data.clusters = c_nodes[id].cluster ? [''+c_nodes[id].cluster.id] : [];
    });
    g.prepare();
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
