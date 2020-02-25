
class Graph {
  constructor() {
    this.nodes = []
    this.links = []
  }
  hasNode(node) {
    return this.nodes.indexOf(node)>=0;
  }
  addNode(data=null) {
    var node = new Node(data);
    this.nodes.push(node)
    return node;
  }
  addLink(source, target, data=null) {
    if (!this.hasNode(source)) return;
    if (!this.hasNode(target)) return;
    var link = new Link(source, target, data);
    source.outgoing.push(link);
    target.incoming.push(link);
    this.links.push(link);
    return link;
  }
  removeLink(link) {
    var i = link.source.outgoing.indexOf(link);
    if (i>=0) link.source.outgoing.splice(i, 1);
    var j = link.target.incoming.indexOf(link);
    if (j>=0) link.target.incoming.splice(j, 1);
    var k = this.links.indexOf(link);
    if (k>-0) this.links.splice(k, 1);
    console.log(i,j,k);
  }
  simpleDFS(root, stopFun=null) {
    var visited = [];
    var queue = [root];
    while (queue.length>0) {
      var next = queue.pop();
      if (visited.indexOf(next)>=0) continue;
      visited.push(next);
      if (stopFun && stopFun(next)) break;
      next.outgoing.forEach(function(link) {
        queue.push(link.target);
      });
    }
  }
}

class Node {
  constructor(data) {
    this.incoming = []
    this.outgoing = []
    if (!data) data = {};
    this.data = data;
  }
}

class Link {
  constructor(source, target, data) {
    this.source = source;
    this.target = target;
    if (!data) data = {};
    this.data = data
  }
}

const
  cluster_colors = [
    'teal',
    'red',
    'blue',
    'saddlebrown',
    'darkturquoise',
    'magenta',
    'lime',
    'pink',
    'navy',
    'brown',
    'yellowgreen'
  ];

class VGraph extends Graph {
  constructor() {
    super();
    this.circles = {};
    this.clusters = {};
  }
  isCircleNode(node) {
    return (node.data.id in this.circles) && this.circles[node.data.id].circle==node;
  }
  randomRealNode() {
    var nodes = this.nodes.filter(node => !this.isCircleNode(node));
    return nodes[Math.floor(Math.random()*nodes.length)];
  }
  addLink(source, target, data=null) {
    if (this.isCircleNode(source) || this.isCircleNode(target)) return;
    if (source==target) return;
    if (source.outgoing.indexOf(target)>=0) return; // мультиграф не поддерживается
    var link;
    // разорвать цикл, если обнаружен
    this.simpleDFS(target, next => {
      if (next != source) return false;
      var circle;
      if (target.data.id in this.circles) {
        circle = this.circles[target.data.id].circle;
      } else {
        circle = this.addNode(target.data);
        this.circles[target.data.id] = {origin: target, circle};
      }
      link = super.addLink(source, circle, data);
      return true;
    });
    return link ? link : super.addLink(source, target, data);
  }
  // топологическая сортировка
  // https://clck.ru/MH4Th
  topoSort() {
    // граф должен быть ациклическим !!! Но это гарантировано (см. addLink выше)
    var visited = [];
    var result = [];
    var DFS;
    DFS = current => {
      if (visited.indexOf(current)>=0) return;
      visited.push(current);
      var local = current.outgoing.map(link => link.target);
      local.sort((node1,node2) => {
        if (current.data.cluster) {
          if (node1.data.cluster==current.data.cluster && node1.data.cluster!=node2.data.cluster) return 1;
          if (node2.data.cluster==current.data.cluster && node1.data.cluster!=node2.data.cluster) return -1;
        }
        if (node1.data.cluster && !node2.data.cluster) return 1;
        if (node2.data.cluster && !node1.data.cluster) return -1;
        if (node1.data.cluster>node2.data.cluster) return 1;
        if (node2.data.cluster>node1.data.cluster) return -1;
        return 0;
      });
      //console.log(current.data.name, local.map(node => (''+node.data.name+'-'+node.data.cluster)));
      local.forEach(node => DFS(node));
      result.push(current);
    }
    this.nodes.forEach(root => DFS(root));
    result.reverse();
    for(var i=0; i<result.length; i++) {
      result[i].x = i+1;
      result[i].y = null;
    }
    this.nodes = result;
  }

  // проставить координаты у узлов и связей
  // на выходе: x и y для каждого узла - это координаты первого экземпляра
  // y для каждой связи - это y-координата узла в конечной точке связи, для дубликатов узла отличается от координаты первого экземпляра
  treeSort() {
    var y = 1;
    var DFS;
    DFS = node => {
      var start_y, last_y;
      if (!node.y) {
        // здесь мы еще не были
        node.outgoing.forEach(link => {
          // найдем диапазон y для нижестоящх связей
          last_y = DFS(link.target);
          if (!start_y) start_y = last_y;
          link.y = last_y
        })
      }
      var res;
      if (!start_y) {
        // нижестоящих связей нет
        // значит, это лист дерева, дадим ему новую координату y
        res = y;
        y++;
      } else {
        // нижестояие связи есть, разместим эту связь посредине всех нижестоящих
        res = start_y;//Math.floor( (start_y+last_y+1)/2 );
      }
      if (!node.y)
        // если узел встречается первый раз, значит, ему тоже присвоим координату + она же - пометка от повторного прохода по узлу
        node.y = res;
      return res;
    }
    this.topoSort();
    this.nodes.forEach(root => {
      if (root.incoming.length>0) return;
      DFS(root);
    })
  }

  // рассчитать позиции кластеров (блоков, из которых отображаются кластера)
  prepare() {
    this.treeSort();
    this.clusters = {}
    for(var i=0; i<this.nodes.length; i++) {
      var node = this.nodes[i];
      var y_list = node.incoming.map(link => link.y);
      y_list.push(node.y);
      node.start_y = Math.min.apply(Math, y_list);
      node.stop_y = Math.max.apply(Math, y_list);
      if (!node.data.cluster) continue;
      if (node.data.cluster in this.clusters) {
        var blocks = this.clusters[node.data.cluster].blocks;
        var last_block = blocks[blocks.length-1];
        if (last_block.stop_x==node.x-1) {
          last_block.stop_x++;
          if (node.start_y<last_block.start_y) last_block.start_y = node.start_y;
          if (node.stop_y>last_block.stop_y) last_block.stop_y = node.stop_y;
          continue;
        }
      } else {
        this.clusters[node.data.cluster] = {blocks: [], color: cluster_colors[Object.keys(this.clusters).length]};
      }
      this.clusters[node.data.cluster].blocks.push({start_x: node.x, stop_x: node.x, start_y: node.start_y, stop_y: node.stop_y});
    }
    // удалить кластера, состоящие из одного узла
    for(var key in this.clusters) {
      var blocks = this.clusters[key].blocks;
      if (blocks.length==1 && blocks[0].start_x==blocks[0].stop_x) {
        delete this.clusters[key];
      }
    }
    console.dir(this);
  }
  toJSON() {
    
  }
}

export default VGraph;
