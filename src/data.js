import { Graph } from './vgraph.js'

let company_idx = 0;
function company(cluster=null) {
  if (cluster===null) {
    cluster = Math.random()>.5 ? Math.floor(Math.random()*3+1).toString() : false;
  }
  let clusters = cluster ? [cluster] : [];
  company_idx++;
  return {
    //id: company_idx.toString(),//Math.floor(Math.random()*100000000),
    id: '77'+Math.floor(Math.random()*100000000),
    name: 'ООО "Ромашка '+company_idx.toString()+'"',
    clusters
  }
}

let group_idx = 0;
function group(companies) {
  let clusters = {};
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
  let g = new Graph();
  let node1 = g.addNode(company());
  node1.data.main = true;
  for(let i=1; i<4; i++) {
    let node = g.addNode(company());
    g.addLink(g.nodes[i-1],node);
  }
  let node3 = g.nodes[3];
  let node4 = g.addNode(company());
  g.addLink(node3, node4);
  for(let i=5; i<9; i++) {
    let node = g.addNode(company());
    g.addLink(node3, node);
    g.addLink(node, node4);
  }
  for(let i=9; i<20; i++) {
    let node = g.addNode(company());
    for(let j=4; j<9; j++) {
      g.addLink(g.nodes[j], node);
    }
  }
  g.addLink(g.nodes[17], g.nodes[6]);
  g.addLink(g.nodes[13], g.nodes[6]);
  return g;  
}

export function groupedSchema() {
  let g = new Graph();
  let companies = [];
  for(let i=0; i<20; i++) {
    companies.push(company());
  }
  let group_2_3 = group(companies.slice(1,3));
  let group_5_9 = group(companies.slice(4,9));
  let group_17_20 = group(companies.slice(16,20));

  let node1 = g.addNode(companies[0]);
  let node_2_3 = g.addNode(group_2_3);
  g.addLink(node1, node_2_3);
  let node4 = g.addNode(companies[3]);
  g.addLink(node_2_3, node4);
  let node_5_9 = g.addNode(group_5_9);
  g.addLink(node4, node_5_9);
  let node14;
  for(let i=10; i<17; i++) {
    let node = g.addNode(companies[i-1]);
    if (i==14) node14 = node;
    if (i==11) {
      node.data.main = true;
    }
    g.addLink(node_5_9, node);
  }
  let node_17_20 = g.addNode(group_17_20);
  g.addLink(node_5_9, node_17_20);
  g.addLink(node_17_20, node_5_9);
  g.addLink(node14, node_5_9);
 
  let node21 = g.addNode(company());
  g.addLink(node21, g.nodes[3]);
  return g;
}