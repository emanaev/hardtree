import VGraph from './vgraph.js'

var company_idx = 0;
function company(cluster=null) {
  if (cluster===null) {
    cluster = Math.random()>.5 ? Math.floor(Math.random()*3+1).toString() : false;
  }
  var clusters = cluster ? [cluster] : [];
  company_idx++;
  return {
    id: company_idx.toString(),//Math.floor(Math.random()*100000000),
    name: 'ООО "Ромашка '+company_idx.toString()+'"',
    clusters
  }
}

var group_idx = 0;
function group(companies) {
  var clusters = {};
  companies.forEach(company => {
    company.clusters.forEach(c => {
      clusters[c] = true;
    });
  });
  group_idx++;
  return {
    id: 'G' + group_idx.toString(),
    name: 'Группа '+ group_idx.toString(),
    group: companies,
    clusters: Object.keys(clusters).sort()
  }
}

export function defaultSchema() {
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
  return g;  
}

export function groupedSchema() {
  var g = new VGraph();
  var companies = [];
  for(var i=0; i<20; i++) {
    companies.push(company());
  }
  var group_2_3 = group(companies.slice(1,3));
  var group_5_9 = group(companies.slice(4,9));
  var group_17_20 = group(companies.slice(16,20));

  var node0 = g.addNode(companies[0]);
  var node_2_3 = g.addNode(group_2_3);
  g.addLink(node0, node_2_3);
  var node4 = g.addNode(companies[3]);
  g.addLink(node_2_3, node4);
  var node_5_9 = g.addNode(group_5_9);
  g.addLink(node4, node_5_9);
  var node14;
  for(var i=10; i<17; i++) {
    var node = g.addNode(companies[i-1]);
    if (i==14) node14 = node;
    g.addLink(node_5_9, node);
  }
  var node_17_20 = g.addNode(group_17_20);
  g.addLink(node_5_9, node_17_20);
  g.addLink(node_17_20, node_5_9);
  g.addLink(node14, node_5_9);
  return g;
}