
class Graph {
  constructor() {
    this.nodes = [];
    this.links = [];
  }
  hasNode(node) {
    return this.nodes.indexOf(node)>=0;
  }
  addNode(data=null) {
    let node = new Node(data);
    this.nodes.push(node)
    return node;
  }
  addLink(source, target, data=null) {
    if (!this.hasNode(source)) return;
    if (!this.hasNode(target)) return;
    let link = new Link(source, target, data);
    source.outgoing.push(link);
    target.incoming.push(link);
    this.links.push(link);
    return link;
  }
  removeLink(link) {
    let i = link.source.outgoing.indexOf(link);
    if (i>=0) link.source.outgoing.splice(i, 1);
    let j = link.target.incoming.indexOf(link);
    if (j>=0) link.target.incoming.splice(j, 1);
    let k = this.links.indexOf(link);
    if (k>-0) this.links.splice(k, 1);
  }
}

class Node {
  constructor(data) {
    if (!data.id) throw 'Node must have data.id';
    this.incoming = []
    this.outgoing = []
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

class NodesState {
  constructor(nodes, path_len=0) {
    this.nodes = nodes;
    this.hash = nodes.map(node => node.data.id).join();
    this.path_len = path_len;

    let clusters = {};
    let indexes = [];
    let delta = 0;
    let x_len;
    let nocluster_blocks = [];
    for(let i=0; i<this.nodes.length; i++) {
      let node = this.nodes[i];
      if (node.incoming.length==1 && i>0) {
        // попробуем разместить узел на том же уровне, что и предыдущий
        let last = nodes[i-1];
        if (last.data.clusters.join()==node.data.clusters.join() && this.nodes.indexOf(node.incoming[0].source)<i-x_len) {
          delta++;
          x_len++;
        } else {
          x_len = 1;
        }
      } else {
        x_len = 1;
      }
      indexes.push(i-delta);
      if (node.data.clusters.length) {
        node.data.clusters.forEach(c => {
          let last_block;
          if (c in clusters) {
            last_block = clusters[c].blocks[clusters[c].blocks.length-1];
            if (last_block.stop_i+1 == i) {
              // продолжаем предыдущий блок
              last_block.stop_i = i;
            } else {
              // предыдущий блок не подходит, потом добавим блок
              last_block = null;
            }
          } else {
            // создаем новый кластер, потом добавим блок
            clusters[c] = {blocks: [], color: cluster_colors[Object.keys(clusters).length]};
          }
          if (!last_block) {
            // добавим новый блок от текущего узла
            last_block = {start_i: i, stop_i: i, start_y: node.y, stop_y: node.y};
            clusters[c].blocks.push(last_block);
          }
          // уточним диапазон Y блока
          if (node.start_y < last_block.start_y) last_block.start_y = node.start_y;
          if (node.stop_y > last_block.stop_y) last_block.stop_y = node.stop_y;
        });
      } else {
        let last_block = nocluster_blocks.length ? nocluster_blocks[nocluster_blocks.length-1] : null;
        if (last_block && last_block.stop_i == i-1) {
          last_block.stop_i = i;
        } else {
          nocluster_blocks.push({start_i: i, stop_i: i});
        }
      }
    }
    let block_cnt = 0;
    let block_max = 0;
    Object.values(clusters).forEach(c => {
      block_cnt += c.blocks.length;
      c.blocks.forEach(block => {
        let len = block.stop_i - block.start_i;
        if (len>block_max) block_max = len;
      })
    });
    block_cnt += nocluster_blocks.length;
    nocluster_blocks.forEach(block => {
      let len = block.stop_i - block.start_i;
      if (len>block_max) block_max = len;
    });
    this.value = block_cnt*10 - block_max - delta*100;
    this.clusters = clusters;
    this.indexes = indexes;
  }

  steps() {
    let blocks = [];
    for(let i=0; i<this.nodes.length; i++) {
      let node = this.nodes[i];
      let last_block = blocks.length ? blocks[blocks.length-1] : null;
      if (last_block && last_block.clusters==node.data.clusters.join()) {
        last_block.stop_i = i;
        last_block.len++;
      } else {
        last_block = {clusters: node.data.clusters.join(), start_i: i, stop_i: i, len: 1, max_incoming: -1, min_outgoing: this.nodes.length};
        blocks.push(last_block);
      }
      node.incoming.forEach(link => {
        let j = this.nodes.indexOf(link.source);
        if (j>last_block.max_incoming) last_block.max_incoming = j;
      });
      node.outgoing.forEach(link => {
        let j = this.nodes.indexOf(link.target);
        if (j<last_block.min_outgoing) last_block.min_outgoing = j;
      });
    }
    let res = [];
    blocks.forEach(block => {
      for(let j=block.max_incoming+1; j<=block.min_outgoing-block.len; j++) {
        if (block.start_i != j) {
          res.push({start_i: block.start_i, len: block.len, to: j});
        }
      }
    });
    return res;
  }

  applyStep(step) {
    let new_nodes = this.nodes.slice(0);
    let moving = new_nodes.splice(step.start_i, step.len);
    new_nodes.splice.apply(new_nodes, [step.to, 0].concat(moving));
    let res = new NodesState(new_nodes, this.path_len+1);
    //console.log(this.hash, step, res.hash, moving,  new_nodes);
    return res;
  }
}

class VGraph extends Graph {
  constructor() {
    super();
    this.circles = {};
  }
  addNode(data=null) {
    let node = super.addNode(data);
    data.clusters.sort();
    return node;
  }
  isCircleNode(node) {
    return (node.data.id in this.circles) && this.circles[node.data.id].circle==node;
  }
  randomRealNode() {
    let nodes = this.nodes.filter(node => !this.isCircleNode(node));
    return nodes[Math.floor(Math.random()*nodes.length)];
  }
  addLink(source, target, data=null) {
    if (this.isCircleNode(source) || this.isCircleNode(target)) return;
    if (source==target) return;
    if (source.outgoing.indexOf(target)>=0) return; // мультиграф не поддерживается
    // пройдемся DFS-ом по графу, начиная с исходящего узлоа
    let visited = [];
    let queue = [target];
    while (queue.length>0) {
      let next = queue.pop();
      if (visited.indexOf(next)>=0) continue;
      visited.push(next)
      if (next == source) {
        // дошли до входящего узла - это цикл!
        // разорвем его - заменим исходящий узел связи на его дубликат
        let circle;
        if (target.data.id in this.circles) {
          circle = this.circles[target.data.id].circle;
        } else {
          circle = this.addNode(target.data);
          this.circles[target.data.id] = {origin: target, circle};
        }
        return super.addLink(source, circle, data);
      }
      next.outgoing.forEach(link => {
        queue.push(link.target);
      });
    }
    // цикла нет - можно просто создать связь
    return super.addLink(source, target, data);
  }
  // топологическая сортировка https://clck.ru/MH4Th + расстановка y
  topoSort() {
    // граф должен быть ациклическим !!! Но это гарантировано (см. addLink выше)
    let visited = [];
    let result = [];
    let DFS;
    let y = 1;
    DFS = current => {
      if (visited.indexOf(current)>=0) {
        y++;
        return;
      }
      visited.push(current);
      current.y = y;
      current.start_y = y;
      current.stop_y = y;
      if (current.outgoing.length==0) {
        y++;
      } else {
        current.outgoing.map(link => {
          link.y = y;
          DFS(link.target);
          if (link.y < link.target.start_y) link.target.start_y = link.y;
          if (link.y > link.target.stop_y) link.target.stop_y = link.y;
        });
      }
      result.push(current);
    }
    this.nodes.forEach(root => {
      if (root.incoming.length>0) return;
      DFS(root);
    })
    result.reverse();
    this.nodes = result;
  }
  shakeNodes() {
    let processed = [];
    let DFS = (next) => {
      // поиск DFS'ом локального оптимума
      let cur;
      while (!cur || cur != next) {
        cur = next;
        let newStates = cur.steps().map(step => cur.applyStep(step));
        for(let i=0; i<newStates.length; i++) {
          let state = newStates[i];
          if (processed.indexOf(state.hash)<0 && state.value < cur.value) {
            next = state;
            break;
          }
        }
      }
      if (processed.indexOf(cur.hash)<0) {
        processed.push(cur.hash);
      }
    return cur;
    }
    let start = new NodesState(this.nodes);
    processed.push(start.hash);
    let best = DFS(start);
    /*
    for(let i=0; i<100; i++) {
      let local = DFS(start);
      if (local.value < best.value) {
        console.log('BETTER!', local.value, local.hash);
        best = local;
      }
    }
    */
    this.nodes = best.nodes;
    this.clusters  = best.clusters;  
    for(let i=0; i<this.nodes.length; i++) {
      this.nodes[i].x = best.indexes[i];
    }
  }

  // рассчитать позиции кластеров (точнее - блоков, из которых отображаются кластера)
  prepare() {
    this.topoSort();
    this.shakeNodes();
    console.dir(this);
  }

  toJSON() {
    
  }
}

export default VGraph;
