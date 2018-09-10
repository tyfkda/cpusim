///<reference path="./decl/simcirjs.d.ts" />

import {simcir} from 'simcirjs'
import './nandonly'

function drawNOT(g, x, y, width, height) {
  g.moveTo(x - 1, y)
  g.lineTo(x - 1 + width - 2, y + height / 2)
  g.lineTo(x - 1, y + height)
  g.lineTo(x - 1, y)
  g.closePath(true)

  g.drawCircle(x + width - 1, y + height / 2, 2)
}

function drawAND(g, x, y, width, height) {
  g.moveTo(x, y)
  g.curveTo(x + width, y, x + width, y + height / 2)
  g.curveTo(x + width, y + height, x, y + height)
  g.lineTo(x, y)
  g.closePath(true)
}

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
    noRegister: true,
    noToolbox: true,
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
    draw: drawNOT,
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
    draw: drawAND,
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
    draw: drawNOT,
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

  // And16
  {
    name: 'And16',
    width: 600,
    height: 600,
    halfPitch: true,
    noRender: true,
    // Custom draw
    chipWidth: 2,
    draw: drawAND,
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

  // HalfAdder
  {
    name: 'HalfAdder',
    width: 600,
    height: 400,
    "devices":[
      {"type":"In","id":"dev0","x":112,"y":24,"label":"a"},
      {"type":"LED","id":"dev1","x":256,"y":24,"label":"LED"},
      {"type":"Toggle","id":"dev2","x":64,"y":24,"label":"Toggle","state":{"on":false}},
      {"type":"Toggle","id":"dev3","x":64,"y":72,"label":"Toggle","state":{"on":false}},
      {"type":"DC","id":"dev4","x":16,"y":48,"label":"DC"},
      {"type":"In","id":"dev5","x":112,"y":72,"label":"b"},
      {"type":"LED","id":"dev6","x":256,"y":72,"label":"LED"},
      {"type":"AND","id":"dev7","x":160,"y":72,"label":"AND"},
      {"type":"Out","id":"dev8","x":208,"y":72,"label":"Carry"},
      {"type":"Out","id":"dev9","x":208,"y":24,"label":"Sum"},
      {"type":"XOR","id":"dev10","x":160,"y":24,"label":"XOR"}
    ],
    "connectors":[
      {"from":"dev0.in0","to":"dev2.out0"},
      {"from":"dev1.in0","to":"dev9.out0"},
      {"from":"dev2.in0","to":"dev4.out0"},
      {"from":"dev3.in0","to":"dev4.out0"},
      {"from":"dev5.in0","to":"dev3.out0"},
      {"from":"dev6.in0","to":"dev8.out0"},
      {"from":"dev7.in0","to":"dev0.out0"},
      {"from":"dev7.in1","to":"dev5.out0"},
      {"from":"dev8.in0","to":"dev7.out0"},
      {"from":"dev9.in0","to":"dev10.out0"},
      {"from":"dev10.in0","to":"dev0.out0"},
      {"from":"dev10.in1","to":"dev5.out0"}
    ],
  },

  // FullAdder
  {
    name: 'FullAdder',
    width: 600,
    height: 400,
    "devices":[
      {"type":"Toggle","id":"dev0","x":64,"y":24,"label":"Toggle","state":{"on":false}},
      {"type":"DC","id":"dev1","x":16,"y":72,"label":"DC"},
      {"type":"Toggle","id":"dev2","x":64,"y":120,"label":"Toggle","state":{"on":false}},
      {"type":"In","id":"dev3","x":112,"y":24,"label":"a"},
      {"type":"In","id":"dev4","x":112,"y":72,"label":"b"},
      {"type":"In","id":"dev5","x":112,"y":120,"label":"c"},
      {"type":"Toggle","id":"dev6","x":64,"y":72,"label":"Toggle","state":{"on":false}},
      {"type":"LED","id":"dev7","x":336,"y":96,"label":"LED"},
      {"type":"HalfAdder","id":"dev8","x":160,"y":96,"label":"HalfAdder"},
      {"type":"HalfAdder","id":"dev9","x":160,"y":40,"label":"HalfAdder"},
      {"type":"OR","id":"dev10","x":240,"y":96,"label":"OR"},
      {"type":"Out","id":"dev11","x":288,"y":96,"label":"carry"},
      {"type":"Out","id":"dev12","x":288,"y":48,"label":"sum"},
      {"type":"LED","id":"dev13","x":336,"y":48,"label":"LED"}
    ],
    "connectors":[
      {"from":"dev0.in0","to":"dev1.out0"},
      {"from":"dev2.in0","to":"dev1.out0"},
      {"from":"dev3.in0","to":"dev0.out0"},
      {"from":"dev4.in0","to":"dev6.out0"},
      {"from":"dev5.in0","to":"dev2.out0"},
      {"from":"dev6.in0","to":"dev1.out0"},
      {"from":"dev7.in0","to":"dev11.out0"},
      {"from":"dev8.in0","to":"dev9.out0"},
      {"from":"dev8.in1","to":"dev5.out0"},
      {"from":"dev9.in0","to":"dev3.out0"},
      {"from":"dev9.in1","to":"dev4.out0"},
      {"from":"dev10.in0","to":"dev9.out1"},
      {"from":"dev10.in1","to":"dev8.out1"},
      {"from":"dev11.in0","to":"dev10.out0"},
      {"from":"dev12.in0","to":"dev8.out0"},
      {"from":"dev13.in0","to":"dev12.out0"}
    ],
  },

  // Add4
  {
    name: 'Add4',
    width: 600,
    height: 350,
    noRender: true,
    noToolbox: true,
    halfPitch: true,
    "devices":[
      {"type":"FullAdder","id":"dev0","x":168,"y":104,"label":"FullAdder"},
      {"type":"FullAdder","id":"dev1","x":168,"y":168,"label":"FullAdder"},
      {"type":"LED","id":"dev2","x":296,"y":48,"label":"LED"},
      {"type":"LED","id":"dev3","x":296,"y":104,"label":"LED"},
      {"type":"LED","id":"dev4","x":296,"y":168,"label":"LED"},
      {"type":"Out","id":"dev5","x":248,"y":48,"label":""},
      {"type":"Out","id":"dev6","x":248,"y":104,"label":""},
      {"type":"Out","id":"dev7","x":248,"y":168,"label":""},
      {"type":"FullAdder","id":"dev8","x":168,"y":232,"label":"FullAdder"},
      {"type":"LED","id":"dev9","x":296,"y":232,"label":"LED"},
      {"type":"DC","id":"dev10","x":8,"y":152,"label":"DC"},
      {"type":"Out","id":"dev11","x":248,"y":232,"label":""},
      {"type":"Out","id":"dev12","x":248,"y":288,"label":""},
      {"type":"LED","id":"dev13","x":296,"y":288,"label":"LED"},
      {"type":"FullAdder","id":"dev14","x":168,"y":40,"label":"FullAdder"},
      {"type":"In","id":"dev15","x":88,"y":16,"label":"", inPort:{fill:'#fcf'}},
      {"type":"Toggle","id":"dev16","x":64,"y":40,"label":"Toggle","state":{"on":false}},
      {"type":"In","id":"dev17","x":104,"y":40,"label":""},
      {"type":"Toggle","id":"dev18","x":72,"y":64,"label":"Toggle","state":{"on":false}},
      {"type":"In","id":"dev19","x":112,"y":64,"label":"", inPort:{fill:'#cf0'}},
      {"type":"Toggle","id":"dev20","x":64,"y":104,"label":"Toggle","state":{"on":false}},
      {"type":"In","id":"dev21","x":104,"y":104,"label":""},
      {"type":"Toggle","id":"dev22","x":72,"y":128,"label":"Toggle","state":{"on":false}},
      {"type":"In","id":"dev23","x":112,"y":128,"label":"", inPort:{fill:'#cf0'}},
      {"type":"Toggle","id":"dev24","x":64,"y":168,"label":"Toggle","state":{"on":false}},
      {"type":"In","id":"dev25","x":104,"y":168,"label":""},
      {"type":"Toggle","id":"dev26","x":72,"y":192,"label":"Toggle","state":{"on":false}},
      {"type":"In","id":"dev27","x":112,"y":192,"label":"", inPort:{fill:'#cf0'}},
      {"type":"Toggle","id":"dev28","x":64,"y":232,"label":"Toggle","state":{"on":false}},
      {"type":"In","id":"dev29","x":104,"y":232,"label":""},
      {"type":"Toggle","id":"dev30","x":72,"y":256,"label":"Toggle","state":{"on":false}},
      {"type":"In","id":"dev31","x":112,"y":256,"label":"", inPort:{fill:'#cf0'}}
    ],
    "connectors":[
      {"from":"dev0.in0","to":"dev14.out1"},
      {"from":"dev0.in1","to":"dev21.out0"},
      {"from":"dev0.in2","to":"dev23.out0"},
      {"from":"dev1.in0","to":"dev0.out1"},
      {"from":"dev1.in1","to":"dev25.out0"},
      {"from":"dev1.in2","to":"dev27.out0"},
      {"from":"dev2.in0","to":"dev5.out0"},
      {"from":"dev3.in0","to":"dev6.out0"},
      {"from":"dev4.in0","to":"dev7.out0"},
      {"from":"dev5.in0","to":"dev14.out0"},
      {"from":"dev6.in0","to":"dev0.out0"},
      {"from":"dev7.in0","to":"dev1.out0"},
      {"from":"dev8.in0","to":"dev1.out1"},
      {"from":"dev8.in1","to":"dev29.out0"},
      {"from":"dev8.in2","to":"dev31.out0"},
      {"from":"dev9.in0","to":"dev11.out0"},
      {"from":"dev11.in0","to":"dev8.out0"},
      {"from":"dev12.in0","to":"dev8.out1"},
      {"from":"dev13.in0","to":"dev12.out0"},
      {"from":"dev14.in0","to":"dev15.out0"},
      {"from":"dev14.in1","to":"dev17.out0"},
      {"from":"dev14.in2","to":"dev19.out0"},
      {"from":"dev16.in0","to":"dev10.out0"},
      {"from":"dev17.in0","to":"dev16.out0"},
      {"from":"dev18.in0","to":"dev10.out0"},
      {"from":"dev19.in0","to":"dev18.out0"},
      {"from":"dev20.in0","to":"dev10.out0"},
      {"from":"dev21.in0","to":"dev20.out0"},
      {"from":"dev22.in0","to":"dev10.out0"},
      {"from":"dev23.in0","to":"dev22.out0"},
      {"from":"dev24.in0","to":"dev10.out0"},
      {"from":"dev25.in0","to":"dev24.out0"},
      {"from":"dev26.in0","to":"dev10.out0"},
      {"from":"dev27.in0","to":"dev26.out0"},
      {"from":"dev28.in0","to":"dev10.out0"},
      {"from":"dev29.in0","to":"dev28.out0"},
      {"from":"dev30.in0","to":"dev10.out0"},
      {"from":"dev31.in0","to":"dev30.out0"}
    ],
  },

  // Add16
  {
    name: 'Add16',
    width: 600,
    height: 500,
    halfPitch: true,
    "devices":[
      {"type":"In","id":"dev0","x":40,"y":232,"label":"", inPort:{fill:'#cf0'}},
      {"type":"In","id":"dev1","x":32,"y":40,"label":""},
      {"type":"In","id":"dev2","x":32,"y":48,"label":""},
      {"type":"In","id":"dev3","x":32,"y":56,"label":""},
      {"type":"In","id":"dev4","x":32,"y":64,"label":""},
      {"type":"In","id":"dev5","x":32,"y":72,"label":""},
      {"type":"In","id":"dev6","x":32,"y":80,"label":""},
      {"type":"In","id":"dev7","x":32,"y":88,"label":""},
      {"type":"In","id":"dev8","x":32,"y":96,"label":""},
      {"type":"In","id":"dev9","x":32,"y":104,"label":""},
      {"type":"In","id":"dev10","x":32,"y":112,"label":""},
      {"type":"In","id":"dev11","x":32,"y":120,"label":""},
      {"type":"In","id":"dev12","x":32,"y":128,"label":""},
      {"type":"In","id":"dev13","x":40,"y":240,"label":"", inPort:{fill:'#cf0'}},
      {"type":"In","id":"dev14","x":40,"y":248,"label":"", inPort:{fill:'#cf0'}},
      {"type":"In","id":"dev15","x":40,"y":256,"label":"", inPort:{fill:'#cf0'}},
      {"type":"In","id":"dev16","x":40,"y":264,"label":"", inPort:{fill:'#cf0'}},
      {"type":"In","id":"dev17","x":40,"y":272,"label":"", inPort:{fill:'#cf0'}},
      {"type":"In","id":"dev18","x":40,"y":280,"label":"", inPort:{fill:'#cf0'}},
      {"type":"In","id":"dev19","x":40,"y":288,"label":"", inPort:{fill:'#cf0'}},
      {"type":"In","id":"dev20","x":40,"y":296,"label":"", inPort:{fill:'#cf0'}},
      {"type":"In","id":"dev21","x":40,"y":304,"label":"", inPort:{fill:'#cf0'}},
      {"type":"In","id":"dev22","x":40,"y":312,"label":"", inPort:{fill:'#cf0'}},
      {"type":"In","id":"dev23","x":40,"y":320,"label":"", inPort:{fill:'#cf0'}},
      {"type":"In","id":"dev24","x":32,"y":136,"label":""},
      {"type":"In","id":"dev25","x":32,"y":144,"label":""},
      {"type":"In","id":"dev26","x":32,"y":152,"label":""},
      {"type":"In","id":"dev27","x":32,"y":160,"label":""},
      {"type":"In","id":"dev28","x":40,"y":328,"label":"", inPort:{fill:'#cf0'}},
      {"type":"In","id":"dev29","x":40,"y":336,"label":"", inPort:{fill:'#cf0'}},
      {"type":"In","id":"dev30","x":40,"y":344,"label":"", inPort:{fill:'#cf0'}},
      {"type":"In","id":"dev31","x":40,"y":352,"label":"", inPort:{fill:'#cf0'}},
      {"type":"Add4","id":"dev32","x":120,"y":24,"label":"Add4"},
      {"type":"Add4","id":"dev33","x":120,"y":120,"label":"Add4"},
      {"type":"Add4","id":"dev34","x":120,"y":216,"label":"Add4"},
      {"type":"Add4","id":"dev35","x":120,"y":312,"label":"Add4"},
      {"type":"Out","id":"dev36","x":224,"y":24,"label":""},
      {"type":"Out","id":"dev37","x":224,"y":40,"label":""},
      {"type":"Out","id":"dev38","x":224,"y":56,"label":""},
      {"type":"Out","id":"dev39","x":224,"y":72,"label":""},
      {"type":"Out","id":"dev40","x":224,"y":120,"label":""},
      {"type":"Out","id":"dev41","x":224,"y":136,"label":""},
      {"type":"Out","id":"dev42","x":224,"y":152,"label":""},
      {"type":"Out","id":"dev43","x":224,"y":168,"label":""},
      {"type":"Out","id":"dev44","x":224,"y":216,"label":""},
      {"type":"Out","id":"dev45","x":224,"y":232,"label":""},
      {"type":"Out","id":"dev46","x":224,"y":248,"label":""},
      {"type":"Out","id":"dev47","x":224,"y":264,"label":""},
      {"type":"Out","id":"dev48","x":224,"y":312,"label":""},
      {"type":"Out","id":"dev49","x":224,"y":328,"label":""},
      {"type":"Out","id":"dev50","x":224,"y":344,"label":""},
      {"type":"Out","id":"dev51","x":224,"y":360,"label":""}
    ],
    "connectors":[
      {"from":"dev32.in1","to":"dev1.out0"},
      {"from":"dev32.in2","to":"dev2.out0"},
      {"from":"dev32.in3","to":"dev3.out0"},
      {"from":"dev32.in4","to":"dev4.out0"},
      {"from":"dev32.in5","to":"dev0.out0"},
      {"from":"dev32.in6","to":"dev13.out0"},
      {"from":"dev32.in7","to":"dev14.out0"},
      {"from":"dev32.in8","to":"dev15.out0"},
      {"from":"dev33.in0","to":"dev32.out4"},
      {"from":"dev33.in1","to":"dev5.out0"},
      {"from":"dev33.in2","to":"dev6.out0"},
      {"from":"dev33.in3","to":"dev7.out0"},
      {"from":"dev33.in4","to":"dev8.out0"},
      {"from":"dev33.in5","to":"dev16.out0"},
      {"from":"dev33.in6","to":"dev17.out0"},
      {"from":"dev33.in7","to":"dev18.out0"},
      {"from":"dev33.in8","to":"dev19.out0"},
      {"from":"dev34.in0","to":"dev33.out4"},
      {"from":"dev34.in1","to":"dev9.out0"},
      {"from":"dev34.in2","to":"dev10.out0"},
      {"from":"dev34.in3","to":"dev11.out0"},
      {"from":"dev34.in4","to":"dev12.out0"},
      {"from":"dev34.in5","to":"dev20.out0"},
      {"from":"dev34.in6","to":"dev21.out0"},
      {"from":"dev34.in7","to":"dev22.out0"},
      {"from":"dev34.in8","to":"dev23.out0"},
      {"from":"dev35.in0","to":"dev34.out4"},
      {"from":"dev35.in1","to":"dev24.out0"},
      {"from":"dev35.in2","to":"dev25.out0"},
      {"from":"dev35.in3","to":"dev26.out0"},
      {"from":"dev35.in4","to":"dev27.out0"},
      {"from":"dev35.in5","to":"dev28.out0"},
      {"from":"dev35.in6","to":"dev29.out0"},
      {"from":"dev35.in7","to":"dev30.out0"},
      {"from":"dev35.in8","to":"dev31.out0"},
      {"from":"dev36.in0","to":"dev32.out0"},
      {"from":"dev37.in0","to":"dev32.out1"},
      {"from":"dev38.in0","to":"dev32.out2"},
      {"from":"dev39.in0","to":"dev32.out3"},
      {"from":"dev40.in0","to":"dev33.out0"},
      {"from":"dev41.in0","to":"dev33.out1"},
      {"from":"dev42.in0","to":"dev33.out2"},
      {"from":"dev43.in0","to":"dev33.out3"},
      {"from":"dev44.in0","to":"dev34.out0"},
      {"from":"dev45.in0","to":"dev34.out1"},
      {"from":"dev46.in0","to":"dev34.out2"},
      {"from":"dev47.in0","to":"dev34.out3"},
      {"from":"dev48.in0","to":"dev35.out0"},
      {"from":"dev49.in0","to":"dev35.out1"},
      {"from":"dev50.in0","to":"dev35.out2"},
      {"from":"dev51.in0","to":"dev35.out3"}
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
      if (!device.noRegister)
        simcir.registerDevice(name, device)
      if (!device.noToolbox)
        nextToolbox = [{type: name}].concat(toolbox)
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
