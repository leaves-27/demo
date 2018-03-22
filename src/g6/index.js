var x = 100,
    y = 100;

const data = {
  "nodes": [
    {
      "shape" : "customNode",
      "id" : "d62d1569"
    }
  ],
  "edges": []
}

G6.registerNode('customNode', {
  draw(cfg, group){
    group.addShape('text', {
      attrs: {
        x : x-50,
        y: y+50+20+20,
        fontSize:20,
        lineHeight:20,
        fill: '#333',
        text: 'g6 test demo'
      }
    });
    group.addShape('image', {
      attrs: {
        x: x-25,
        y: y-25,
        width:50,
        height:50,
        img: 'https://zos.alipayobjects.com/rmsportal/GHGrgIDTVMCaYZT.png'
      }
    });

    return group.addShape('circle', {
      attrs: {
        x: x,
        y: y,
        r: 50,
        lineWidth:5,
        shadowOffsetX:0,
        shadowOffsetY:0,
        shadowColor:"rgba(125,211,61,1)",
        shadowBlur:30,
        stroke: 'rgba(125,211,61,1)'
      }
    });
  }
});

const net = new G6.Net({
  id: 'root',           // 容器ID
  width: 500,   // 画布宽
  height: 500
});

net.source(data.nodes, data.edges);
net.render();