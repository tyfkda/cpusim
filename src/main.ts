///<reference path="./decl/simcirjs.d.ts" />

import {simcir} from 'simcirjs'
import './nandonly'

function drawOR(g, x, y, width, height) {
  const depth = width * 0.2
  g.moveTo(x, y)
  g.curveTo(x + width - depth, y, x + width, y + height / 2)
  g.curveTo(x + width - depth, y + height, x, y + height)
  g.curveTo(x + depth, y + height, x + depth, y + height / 2)
  g.curveTo(x + depth, y, x, y)
  g.closePath(true)
}

const kDevices = [
  // 0: NAND
  {
    name: 'NAND',
    "devices":[
      {"type":"Toggle","id":"dev0","x":64,"y":24,"label":"Toggle","state":{"on":false}},
      {"type":"DC","id":"dev1","x":16,"y":48,"label":"DC"},
      {"type":"Toggle","id":"dev2","x":64,"y":72,"label":"Toggle","state":{"on":false}},
      {"type":"In","id":"dev3","x":112,"y":24,"label":""},
      {"type":"In","id":"dev4","x":112,"y":72,"label":""},
      {"type":"NAND","id":"dev5","x":160,"y":48,"label":"NAND"},
      {"type":"Out","id":"dev6","x":208,"y":48,"label":"Out"},
      {"type":"LED","id":"dev7","x":256,"y":48,"label":"LED"}
    ],
    "connectors":[
      {"from":"dev0.in0","to":"dev1.out0"},
      {"from":"dev2.in0","to":"dev1.out0"},
      {"from":"dev3.in0","to":"dev0.out0"},
      {"from":"dev4.in0","to":"dev2.out0"},
      {"from":"dev5.in0","to":"dev3.out0"},
      {"from":"dev5.in1","to":"dev4.out0"},
      {"from":"dev6.in0","to":"dev5.out0"},
      {"from":"dev7.in0","to":"dev6.out0"}
    ],
    noRegister: true,
  },

  // 1: NOT
  {
    name: 'NOT',
    devices:[
      {"type":"DC","id":"dev0","x":16,"y":24,"label":"DC"},
      {"type":"Toggle","id":"dev1","x":64,"y":24,"label":"Toggle","state":{"on":false}},
      {"type":"In","id":"dev2","x":112,"y":24,"label":""},
      {"type":"NAND","id":"dev3","x":160,"y":24,"label":"NAND"},
      {"type":"Out","id":"dev4","x":208,"y":24,"label":""},
      {"type":"LED","id":"dev5","x":256,"y":24,"label":"LED"}
    ],
    connectors:[
      {"from":"dev1.in0","to":"dev0.out0"},
      {"from":"dev2.in0","to":"dev1.out0"},
      {"from":"dev3.in0","to":"dev2.out0"},
      {"from":"dev3.in1","to":"dev2.out0"},
      {"from":"dev4.in0","to":"dev3.out0"},
      {"from":"dev5.in0","to":"dev4.out0"}
    ],
    // Custom draw
    chipWidth: 2,
    draw: function(g, x, y, width, height) {
      g.moveTo(x - 1, y)
      g.lineTo(x - 1 + width - 2, y + height / 2)
      g.lineTo(x - 1, y + height)
      g.lineTo(x - 1, y)
      g.closePath(true)

      g.drawCircle(x + width - 1, y + height / 2, 2)
    },
  },

  // 2: AND
  {
    name: 'AND',
    "devices":[
      {"type":"Toggle","id":"dev0","x":64,"y":24,"label":"Toggle","state":{"on":false}},
      {"type":"NAND","id":"dev1","x":160,"y":48,"label":"NAND"},
      {"type":"DC","id":"dev2","x":16,"y":48,"label":"DC"},
      {"type":"Toggle","id":"dev3","x":64,"y":72,"label":"Toggle","state":{"on":false}},
      {"type":"In","id":"dev4","x":112,"y":24,"label":""},
      {"type":"In","id":"dev5","x":112,"y":72,"label":""},
      {"type":"NOT","id":"dev6","x":208,"y":48,"label":"NOT"},
      {"type":"LED","id":"dev7","x":304,"y":48,"label":"LED"},
      {"type":"Out","id":"dev8","x":256,"y":48,"label":""}
    ],
    "connectors":[
      {"from":"dev0.in0","to":"dev2.out0"},
      {"from":"dev1.in0","to":"dev4.out0"},
      {"from":"dev1.in1","to":"dev5.out0"},
      {"from":"dev3.in0","to":"dev2.out0"},
      {"from":"dev4.in0","to":"dev0.out0"},
      {"from":"dev5.in0","to":"dev3.out0"},
      {"from":"dev6.in0","to":"dev1.out0"},
      {"from":"dev7.in0","to":"dev8.out0"},
      {"from":"dev8.in0","to":"dev6.out0"}
    ],
    // Custom draw
    chipWidth: 2,
    draw: function(g, x, y, width, height) {
      g.moveTo(x, y)
      g.curveTo(x + width, y, x + width, y + height / 2)
      g.curveTo(x + width, y + height, x, y + height)
      g.lineTo(x, y)
      g.closePath(true)
    },
  },

  // 3: OR
  {
    name: 'OR',
    "devices":[
      {"type":"Toggle","id":"dev0","x":64,"y":24,"label":"Toggle","state":{"on":false}},
      {"type":"DC","id":"dev1","x":16,"y":48,"label":"DC"},
      {"type":"Toggle","id":"dev2","x":64,"y":72,"label":"Toggle","state":{"on":false}},
      {"type":"In","id":"dev3","x":112,"y":24,"label":""},
      {"type":"In","id":"dev4","x":112,"y":72,"label":""},
      {"type":"LED","id":"dev5","x":304,"y":48,"label":"LED"},
      {"type":"Out","id":"dev6","x":256,"y":48,"label":""},
      {"type":"NAND","id":"dev7","x":208,"y":48,"label":"NAND"},
      {"type":"NOT","id":"dev8","x":160,"y":24,"label":"NOT"},
      {"type":"NOT","id":"dev9","x":160,"y":72,"label":"NOT"}
    ],
    "connectors":[
      {"from":"dev0.in0","to":"dev1.out0"},
      {"from":"dev2.in0","to":"dev1.out0"},
      {"from":"dev3.in0","to":"dev0.out0"},
      {"from":"dev4.in0","to":"dev2.out0"},
      {"from":"dev5.in0","to":"dev6.out0"},
      {"from":"dev6.in0","to":"dev7.out0"},
      {"from":"dev7.in0","to":"dev8.out0"},
      {"from":"dev7.in1","to":"dev9.out0"},
      {"from":"dev8.in0","to":"dev3.out0"},
      {"from":"dev9.in0","to":"dev4.out0"}
    ],
    // Custom draw
    chipWidth: 2,
    draw: drawOR,
  },

  // 4: XOR
  {
    name: 'XOR',
    "devices":[
      {"type":"Toggle","id":"dev0","x":64,"y":24,"label":"Toggle","state":{"on":false}},
      {"type":"DC","id":"dev1","x":16,"y":48,"label":"DC"},
      {"type":"Toggle","id":"dev2","x":64,"y":72,"label":"Toggle","state":{"on":false}},
      {"type":"In","id":"dev3","x":112,"y":24,"label":""},
      {"type":"In","id":"dev4","x":112,"y":72,"label":""},
      {"type":"NOT","id":"dev5","x":160,"y":24,"label":"NOT"},
      {"type":"NOT","id":"dev6","x":160,"y":72,"label":"NOT"},
      {"type":"AND","id":"dev7","x":208,"y":24,"label":"AND"},
      {"type":"AND","id":"dev8","x":208,"y":72,"label":"AND"},
      {"type":"OR","id":"dev9","x":256,"y":48,"label":"OR"},
      {"type":"Out","id":"dev10","x":304,"y":48,"label":""},
      {"type":"LED","id":"dev11","x":352,"y":48,"label":"LED"}
    ],
    "connectors":[
      {"from":"dev0.in0","to":"dev1.out0"},
      {"from":"dev2.in0","to":"dev1.out0"},
      {"from":"dev3.in0","to":"dev0.out0"},
      {"from":"dev4.in0","to":"dev2.out0"},
      {"from":"dev5.in0","to":"dev3.out0"},
      {"from":"dev6.in0","to":"dev4.out0"},
      {"from":"dev7.in0","to":"dev5.out0"},
      {"from":"dev7.in1","to":"dev4.out0"},
      {"from":"dev8.in0","to":"dev3.out0"},
      {"from":"dev8.in1","to":"dev6.out0"},
      {"from":"dev9.in0","to":"dev7.out0"},
      {"from":"dev9.in1","to":"dev8.out0"},
      {"from":"dev10.in0","to":"dev9.out0"},
      {"from":"dev11.in0","to":"dev10.out0"}
    ],
    // Custom draw
    chipWidth: 2,
    draw: function(g, x, y, width, height) {
      drawOR(g, x + 3, y, width - 3, height)
      const depth = (width - 3) * 0.2
      g.moveTo(x, y + height)
      g.curveTo(x + depth, y + height, x + depth, y + height / 2)
      g.curveTo(x + depth, y, x, y)
      g.closePath()
    },
  },

  // 5: Multiplexor
  {
    name: 'Mux',
    "devices":[
      {"type":"Toggle","id":"dev0","x":64,"y":24,"label":"a","state":{"on":true}},
      {"type":"In","id":"dev1","x":112,"y":24,"label":""},
      {"type":"Toggle","id":"dev2","x":64,"y":72,"label":"b","state":{"on":false}},
      {"type":"In","id":"dev3","x":112,"y":72,"label":""},
      {"type":"Toggle","id":"dev4","x":64,"y":120,"label":"sel","state":{"on":false}},
      {"type":"In","id":"dev5","x":112,"y":120,"label":""},
      {"type":"DC","id":"dev6","x":16,"y":48,"label":"DC"},
      {"type":"Joint","id":"dev7","x":152,"y":128,"label":"Joint","state":{"direction":0}},
      {"type":"NOT","id":"dev8","x":184,"y":40,"label":"NOT"},
      {"type":"AND","id":"dev9","x":232,"y":24,"label":"AND"},
      {"type":"AND","id":"dev10","x":232,"y":72,"label":"AND"},
      {"type":"OR","id":"dev11","x":280,"y":48,"label":"OR"},
      {"type":"Out","id":"dev12","x":328,"y":48,"label":""},
      {"type":"LED","id":"dev13","x":376,"y":48,"label":"LED"}
    ],
    "connectors":[
      {"from":"dev0.in0","to":"dev6.out0"},
      {"from":"dev1.in0","to":"dev0.out0"},
      {"from":"dev2.in0","to":"dev6.out0"},
      {"from":"dev3.in0","to":"dev2.out0"},
      {"from":"dev4.in0","to":"dev6.out0"},
      {"from":"dev5.in0","to":"dev4.out0"},
      {"from":"dev7.in0","to":"dev5.out0"},
      {"from":"dev8.in0","to":"dev7.out0"},
      {"from":"dev9.in0","to":"dev1.out0"},
      {"from":"dev9.in1","to":"dev8.out0"},
      {"from":"dev10.in0","to":"dev3.out0"},
      {"from":"dev10.in1","to":"dev7.out0"},
      {"from":"dev11.in0","to":"dev9.out0"},
      {"from":"dev11.in1","to":"dev10.out0"},
      {"from":"dev12.in0","to":"dev11.out0"},
      {"from":"dev13.in0","to":"dev12.out0"}
    ],
  },

  // 6: Demultiplexor
  {
    name: 'DMux',
    "devices":[
      {"type":"In","id":"dev0","x":112,"y":24,"label":""},
      {"type":"DC","id":"dev1","x":16,"y":48,"label":"DC"},
      {"type":"Toggle","id":"dev2","x":64,"y":72,"label":"sel","state":{"on":false}},
      {"type":"In","id":"dev3","x":112,"y":72,"label":""},
      {"type":"Toggle","id":"dev4","x":64,"y":24,"label":"in","state":{"on":true}},
      {"type":"AND","id":"dev5","x":208,"y":24,"label":"AND"},
      {"type":"AND","id":"dev6","x":208,"y":72,"label":"AND"},
      {"type":"Out","id":"dev7","x":256,"y":24,"label":""},
      {"type":"LED","id":"dev8","x":304,"y":24,"label":"LED"},
      {"type":"Out","id":"dev9","x":256,"y":72,"label":""},
      {"type":"LED","id":"dev10","x":304,"y":72,"label":"LED"},
      {"type":"NOT","id":"dev11","x":160,"y":48,"label":"NOT"}
    ],
    "connectors":[
      {"from":"dev0.in0","to":"dev4.out0"},
      {"from":"dev2.in0","to":"dev1.out0"},
      {"from":"dev3.in0","to":"dev2.out0"},
      {"from":"dev4.in0","to":"dev1.out0"},
      {"from":"dev5.in0","to":"dev0.out0"},
      {"from":"dev5.in1","to":"dev11.out0"},
      {"from":"dev6.in0","to":"dev0.out0"},
      {"from":"dev6.in1","to":"dev3.out0"},
      {"from":"dev7.in0","to":"dev5.out0"},
      {"from":"dev8.in0","to":"dev7.out0"},
      {"from":"dev9.in0","to":"dev6.out0"},
      {"from":"dev10.in0","to":"dev9.out0"},
      {"from":"dev11.in0","to":"dev3.out0"}
    ],
  },

  // 7: Not16
  {
    name: 'Not16',
    width: 600,
    height: 500,
    halfPitch: true,
    noRender: true,
    // Custom draw
    chipWidth: 2,
    draw: function(g, x, y, width, height) {
      g.moveTo(x - 1, y)
      g.lineTo(x - 1 + width - 2, y + height / 2)
      g.lineTo(x - 1, y + height)
      g.lineTo(x - 1, y)
      g.closePath(true)

      g.drawCircle(x + width - 1, y + height / 2, 2)
    },
    "devices":[
      {"type":"In","id":"dev0","x":16,"y":24,"label":""},
      {"type":"In","id":"dev1","x":24,"y":48,"label":""},
      {"type":"In","id":"dev2","x":16,"y":72,"label":""},
      {"type":"In","id":"dev3","x":24,"y":96,"label":""},
      {"type":"In","id":"dev4","x":16,"y":120,"label":""},
      {"type":"In","id":"dev5","x":24,"y":144,"label":""},
      {"type":"In","id":"dev6","x":16,"y":168,"label":""},
      {"type":"In","id":"dev7","x":24,"y":192,"label":""},
      {"type":"NOT","id":"dev8","x":72,"y":24,"label":""},
      {"type":"NOT","id":"dev9","x":80,"y":48,"label":""},
      {"type":"NOT","id":"dev10","x":72,"y":72,"label":""},
      {"type":"NOT","id":"dev11","x":80,"y":96,"label":""},
      {"type":"NOT","id":"dev12","x":72,"y":120,"label":""},
      {"type":"NOT","id":"dev13","x":80,"y":144,"label":""},
      {"type":"NOT","id":"dev14","x":72,"y":168,"label":""},
      {"type":"NOT","id":"dev15","x":80,"y":192,"label":""},
      {"type":"Out","id":"dev16","x":128,"y":24,"label":""},
      {"type":"Out","id":"dev17","x":136,"y":48,"label":""},
      {"type":"Out","id":"dev18","x":128,"y":72,"label":""},
      {"type":"Out","id":"dev19","x":136,"y":96,"label":""},
      {"type":"Out","id":"dev20","x":128,"y":120,"label":""},
      {"type":"Out","id":"dev21","x":136,"y":144,"label":""},
      {"type":"Out","id":"dev22","x":128,"y":168,"label":""},
      {"type":"Out","id":"dev23","x":136,"y":192,"label":""},
      {"type":"In","id":"dev24","x":16,"y":216,"label":""},
      {"type":"In","id":"dev25","x":24,"y":240,"label":""},
      {"type":"In","id":"dev26","x":16,"y":264,"label":""},
      {"type":"In","id":"dev27","x":24,"y":288,"label":""},
      {"type":"In","id":"dev28","x":16,"y":312,"label":""},
      {"type":"In","id":"dev29","x":24,"y":336,"label":""},
      {"type":"In","id":"dev30","x":16,"y":360,"label":""},
      {"type":"In","id":"dev31","x":24,"y":384,"label":""},
      {"type":"NOT","id":"dev32","x":72,"y":216,"label":""},
      {"type":"NOT","id":"dev33","x":80,"y":240,"label":""},
      {"type":"NOT","id":"dev34","x":72,"y":264,"label":""},
      {"type":"NOT","id":"dev35","x":80,"y":288,"label":""},
      {"type":"NOT","id":"dev36","x":72,"y":312,"label":""},
      {"type":"NOT","id":"dev37","x":80,"y":336,"label":""},
      {"type":"NOT","id":"dev38","x":72,"y":360,"label":""},
      {"type":"NOT","id":"dev39","x":80,"y":384,"label":""},
      {"type":"Out","id":"dev40","x":128,"y":216,"label":""},
      {"type":"Out","id":"dev41","x":136,"y":240,"label":""},
      {"type":"Out","id":"dev42","x":128,"y":264,"label":""},
      {"type":"Out","id":"dev43","x":136,"y":288,"label":""},
      {"type":"Out","id":"dev44","x":128,"y":312,"label":""},
      {"type":"Out","id":"dev45","x":136,"y":336,"label":""},
      {"type":"Out","id":"dev46","x":128,"y":360,"label":""},
      {"type":"Out","id":"dev47","x":136,"y":384,"label":""}
    ],
    "connectors":[
      {"from":"dev8.in0","to":"dev0.out0"},
      {"from":"dev9.in0","to":"dev1.out0"},
      {"from":"dev10.in0","to":"dev2.out0"},
      {"from":"dev11.in0","to":"dev3.out0"},
      {"from":"dev12.in0","to":"dev4.out0"},
      {"from":"dev13.in0","to":"dev5.out0"},
      {"from":"dev14.in0","to":"dev6.out0"},
      {"from":"dev15.in0","to":"dev7.out0"},
      {"from":"dev16.in0","to":"dev8.out0"},
      {"from":"dev17.in0","to":"dev9.out0"},
      {"from":"dev18.in0","to":"dev10.out0"},
      {"from":"dev19.in0","to":"dev11.out0"},
      {"from":"dev20.in0","to":"dev12.out0"},
      {"from":"dev21.in0","to":"dev13.out0"},
      {"from":"dev22.in0","to":"dev14.out0"},
      {"from":"dev23.in0","to":"dev15.out0"},
      {"from":"dev32.in0","to":"dev24.out0"},
      {"from":"dev33.in0","to":"dev25.out0"},
      {"from":"dev34.in0","to":"dev26.out0"},
      {"from":"dev35.in0","to":"dev27.out0"},
      {"from":"dev36.in0","to":"dev28.out0"},
      {"from":"dev37.in0","to":"dev29.out0"},
      {"from":"dev38.in0","to":"dev30.out0"},
      {"from":"dev39.in0","to":"dev31.out0"},
      {"from":"dev40.in0","to":"dev32.out0"},
      {"from":"dev41.in0","to":"dev33.out0"},
      {"from":"dev42.in0","to":"dev34.out0"},
      {"from":"dev43.in0","to":"dev35.out0"},
      {"from":"dev44.in0","to":"dev36.out0"},
      {"from":"dev45.in0","to":"dev37.out0"},
      {"from":"dev46.in0","to":"dev38.out0"},
      {"from":"dev47.in0","to":"dev39.out0"}
    ],
  },

  // 8: And16
  {
    name: 'And16',
    width: 600,
    height: 600,
    halfPitch: true,
    noRender: true,
    // Custom draw
    chipWidth: 2,
    draw: function(g, x, y, width, height) {
      g.moveTo(x, y)
      g.curveTo(x + width, y, x + width, y + height / 2)
      g.curveTo(x + width, y + height, x, y + height)
      g.lineTo(x, y)
      g.closePath(true)
    },
    "devices":[
      {"type":"AND","id":"dev0","x":72,"y":24,"label":""},
      {"type":"AND","id":"dev1","x":72,"y":56,"label":""},
      {"type":"In","id":"dev2","x":16,"y":16,"label":""},
      {"type":"In","id":"dev3","x":24,"y":32,"label":"", inPort:{fill:'#cf0'}},
      {"type":"In","id":"dev4","x":16,"y":48,"label":""},
      {"type":"In","id":"dev5","x":24,"y":64,"label":"", inPort:{fill:'#cf0'}},
      {"type":"In","id":"dev6","x":16,"y":80,"label":""},
      {"type":"AND","id":"dev7","x":72,"y":88,"label":""},
      {"type":"In","id":"dev8","x":24,"y":96,"label":"", inPort:{fill:'#cf0'}},
      {"type":"Out","id":"dev9","x":120,"y":24,"label":""},
      {"type":"Out","id":"dev10","x":120,"y":56,"label":""},
      {"type":"Out","id":"dev11","x":120,"y":88,"label":""},
      {"type":"In","id":"dev12","x":16,"y":112,"label":""},
      {"type":"AND","id":"dev13","x":72,"y":120,"label":""},
      {"type":"In","id":"dev14","x":24,"y":128,"label":"", inPort:{fill:'#cf0'}},
      {"type":"Out","id":"dev15","x":120,"y":120,"label":""},
      {"type":"Out","id":"dev16","x":120,"y":152,"label":""},
      {"type":"In","id":"dev17","x":16,"y":144,"label":""},
      {"type":"In","id":"dev18","x":24,"y":160,"label":"", inPort:{fill:'#cf0'}},
      {"type":"AND","id":"dev19","x":72,"y":152,"label":""},
      {"type":"In","id":"dev20","x":16,"y":176,"label":""},
      {"type":"AND","id":"dev21","x":72,"y":184,"label":""},
      {"type":"In","id":"dev22","x":24,"y":192,"label":"", inPort:{fill:'#cf0'}},
      {"type":"Out","id":"dev23","x":120,"y":184,"label":""},
      {"type":"Out","id":"dev24","x":120,"y":216,"label":""},
      {"type":"AND","id":"dev25","x":72,"y":216,"label":""},
      {"type":"In","id":"dev26","x":16,"y":208,"label":""},
      {"type":"In","id":"dev27","x":24,"y":224,"label":"", inPort:{fill:'#cf0'}},
      {"type":"AND","id":"dev28","x":72,"y":248,"label":""},
      {"type":"In","id":"dev29","x":16,"y":240,"label":""},
      {"type":"In","id":"dev30","x":24,"y":256,"label":"", inPort:{fill:'#cf0'}},
      {"type":"Out","id":"dev31","x":120,"y":248,"label":""},
      {"type":"AND","id":"dev32","x":72,"y":288,"label":""},
      {"type":"AND","id":"dev33","x":72,"y":320,"label":""},
      {"type":"Out","id":"dev34","x":120,"y":288,"label":""},
      {"type":"Out","id":"dev35","x":120,"y":320,"label":""},
      {"type":"In","id":"dev36","x":16,"y":280,"label":""},
      {"type":"In","id":"dev37","x":24,"y":296,"label":"", inPort:{fill:'#cf0'}},
      {"type":"In","id":"dev38","x":16,"y":312,"label":""},
      {"type":"In","id":"dev39","x":24,"y":328,"label":"", inPort:{fill:'#cf0'}},
      {"type":"In","id":"dev40","x":16,"y":344,"label":""},
      {"type":"In","id":"dev41","x":24,"y":360,"label":"", inPort:{fill:'#cf0'}},
      {"type":"In","id":"dev42","x":16,"y":376,"label":""},
      {"type":"In","id":"dev43","x":24,"y":392,"label":"", inPort:{fill:'#cf0'}},
      {"type":"In","id":"dev44","x":16,"y":408,"label":""},
      {"type":"In","id":"dev45","x":24,"y":424,"label":"", inPort:{fill:'#cf0'}},
      {"type":"In","id":"dev46","x":16,"y":440,"label":""},
      {"type":"In","id":"dev47","x":24,"y":456,"label":"", inPort:{fill:'#cf0'}},
      {"type":"In","id":"dev48","x":16,"y":472,"label":""},
      {"type":"In","id":"dev49","x":24,"y":488,"label":"", inPort:{fill:'#cf0'}},
      {"type":"In","id":"dev50","x":16,"y":504,"label":""},
      {"type":"In","id":"dev51","x":24,"y":520,"label":"", inPort:{fill:'#cf0'}},
      {"type":"AND","id":"dev52","x":72,"y":352,"label":""},
      {"type":"AND","id":"dev53","x":72,"y":384,"label":""},
      {"type":"AND","id":"dev54","x":72,"y":416,"label":""},
      {"type":"AND","id":"dev55","x":72,"y":448,"label":""},
      {"type":"AND","id":"dev56","x":72,"y":480,"label":""},
      {"type":"AND","id":"dev57","x":72,"y":512,"label":""},
      {"type":"Out","id":"dev58","x":120,"y":352,"label":""},
      {"type":"Out","id":"dev59","x":120,"y":384,"label":""},
      {"type":"Out","id":"dev60","x":120,"y":416,"label":""},
      {"type":"Out","id":"dev61","x":120,"y":448,"label":""},
      {"type":"Out","id":"dev62","x":120,"y":480,"label":""},
      {"type":"Out","id":"dev63","x":120,"y":512,"label":""}
    ],
    "connectors":[
      {"from":"dev0.in0","to":"dev2.out0"},
      {"from":"dev0.in1","to":"dev3.out0"},
      {"from":"dev1.in0","to":"dev4.out0"},
      {"from":"dev1.in1","to":"dev5.out0"},
      {"from":"dev7.in0","to":"dev6.out0"},
      {"from":"dev7.in1","to":"dev8.out0"},
      {"from":"dev9.in0","to":"dev0.out0"},
      {"from":"dev10.in0","to":"dev1.out0"},
      {"from":"dev11.in0","to":"dev7.out0"},
      {"from":"dev13.in0","to":"dev12.out0"},
      {"from":"dev13.in1","to":"dev14.out0"},
      {"from":"dev15.in0","to":"dev13.out0"},
      {"from":"dev16.in0","to":"dev19.out0"},
      {"from":"dev19.in0","to":"dev17.out0"},
      {"from":"dev19.in1","to":"dev18.out0"},
      {"from":"dev21.in0","to":"dev20.out0"},
      {"from":"dev21.in1","to":"dev22.out0"},
      {"from":"dev23.in0","to":"dev21.out0"},
      {"from":"dev24.in0","to":"dev25.out0"},
      {"from":"dev25.in0","to":"dev26.out0"},
      {"from":"dev25.in1","to":"dev27.out0"},
      {"from":"dev28.in0","to":"dev29.out0"},
      {"from":"dev28.in1","to":"dev30.out0"},
      {"from":"dev31.in0","to":"dev28.out0"},
      {"from":"dev32.in0","to":"dev36.out0"},
      {"from":"dev32.in1","to":"dev37.out0"},
      {"from":"dev33.in0","to":"dev38.out0"},
      {"from":"dev33.in1","to":"dev39.out0"},
      {"from":"dev34.in0","to":"dev32.out0"},
      {"from":"dev35.in0","to":"dev33.out0"},
      {"from":"dev52.in0","to":"dev40.out0"},
      {"from":"dev52.in1","to":"dev41.out0"},
      {"from":"dev53.in0","to":"dev42.out0"},
      {"from":"dev53.in1","to":"dev43.out0"},
      {"from":"dev54.in0","to":"dev44.out0"},
      {"from":"dev54.in1","to":"dev45.out0"},
      {"from":"dev55.in0","to":"dev46.out0"},
      {"from":"dev55.in1","to":"dev47.out0"},
      {"from":"dev56.in0","to":"dev48.out0"},
      {"from":"dev56.in1","to":"dev49.out0"},
      {"from":"dev57.in0","to":"dev50.out0"},
      {"from":"dev57.in1","to":"dev51.out0"},
      {"from":"dev58.in0","to":"dev52.out0"},
      {"from":"dev59.in0","to":"dev53.out0"},
      {"from":"dev60.in0","to":"dev54.out0"},
      {"from":"dev61.in0","to":"dev55.out0"},
      {"from":"dev62.in0","to":"dev56.out0"},
      {"from":"dev63.in0","to":"dev57.out0"}
    ],
  },

  // Final
  {
  },
]

window.addEventListener('load', () => {
  const parents = document.querySelectorAll('.simcir-placeholder')
console.log(parents)
  if (!parents)
    return

  let toolbox = [
    {"type":"NAND"},
    {"type":"In"},
    {"type":"Out"},
    {"type":"DC"},
    {"type":"LED"},
    {"type":"Toggle"},
  ]

  let j = 0
  for (let i = 0; i < kDevices.length; ++i) {
    const parent = parents[j]
    if (parent == null)
      break

    const device = kDevices[i]
    let nextToolbox = toolbox
    device.toolbox = toolbox
    if (!device.noRender) {
      device.width = parent.clientWidth
      device.height = parent.clientHeight
    }
    if (device.name != null) {
      const name = device.name
      if (!device.noRegister) {
        simcir.registerDevice(name, device)
        nextToolbox = [{type: name}].concat(toolbox)
      }
    }

    if (!device.noRender) {
      const div = document.createElement('div')
      div.classList.add('simcir')
      parent.appendChild(div)
      simcir.setupSimcir([div], device)
      ++j
    }

    toolbox = nextToolbox
  }
})
