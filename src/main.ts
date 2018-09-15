///<reference path="./decl/simcirjs.d.ts" />

import {simcir} from 'simcirjs'
import './nandonly'

function drawNOT(g: any, x: number, y: number, width: number, height: number) {
  g.moveTo(x - 1, y)
  g.lineTo(x - 1 + width - 2, y + height / 2)
  g.lineTo(x - 1, y + height)
  g.lineTo(x - 1, y)
  g.closePath(true)

  g.drawCircle(x + width - 1, y + height / 2, 2)
}

function drawAND(g: any, x: number, y: number, width: number, height: number) {
  g.moveTo(x, y)
  g.curveTo(x + width, y, x + width, y + height / 2)
  g.curveTo(x + width, y + height, x, y + height)
  g.lineTo(x, y)
  g.closePath(true)
}

function drawOR(g: any, x: number, y: number, width: number, height: number) {
  const depth = width * 0.2
  g.moveTo(x, y)
  g.curveTo(x + width - depth, y, x + width, y + height / 2)
  g.curveTo(x + width - depth, y + height, x, y + height)
  g.curveTo(x + depth, y + height, x + depth, y + height / 2)
  g.curveTo(x + depth, y, x, y)
  g.closePath(true)
}

function drawXOR(g: any, x: number, y: number, width: number, height: number) {
  drawOR(g, x + 3, y, width - 3, height)
  const depth = (width - 3) * 0.2
  g.moveTo(x, y + height)
  g.curveTo(x + depth, y + height, x + depth, y + height / 2)
  g.curveTo(x + depth, y, x, y)
  g.closePath()
}

const kDevices: any = [
  // NAND
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

  // NOT
  {
    name: 'NOT',
    // Custom draw
    chipWidth: 2,
    draw: drawNOT,
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
  },

  // AND
  {
    name: 'AND',
    // Custom draw
    chipWidth: 2,
    draw: drawAND,
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
  },

  // OR
  {
    name: 'OR',
    // Custom draw
    chipWidth: 2,
    draw: drawOR,
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
  },

  // XOR
  {
    name: 'XOR',
    // Custom draw
    chipWidth: 2,
    draw: drawXOR,
    "devices":[
      {"type":"Toggle","id":"dev0","x":64,"y":24,"label":"Toggle","state":{"on":false}},
      {"type":"DC","id":"dev1","x":16,"y":48,"label":"DC"},
      {"type":"Toggle","id":"dev2","x":64,"y":72,"label":"Toggle","state":{"on":false}},
      {"type":"In","id":"dev3","x":112,"y":24,"label":""},
      {"type":"In","id":"dev4","x":112,"y":72,"label":""},
      {"type":"Out","id":"dev5","x":256,"y":48,"label":""},
      {"type":"LED","id":"dev6","x":304,"y":48,"label":"LED"},
      {"type":"OR","id":"dev7","x":160,"y":24,"label":"OR"},
      {"type":"NAND","id":"dev8","x":160,"y":72,"label":"NAND"},
      {"type":"AND","id":"dev9","x":208,"y":48,"label":"AND"}
    ],
    "connectors":[
      {"from":"dev0.in0","to":"dev1.out0"},
      {"from":"dev2.in0","to":"dev1.out0"},
      {"from":"dev3.in0","to":"dev0.out0"},
      {"from":"dev4.in0","to":"dev2.out0"},
      {"from":"dev5.in0","to":"dev9.out0"},
      {"from":"dev6.in0","to":"dev5.out0"},
      {"from":"dev7.in0","to":"dev3.out0"},
      {"from":"dev7.in1","to":"dev4.out0"},
      {"from":"dev8.in0","to":"dev3.out0"},
      {"from":"dev8.in1","to":"dev4.out0"},
      {"from":"dev9.in0","to":"dev7.out0"},
      {"from":"dev9.in1","to":"dev8.out0"}
    ],
  },

  // Multiplexor
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

  // Demultiplexor
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

  // Not16
  {
    name: 'Not16',
    width: 600,
    height: 500,
    noRender: true,
    // Custom draw
    chipWidth: 2,
    draw: drawNOT,
    "devices":[
      {"type":"NOT","id":"dev0","x":120,"y":24,"label":""},
      {"type":"NOT","id":"dev1","x":128,"y":48,"label":""},
      {"type":"NOT","id":"dev2","x":120,"y":72,"label":""},
      {"type":"NOT","id":"dev3","x":128,"y":96,"label":""},
      {"type":"NOT","id":"dev4","x":120,"y":120,"label":""},
      {"type":"NOT","id":"dev5","x":128,"y":144,"label":""},
      {"type":"NOT","id":"dev6","x":120,"y":168,"label":""},
      {"type":"NOT","id":"dev7","x":128,"y":192,"label":""},
      {"type":"NOT","id":"dev8","x":120,"y":216,"label":""},
      {"type":"NOT","id":"dev9","x":128,"y":240,"label":""},
      {"type":"NOT","id":"dev10","x":120,"y":264,"label":""},
      {"type":"NOT","id":"dev11","x":128,"y":288,"label":""},
      {"type":"NOT","id":"dev12","x":120,"y":312,"label":""},
      {"type":"NOT","id":"dev13","x":128,"y":336,"label":""},
      {"type":"NOT","id":"dev14","x":120,"y":360,"label":""},
      {"type":"NOT","id":"dev15","x":128,"y":384,"label":""},
      {"type":"Out","id":"dev16","x":256,"y":184,"label":""},
      {"type":"In","id":"dev17","x":8,"y":176,"label":""},
      {"type":"In","id":"dev18","x":8,"y":216,"label":""},
      {"type":"Out","id":"dev19","x":256,"y":224,"label":""},
      {"type":"BusIn","id":"dev20","x":64,"y":272,"label":"BusIn"},
      {"type":"BusIn","id":"dev21","x":64,"y":88,"label":"BusIn"},
      {"type":"BusOut","id":"dev22","x":192,"y":88,"label":"BusOut"},
      {"type":"BusOut","id":"dev23","x":192,"y":272,"label":"BusOut"}
    ],
    "connectors":[
      {"from":"dev0.in0","to":"dev21.out0"},
      {"from":"dev1.in0","to":"dev21.out1"},
      {"from":"dev2.in0","to":"dev21.out2"},
      {"from":"dev3.in0","to":"dev21.out3"},
      {"from":"dev4.in0","to":"dev21.out4"},
      {"from":"dev5.in0","to":"dev21.out5"},
      {"from":"dev6.in0","to":"dev21.out6"},
      {"from":"dev7.in0","to":"dev21.out7"},
      {"from":"dev8.in0","to":"dev20.out0"},
      {"from":"dev9.in0","to":"dev20.out1"},
      {"from":"dev10.in0","to":"dev20.out2"},
      {"from":"dev11.in0","to":"dev20.out3"},
      {"from":"dev12.in0","to":"dev20.out4"},
      {"from":"dev13.in0","to":"dev20.out5"},
      {"from":"dev14.in0","to":"dev20.out6"},
      {"from":"dev15.in0","to":"dev20.out7"},
      {"from":"dev16.in0","to":"dev22.out0"},
      {"from":"dev19.in0","to":"dev23.out0"},
      {"from":"dev20.in0","to":"dev18.out0"},
      {"from":"dev21.in0","to":"dev17.out0"},
      {"from":"dev22.in0","to":"dev0.out0"},
      {"from":"dev22.in1","to":"dev1.out0"},
      {"from":"dev22.in2","to":"dev2.out0"},
      {"from":"dev22.in3","to":"dev3.out0"},
      {"from":"dev22.in4","to":"dev4.out0"},
      {"from":"dev22.in5","to":"dev5.out0"},
      {"from":"dev22.in6","to":"dev6.out0"},
      {"from":"dev22.in7","to":"dev7.out0"},
      {"from":"dev23.in0","to":"dev8.out0"},
      {"from":"dev23.in1","to":"dev9.out0"},
      {"from":"dev23.in2","to":"dev10.out0"},
      {"from":"dev23.in3","to":"dev11.out0"},
      {"from":"dev23.in4","to":"dev12.out0"},
      {"from":"dev23.in5","to":"dev13.out0"},
      {"from":"dev23.in6","to":"dev14.out0"},
      {"from":"dev23.in7","to":"dev15.out0"}
    ],
  },

  // And16
  {
    name: 'And16',
    width: 600,
    height: 600,
    noRender: true,
    // Custom draw
    chipWidth: 2,
    draw: drawAND,
    "devices":[
      {"type":"AND","id":"dev0","x":152,"y":16,"label":""},
      {"type":"AND","id":"dev1","x":152,"y":48,"label":""},
      {"type":"AND","id":"dev2","x":152,"y":80,"label":""},
      {"type":"Out","id":"dev3","x":280,"y":272,"label":""},
      {"type":"AND","id":"dev4","x":152,"y":112,"label":""},
      {"type":"AND","id":"dev5","x":152,"y":144,"label":""},
      {"type":"AND","id":"dev6","x":152,"y":176,"label":""},
      {"type":"AND","id":"dev7","x":152,"y":208,"label":""},
      {"type":"AND","id":"dev8","x":152,"y":240,"label":""},
      {"type":"AND","id":"dev9","x":152,"y":280,"label":""},
      {"type":"AND","id":"dev10","x":152,"y":312,"label":""},
      {"type":"AND","id":"dev11","x":152,"y":344,"label":""},
      {"type":"AND","id":"dev12","x":152,"y":376,"label":""},
      {"type":"AND","id":"dev13","x":152,"y":408,"label":""},
      {"type":"AND","id":"dev14","x":152,"y":440,"label":""},
      {"type":"AND","id":"dev15","x":152,"y":472,"label":""},
      {"type":"AND","id":"dev16","x":152,"y":504,"label":""},
      {"type":"Out","id":"dev17","x":280,"y":240,"label":""},
      {"type":"BusIn","id":"dev18","x":80,"y":64,"label":"a0-7"},
      {"type":"BusIn","id":"dev19","x":80,"y":320,"label":"a8-15"},
      {"type":"BusIn","id":"dev20","x":80,"y":408,"label":"b8-15"},
      {"type":"BusIn","id":"dev21","x":80,"y":160,"label":"b0-7"},
      {"type":"In","id":"dev22","x":24,"y":80,"label":""},
      {"type":"In","id":"dev23","x":32,"y":184,"label":"","inPort":{"fill":"#cf0"}},
      {"type":"In","id":"dev24","x":32,"y":432,"label":"","inPort":{"fill":"#cf0"}},
      {"type":"In","id":"dev25","x":24,"y":336,"label":""},
      {"type":"BusOut","id":"dev26","x":216,"y":112,"label":"BusOut"},
      {"type":"BusOut","id":"dev27","x":216,"y":360,"label":"BusOut"}
    ],
    "connectors":[
      {"from":"dev0.in0","to":"dev18.out0"},
      {"from":"dev0.in1","to":"dev21.out0"},
      {"from":"dev1.in0","to":"dev18.out1"},
      {"from":"dev1.in1","to":"dev21.out1"},
      {"from":"dev2.in0","to":"dev18.out2"},
      {"from":"dev2.in1","to":"dev21.out2"},
      {"from":"dev3.in0","to":"dev27.out0"},
      {"from":"dev4.in0","to":"dev18.out3"},
      {"from":"dev4.in1","to":"dev21.out3"},
      {"from":"dev5.in0","to":"dev18.out4"},
      {"from":"dev5.in1","to":"dev21.out4"},
      {"from":"dev6.in0","to":"dev18.out5"},
      {"from":"dev6.in1","to":"dev21.out5"},
      {"from":"dev7.in0","to":"dev18.out6"},
      {"from":"dev7.in1","to":"dev21.out6"},
      {"from":"dev8.in0","to":"dev18.out7"},
      {"from":"dev8.in1","to":"dev21.out7"},
      {"from":"dev9.in0","to":"dev19.out0"},
      {"from":"dev9.in1","to":"dev20.out0"},
      {"from":"dev10.in0","to":"dev19.out1"},
      {"from":"dev10.in1","to":"dev20.out1"},
      {"from":"dev11.in0","to":"dev19.out2"},
      {"from":"dev11.in1","to":"dev20.out2"},
      {"from":"dev12.in0","to":"dev19.out3"},
      {"from":"dev12.in1","to":"dev20.out3"},
      {"from":"dev13.in0","to":"dev19.out4"},
      {"from":"dev13.in1","to":"dev20.out4"},
      {"from":"dev14.in0","to":"dev19.out5"},
      {"from":"dev14.in1","to":"dev20.out5"},
      {"from":"dev15.in0","to":"dev19.out6"},
      {"from":"dev15.in1","to":"dev20.out6"},
      {"from":"dev16.in0","to":"dev19.out7"},
      {"from":"dev16.in1","to":"dev20.out7"},
      {"from":"dev17.in0","to":"dev26.out0"},
      {"from":"dev18.in0","to":"dev22.out0"},
      {"from":"dev19.in0","to":"dev25.out0"},
      {"from":"dev20.in0","to":"dev24.out0"},
      {"from":"dev21.in0","to":"dev23.out0"},
      {"from":"dev26.in0","to":"dev0.out0"},
      {"from":"dev26.in1","to":"dev1.out0"},
      {"from":"dev26.in2","to":"dev2.out0"},
      {"from":"dev26.in3","to":"dev4.out0"},
      {"from":"dev26.in4","to":"dev5.out0"},
      {"from":"dev26.in5","to":"dev6.out0"},
      {"from":"dev26.in6","to":"dev7.out0"},
      {"from":"dev26.in7","to":"dev8.out0"},
      {"from":"dev27.in0","to":"dev9.out0"},
      {"from":"dev27.in1","to":"dev10.out0"},
      {"from":"dev27.in2","to":"dev11.out0"},
      {"from":"dev27.in3","to":"dev12.out0"},
      {"from":"dev27.in4","to":"dev13.out0"},
      {"from":"dev27.in5","to":"dev14.out0"},
      {"from":"dev27.in6","to":"dev15.out0"},
      {"from":"dev27.in7","to":"dev16.out0"}
    ],
  },

  // Or16
  {
    name: 'Or16',
    width: 600,
    height: 600,
    noRender: true,
    // Custom draw
    chipWidth: 2,
    draw: drawOR,
    "devices":[
      {"type":"Out","id":"dev0","x":280,"y":272,"label":""},
      {"type":"Out","id":"dev1","x":280,"y":240,"label":""},
      {"type":"BusIn","id":"dev2","x":80,"y":64,"label":"a0-7"},
      {"type":"BusIn","id":"dev3","x":80,"y":320,"label":"a8-15"},
      {"type":"BusIn","id":"dev4","x":80,"y":408,"label":"b8-15"},
      {"type":"BusIn","id":"dev5","x":80,"y":160,"label":"b0-7"},
      {"type":"In","id":"dev6","x":24,"y":80,"label":""},
      {"type":"In","id":"dev7","x":32,"y":184,"label":"","inPort":{"fill":"#cf0"}},
      {"type":"In","id":"dev8","x":32,"y":432,"label":"","inPort":{"fill":"#cf0"}},
      {"type":"In","id":"dev9","x":24,"y":336,"label":""},
      {"type":"BusOut","id":"dev10","x":216,"y":112,"label":"BusOut"},
      {"type":"BusOut","id":"dev11","x":216,"y":360,"label":"BusOut"},
      {"type":"OR","id":"dev12","x":152,"y":8,"label":"OR"},
      {"type":"OR","id":"dev13","x":152,"y":40,"label":"OR"},
      {"type":"OR","id":"dev14","x":152,"y":72,"label":"OR"},
      {"type":"OR","id":"dev15","x":152,"y":104,"label":"OR"},
      {"type":"OR","id":"dev16","x":152,"y":136,"label":"OR"},
      {"type":"OR","id":"dev17","x":152,"y":168,"label":"OR"},
      {"type":"OR","id":"dev18","x":152,"y":200,"label":"OR"},
      {"type":"OR","id":"dev19","x":152,"y":232,"label":"OR"},
      {"type":"OR","id":"dev20","x":152,"y":280,"label":"OR"},
      {"type":"OR","id":"dev21","x":152,"y":312,"label":"OR"},
      {"type":"OR","id":"dev22","x":152,"y":344,"label":"OR"},
      {"type":"OR","id":"dev23","x":152,"y":376,"label":"OR"},
      {"type":"OR","id":"dev24","x":152,"y":408,"label":"OR"},
      {"type":"OR","id":"dev25","x":152,"y":440,"label":"OR"},
      {"type":"OR","id":"dev26","x":152,"y":472,"label":"OR"},
      {"type":"OR","id":"dev27","x":152,"y":504,"label":"OR"}
    ],
    "connectors":[
      {"from":"dev0.in0","to":"dev11.out0"},
      {"from":"dev1.in0","to":"dev10.out0"},
      {"from":"dev2.in0","to":"dev6.out0"},
      {"from":"dev3.in0","to":"dev9.out0"},
      {"from":"dev4.in0","to":"dev8.out0"},
      {"from":"dev5.in0","to":"dev7.out0"},
      {"from":"dev10.in0","to":"dev12.out0"},
      {"from":"dev10.in1","to":"dev13.out0"},
      {"from":"dev10.in2","to":"dev14.out0"},
      {"from":"dev10.in3","to":"dev15.out0"},
      {"from":"dev10.in4","to":"dev16.out0"},
      {"from":"dev10.in5","to":"dev17.out0"},
      {"from":"dev10.in6","to":"dev18.out0"},
      {"from":"dev10.in7","to":"dev19.out0"},
      {"from":"dev11.in0","to":"dev20.out0"},
      {"from":"dev11.in1","to":"dev21.out0"},
      {"from":"dev11.in2","to":"dev22.out0"},
      {"from":"dev11.in3","to":"dev23.out0"},
      {"from":"dev11.in4","to":"dev24.out0"},
      {"from":"dev11.in5","to":"dev25.out0"},
      {"from":"dev11.in6","to":"dev26.out0"},
      {"from":"dev11.in7","to":"dev27.out0"},
      {"from":"dev12.in0","to":"dev2.out0"},
      {"from":"dev12.in1","to":"dev5.out0"},
      {"from":"dev13.in0","to":"dev2.out1"},
      {"from":"dev13.in1","to":"dev5.out1"},
      {"from":"dev14.in0","to":"dev2.out2"},
      {"from":"dev14.in1","to":"dev5.out2"},
      {"from":"dev15.in0","to":"dev2.out3"},
      {"from":"dev15.in1","to":"dev5.out3"},
      {"from":"dev16.in0","to":"dev2.out4"},
      {"from":"dev16.in1","to":"dev5.out4"},
      {"from":"dev17.in0","to":"dev2.out5"},
      {"from":"dev17.in1","to":"dev5.out5"},
      {"from":"dev18.in0","to":"dev2.out6"},
      {"from":"dev18.in1","to":"dev5.out6"},
      {"from":"dev19.in0","to":"dev2.out7"},
      {"from":"dev19.in1","to":"dev5.out7"},
      {"from":"dev20.in0","to":"dev3.out0"},
      {"from":"dev20.in1","to":"dev4.out0"},
      {"from":"dev21.in0","to":"dev3.out1"},
      {"from":"dev21.in1","to":"dev4.out1"},
      {"from":"dev22.in0","to":"dev3.out2"},
      {"from":"dev22.in1","to":"dev4.out2"},
      {"from":"dev23.in0","to":"dev3.out3"},
      {"from":"dev23.in1","to":"dev4.out3"},
      {"from":"dev24.in0","to":"dev3.out4"},
      {"from":"dev24.in1","to":"dev4.out4"},
      {"from":"dev25.in0","to":"dev3.out5"},
      {"from":"dev25.in1","to":"dev4.out5"},
      {"from":"dev26.in0","to":"dev3.out6"},
      {"from":"dev26.in1","to":"dev4.out6"},
      {"from":"dev27.in0","to":"dev3.out7"},
      {"from":"dev27.in1","to":"dev4.out7"}
    ],
  },

  // Or8Way
  {
    name: 'Or8Way',
    width: 600,
    height: 400,
    noRender: true,
    // Custom draw
    chipWidth: 2,
    draw: drawOR,
    "devices":[
      {"type":"OR","id":"dev0","x":136,"y":8,"label":"OR"},
      {"type":"OR","id":"dev1","x":136,"y":40,"label":"OR"},
      {"type":"OR","id":"dev2","x":136,"y":72,"label":"OR"},
      {"type":"OR","id":"dev3","x":136,"y":104,"label":"OR"},
      {"type":"OR","id":"dev4","x":184,"y":40,"label":"OR"},
      {"type":"OR","id":"dev5","x":184,"y":72,"label":"OR"},
      {"type":"OR","id":"dev6","x":232,"y":56,"label":"OR"},
      {"type":"BusIn","id":"dev7","x":80,"y":40,"label":"a0-7"},
      {"type":"In","id":"dev8","x":24,"y":56,"label":""},
      {"type":"Out","id":"dev9","x":280,"y":56,"label":""}
    ],
    "connectors":[
      {"from":"dev0.in0","to":"dev7.out0"},
      {"from":"dev0.in1","to":"dev7.out1"},
      {"from":"dev1.in0","to":"dev7.out2"},
      {"from":"dev1.in1","to":"dev7.out3"},
      {"from":"dev2.in0","to":"dev7.out4"},
      {"from":"dev2.in1","to":"dev7.out5"},
      {"from":"dev3.in0","to":"dev7.out6"},
      {"from":"dev3.in1","to":"dev7.out7"},
      {"from":"dev4.in0","to":"dev0.out0"},
      {"from":"dev4.in1","to":"dev1.out0"},
      {"from":"dev5.in0","to":"dev2.out0"},
      {"from":"dev5.in1","to":"dev3.out0"},
      {"from":"dev6.in0","to":"dev4.out0"},
      {"from":"dev6.in1","to":"dev5.out0"},
      {"from":"dev7.in0","to":"dev8.out0"},
      {"from":"dev9.in0","to":"dev6.out0"}
    ],
  },

  // Mux4Way1
  {
    name: 'Mux4Way1',
    width: 600,
    height: 600,
    halfPitch: true,
    noRender: true,
    "devices":[
      {"type":"Toggle","id":"dev0","x":64,"y":16,"label":"Toggle","state":{"on":false}},
      {"type":"Toggle","id":"dev1","x":64,"y":160,"label":"Toggle","state":{"on":false}},
      {"type":"In","id":"dev2","x":104,"y":16,"label":""},
      {"type":"In","id":"dev3","x":104,"y":160,"label":""},
      {"type":"LED","id":"dev4","x":360,"y":128,"label":"LED"},
      {"type":"Toggle","id":"dev5","x":64,"y":216,"label":"Toggle","state":{"on":false}},
      {"type":"Toggle","id":"dev6","x":64,"y":256,"label":"Toggle","state":{"on":false}},
      {"type":"In","id":"dev7","x":104,"y":64,"label":""},
      {"type":"Toggle","id":"dev8","x":64,"y":112,"label":"Toggle","state":{"on":true}},
      {"type":"In","id":"dev9","x":104,"y":112,"label":""},
      {"type":"Toggle","id":"dev10","x":64,"y":64,"label":"Toggle","state":{"on":true}},
      {"type":"In","id":"dev11","x":104,"y":256,"label":"","inPort":{"fill":"#fcf"}},
      {"type":"Mux","id":"dev12","x":160,"y":88,"label":"Mux"},
      {"type":"Mux","id":"dev13","x":160,"y":144,"label":"Mux"},
      {"type":"Mux","id":"dev14","x":240,"y":120,"label":"Mux"},
      {"type":"Out","id":"dev15","x":320,"y":128,"label":""},
      {"type":"DC","id":"dev16","x":8,"y":160,"label":"DC"},
      {"type":"In","id":"dev17","x":104,"y":216,"label":"","inPort":{"fill":"#fcf"}}
    ],
    "connectors":[
      {"from":"dev0.in0","to":"dev16.out0"},
      {"from":"dev1.in0","to":"dev16.out0"},
      {"from":"dev2.in0","to":"dev0.out0"},
      {"from":"dev3.in0","to":"dev1.out0"},
      {"from":"dev4.in0","to":"dev15.out0"},
      {"from":"dev5.in0","to":"dev16.out0"},
      {"from":"dev6.in0","to":"dev16.out0"},
      {"from":"dev7.in0","to":"dev10.out0"},
      {"from":"dev8.in0","to":"dev16.out0"},
      {"from":"dev9.in0","to":"dev8.out0"},
      {"from":"dev10.in0","to":"dev16.out0"},
      {"from":"dev11.in0","to":"dev6.out0"},
      {"from":"dev12.in0","to":"dev2.out0"},
      {"from":"dev12.in1","to":"dev7.out0"},
      {"from":"dev12.in2","to":"dev17.out0"},
      {"from":"dev13.in0","to":"dev9.out0"},
      {"from":"dev13.in1","to":"dev3.out0"},
      {"from":"dev13.in2","to":"dev17.out0"},
      {"from":"dev14.in0","to":"dev12.out0"},
      {"from":"dev14.in1","to":"dev13.out0"},
      {"from":"dev14.in2","to":"dev11.out0"},
      {"from":"dev15.in0","to":"dev14.out0"},
      {"from":"dev17.in0","to":"dev5.out0"}
    ],
  },

  // Mux4Way8
  {
    name: 'Mux4Way8',
    width: 600,
    height: 500,
    halfPitch: true,
    noRender: true,
    "devices":[
      {"type":"In","id":"dev0","x":24,"y":272,"label":""},
      {"type":"Mux4Way1","id":"dev1","x":168,"y":16,"label":"Mux4Way1"},
      {"type":"Mux4Way1","id":"dev2","x":168,"y":72,"label":"Mux4Way1"},
      {"type":"Mux4Way1","id":"dev3","x":168,"y":128,"label":"Mux4Way1"},
      {"type":"Mux4Way1","id":"dev4","x":168,"y":184,"label":"Mux4Way1"},
      {"type":"Mux4Way1","id":"dev5","x":168,"y":240,"label":"Mux4Way1"},
      {"type":"Mux4Way1","id":"dev6","x":168,"y":296,"label":"Mux4Way1"},
      {"type":"Mux4Way1","id":"dev7","x":168,"y":352,"label":"Mux4Way1"},
      {"type":"Mux4Way1","id":"dev8","x":168,"y":408,"label":"Mux4Way1"},
      {"type":"In","id":"dev9","x":24,"y":520,"label":"sel1","inPort":{"fill":"#fcf"}},
      {"type":"BusIn","id":"dev10","x":88,"y":144,"label":"BusIn"},
      {"type":"BusIn","id":"dev11","x":88,"y":40,"label":"BusIn"},
      {"type":"BusIn","id":"dev12","x":88,"y":256,"label":"BusIn"},
      {"type":"BusIn","id":"dev13","x":88,"y":368,"label":"BusIn"},
      {"type":"In","id":"dev14","x":24,"y":480,"label":"sel0","inPort":{"fill":"#fcf"}},
      {"type":"BusOut","id":"dev15","x":280,"y":208,"label":"BusOut"},
      {"type":"Out","id":"dev16","x":336,"y":232,"label":""},
      {"type":"In","id":"dev17","x":24,"y":56,"label":""},
      {"type":"In","id":"dev18","x":24,"y":160,"label":""},
      {"type":"In","id":"dev19","x":24,"y":384,"label":""}
    ],
    "connectors":[
      {"from":"dev1.in0","to":"dev11.out0"},
      {"from":"dev1.in1","to":"dev10.out0"},
      {"from":"dev1.in2","to":"dev12.out0"},
      {"from":"dev1.in3","to":"dev13.out0"},
      {"from":"dev1.in4","to":"dev14.out0"},
      {"from":"dev1.in5","to":"dev9.out0"},
      {"from":"dev2.in0","to":"dev11.out1"},
      {"from":"dev2.in1","to":"dev10.out1"},
      {"from":"dev2.in2","to":"dev12.out1"},
      {"from":"dev2.in3","to":"dev13.out1"},
      {"from":"dev2.in4","to":"dev14.out0"},
      {"from":"dev2.in5","to":"dev9.out0"},
      {"from":"dev3.in0","to":"dev11.out2"},
      {"from":"dev3.in1","to":"dev10.out2"},
      {"from":"dev3.in2","to":"dev12.out2"},
      {"from":"dev3.in3","to":"dev13.out2"},
      {"from":"dev3.in4","to":"dev14.out0"},
      {"from":"dev3.in5","to":"dev9.out0"},
      {"from":"dev4.in0","to":"dev11.out3"},
      {"from":"dev4.in1","to":"dev10.out3"},
      {"from":"dev4.in2","to":"dev12.out3"},
      {"from":"dev4.in3","to":"dev13.out3"},
      {"from":"dev4.in4","to":"dev14.out0"},
      {"from":"dev4.in5","to":"dev9.out0"},
      {"from":"dev5.in0","to":"dev11.out4"},
      {"from":"dev5.in1","to":"dev10.out4"},
      {"from":"dev5.in2","to":"dev12.out4"},
      {"from":"dev5.in3","to":"dev13.out4"},
      {"from":"dev5.in4","to":"dev14.out0"},
      {"from":"dev5.in5","to":"dev9.out0"},
      {"from":"dev6.in0","to":"dev11.out5"},
      {"from":"dev6.in1","to":"dev10.out5"},
      {"from":"dev6.in2","to":"dev12.out5"},
      {"from":"dev6.in3","to":"dev13.out5"},
      {"from":"dev6.in4","to":"dev14.out0"},
      {"from":"dev6.in5","to":"dev9.out0"},
      {"from":"dev7.in0","to":"dev11.out6"},
      {"from":"dev7.in1","to":"dev10.out6"},
      {"from":"dev7.in2","to":"dev12.out6"},
      {"from":"dev7.in3","to":"dev13.out6"},
      {"from":"dev7.in4","to":"dev14.out0"},
      {"from":"dev7.in5","to":"dev9.out0"},
      {"from":"dev8.in0","to":"dev11.out7"},
      {"from":"dev8.in1","to":"dev10.out7"},
      {"from":"dev8.in2","to":"dev12.out7"},
      {"from":"dev8.in3","to":"dev13.out7"},
      {"from":"dev8.in4","to":"dev14.out0"},
      {"from":"dev8.in5","to":"dev9.out0"},
      {"from":"dev10.in0","to":"dev18.out0"},
      {"from":"dev11.in0","to":"dev17.out0"},
      {"from":"dev12.in0","to":"dev0.out0"},
      {"from":"dev13.in0","to":"dev19.out0"},
      {"from":"dev15.in0","to":"dev1.out0"},
      {"from":"dev15.in1","to":"dev2.out0"},
      {"from":"dev15.in2","to":"dev3.out0"},
      {"from":"dev15.in3","to":"dev4.out0"},
      {"from":"dev15.in4","to":"dev5.out0"},
      {"from":"dev15.in5","to":"dev6.out0"},
      {"from":"dev15.in6","to":"dev7.out0"},
      {"from":"dev15.in7","to":"dev8.out0"},
      {"from":"dev16.in0","to":"dev15.out0"}
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
      {"type":"Out","id":"dev8","x":208,"y":72,"label":"carry"},
      {"type":"Out","id":"dev9","x":208,"y":24,"label":"sum"},
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
      {"type":"Toggle","id":"dev0","x":64,"y":72,"label":"Toggle","state":{"on":false}},
      {"type":"DC","id":"dev1","x":16,"y":72,"label":"DC"},
      {"type":"Toggle","id":"dev2","x":64,"y":24,"label":"Toggle","state":{"on":false}},
      {"type":"In","id":"dev3","x":112,"y":72,"label":"a"},
      {"type":"In","id":"dev4","x":112,"y":120,"label":"b"},
      {"type":"In","id":"dev5","x":112,"y":24,"label":"c"},
      {"type":"LED","id":"dev6","x":336,"y":96,"label":"LED"},
      {"type":"OR","id":"dev7","x":240,"y":96,"label":"OR"},
      {"type":"Out","id":"dev8","x":288,"y":96,"label":"carry"},
      {"type":"Out","id":"dev9","x":288,"y":48,"label":"sum"},
      {"type":"LED","id":"dev10","x":336,"y":48,"label":"LED"},
      {"type":"HalfAdder","id":"dev11","x":160,"y":96,"label":"HalfAdder"},
      {"type":"HalfAdder","id":"dev12","x":160,"y":40,"label":"HalfAdder"},
      {"type":"Toggle","id":"dev13","x":64,"y":120,"label":"Toggle","state":{"on":false}}
    ],
    "connectors":[
      {"from":"dev0.in0","to":"dev1.out0"},
      {"from":"dev2.in0","to":"dev1.out0"},
      {"from":"dev3.in0","to":"dev0.out0"},
      {"from":"dev4.in0","to":"dev13.out0"},
      {"from":"dev5.in0","to":"dev2.out0"},
      {"from":"dev6.in0","to":"dev8.out0"},
      {"from":"dev7.in0","to":"dev12.out1"},
      {"from":"dev7.in1","to":"dev11.out1"},
      {"from":"dev8.in0","to":"dev7.out0"},
      {"from":"dev9.in0","to":"dev12.out0"},
      {"from":"dev10.in0","to":"dev9.out0"},
      {"from":"dev11.in0","to":"dev3.out0"},
      {"from":"dev11.in1","to":"dev4.out0"},
      {"from":"dev12.in0","to":"dev5.out0"},
      {"from":"dev12.in1","to":"dev11.out0"},
      {"from":"dev13.in0","to":"dev1.out0"}
    ],
  },

  // Add8
  {
    name: 'Add8',
    width: 600,
    height: 450,
    noRender: true,
    noToolbox: true,
    "devices":[
      {"type":"FullAdder","id":"dev0","x":160,"y":24,"label":"FullAdder"},
      {"type":"FullAdder","id":"dev1","x":160,"y":72,"label":"FullAdder"},
      {"type":"FullAdder","id":"dev2","x":160,"y":120,"label":"FullAdder"},
      {"type":"FullAdder","id":"dev3","x":160,"y":168,"label":"FullAdder"},
      {"type":"FullAdder","id":"dev4","x":160,"y":216,"label":"FullAdder"},
      {"type":"FullAdder","id":"dev5","x":160,"y":264,"label":"FullAdder"},
      {"type":"FullAdder","id":"dev6","x":160,"y":312,"label":"FullAdder"},
      {"type":"FullAdder","id":"dev7","x":160,"y":360,"label":"FullAdder"},
      {"type":"BusOut","id":"dev8","x":256,"y":176,"label":"BusOut"},
      {"type":"Out","id":"dev9","x":312,"y":200,"label":"sum"},
      {"type":"Out","id":"dev10","x":312,"y":240,"label":"carry"},
      {"type":"In","id":"dev11","x":24,"y":16,"label":"c"},
      {"type":"BusIn","id":"dev12","x":80,"y":232,"label":"BusIn"},
      {"type":"BusIn","id":"dev13","x":80,"y":120,"label":"BusIn"},
      {"type":"In","id":"dev14","x":24,"y":144,"label":"a"},
      {"type":"In","id":"dev15","x":24,"y":248,"label":"b"}
    ],
    "connectors":[
      {"from":"dev0.in0","to":"dev11.out0"},
      {"from":"dev0.in1","to":"dev13.out0"},
      {"from":"dev0.in2","to":"dev12.out0"},
      {"from":"dev1.in0","to":"dev0.out1"},
      {"from":"dev1.in1","to":"dev13.out1"},
      {"from":"dev1.in2","to":"dev12.out1"},
      {"from":"dev2.in0","to":"dev1.out1"},
      {"from":"dev2.in1","to":"dev13.out2"},
      {"from":"dev2.in2","to":"dev12.out2"},
      {"from":"dev3.in0","to":"dev2.out1"},
      {"from":"dev3.in1","to":"dev13.out3"},
      {"from":"dev3.in2","to":"dev12.out3"},
      {"from":"dev4.in0","to":"dev3.out1"},
      {"from":"dev4.in1","to":"dev13.out4"},
      {"from":"dev4.in2","to":"dev12.out4"},
      {"from":"dev5.in0","to":"dev4.out1"},
      {"from":"dev5.in1","to":"dev13.out5"},
      {"from":"dev5.in2","to":"dev12.out5"},
      {"from":"dev6.in0","to":"dev5.out1"},
      {"from":"dev6.in1","to":"dev13.out6"},
      {"from":"dev6.in2","to":"dev12.out6"},
      {"from":"dev7.in0","to":"dev6.out1"},
      {"from":"dev7.in1","to":"dev13.out7"},
      {"from":"dev7.in2","to":"dev12.out7"},
      {"from":"dev8.in0","to":"dev0.out0"},
      {"from":"dev8.in1","to":"dev1.out0"},
      {"from":"dev8.in2","to":"dev2.out0"},
      {"from":"dev8.in3","to":"dev3.out0"},
      {"from":"dev8.in4","to":"dev4.out0"},
      {"from":"dev8.in5","to":"dev5.out0"},
      {"from":"dev8.in6","to":"dev6.out0"},
      {"from":"dev8.in7","to":"dev7.out0"},
      {"from":"dev9.in0","to":"dev8.out0"},
      {"from":"dev10.in0","to":"dev7.out1"},
      {"from":"dev12.in0","to":"dev15.out0"},
      {"from":"dev13.in0","to":"dev14.out0"}
    ],
  },

  // Add16
  {
    name: 'Add16',
    width: 600,
    height: 500,
    noRender: true,
    "devices":[
      {"type":"In","id":"dev0","x":32,"y":24,"label":"c"},
      {"type":"In","id":"dev1","x":32,"y":72,"label":"xL"},
      {"type":"In","id":"dev2","x":32,"y":144,"label":"yL"},
      {"type":"In","id":"dev3","x":32,"y":104,"label":"xH"},
      {"type":"In","id":"dev4","x":32,"y":176,"label":"yH"},
      {"type":"Add8","id":"dev5","x":112,"y":112,"label":"Add8"},
      {"type":"Add8","id":"dev6","x":112,"y":56,"label":"Add8"},
      {"type":"Out","id":"dev7","x":224,"y":112,"label":"H"},
      {"type":"Out","id":"dev8","x":224,"y":56,"label":"L"},
      {"type":"Out","id":"dev9","x":224,"y":152,"label":"carry"}
    ],
    "connectors":[
      {"from":"dev5.in0","to":"dev6.out1"},
      {"from":"dev5.in1","to":"dev3.out0"},
      {"from":"dev5.in2","to":"dev4.out0"},
      {"from":"dev6.in0","to":"dev0.out0"},
      {"from":"dev6.in1","to":"dev1.out0"},
      {"from":"dev6.in2","to":"dev2.out0"},
      {"from":"dev7.in0","to":"dev5.out0"},
      {"from":"dev8.in0","to":"dev6.out0"},
      {"from":"dev9.in0","to":"dev5.out1"}
    ],
  },

  // Inc16
  {
    name: 'Inc16',
    width: 600,
    height: 300,
    noRender: true,
    "devices":[
      {"type":"In","id":"dev0","x":24,"y":24,"label":"L"},
      {"type":"In","id":"dev1","x":24,"y":56,"label":"H"},
      {"type":"Out","id":"dev2","x":272,"y":24,"label":"L"},
      {"type":"Out","id":"dev3","x":272,"y":56,"label":"H"},
      {"type":"NOT","id":"dev4","x":32,"y":112,"label":"NOT"},
      {"type":"NAND","id":"dev5","x":72,"y":112,"label":"NAND"},
      {"type":"BusOut","id":"dev6","x":128,"y":120,"label":"BusOut"},
      {"type":"Add16","id":"dev7","x":184,"y":32,"label":"Add16"}
    ],
    "connectors":[
      {"from":"dev2.in0","to":"dev7.out0"},
      {"from":"dev3.in0","to":"dev7.out1"},
      {"from":"dev4.in0","to":"dev1.out0"},
      {"from":"dev5.in0","to":"dev1.out0"},
      {"from":"dev5.in1","to":"dev4.out0"},
      {"from":"dev6.in0","to":"dev5.out0"},
      {"from":"dev7.in1","to":"dev0.out0"},
      {"from":"dev7.in2","to":"dev1.out0"},
      {"from":"dev7.in3","to":"dev6.out0"}
    ],
  },

  // CZero16
  {
    name: 'CZero16',
    width: 600,
    height: 500,
    noRender: true,
    noToolbox: true,
    "devices":[
      {"type":"Out","id":"dev0","x":272,"y":24,"label":"Out"},
      {"type":"Out","id":"dev1","x":272,"y":64,"label":"Out"},
      {"type":"In","id":"dev2","x":24,"y":168,"label":"zero"},
      {"type":"NOT","id":"dev3","x":64,"y":168,"label":"NOT"},
      {"type":"In","id":"dev4","x":24,"y":24,"label":"xL"},
      {"type":"In","id":"dev5","x":24,"y":64,"label":"xH"},
      {"type":"And16","id":"dev6","x":208,"y":24,"label":"And16"},
      {"type":"BusOut","id":"dev7","x":136,"y":120,"label":"BusOut"}
    ],
    "connectors":[
      {"from":"dev0.in0","to":"dev6.out0"},
      {"from":"dev1.in0","to":"dev6.out1"},
      {"from":"dev3.in0","to":"dev2.out0"},
      {"from":"dev6.in0","to":"dev4.out0"},
      {"from":"dev6.in1","to":"dev5.out0"},
      {"from":"dev6.in2","to":"dev7.out0"},
      {"from":"dev6.in3","to":"dev7.out0"},
      {"from":"dev7.in0","to":"dev3.out0"},
      {"from":"dev7.in1","to":"dev3.out0"},
      {"from":"dev7.in2","to":"dev3.out0"},
      {"from":"dev7.in3","to":"dev3.out0"},
      {"from":"dev7.in4","to":"dev3.out0"},
      {"from":"dev7.in5","to":"dev3.out0"},
      {"from":"dev7.in6","to":"dev3.out0"},
      {"from":"dev7.in7","to":"dev3.out0"}
    ],
  },

  // CFlip16
  {
    name: 'CFlip16',
    width: 600,
    height: 500,
    noRender: true,
    noToolbox: true,
    "devices":[
      {"type":"In","id":"dev0","x":24,"y":24,"label":"xL"},
      {"type":"In","id":"dev1","x":24,"y":64,"label":"xH"},
      {"type":"In","id":"dev2","x":24,"y":168,"label":"flip"},
      {"type":"Not16","id":"dev3","x":96,"y":72,"label":"Not16"},
      {"type":"Or16","id":"dev4","x":272,"y":72,"label":"Or16"},
      {"type":"And16","id":"dev5","x":200,"y":24,"label":"And16"},
      {"type":"NOT","id":"dev6","x":72,"y":136,"label":"NOT"},
      {"type":"BusOut","id":"dev7","x":128,"y":120,"label":"BusOut"},
      {"type":"And16","id":"dev8","x":200,"y":120,"label":"And16"},
      {"type":"BusOut","id":"dev9","x":128,"y":208,"label":"BusOut"},
      {"type":"Out","id":"dev10","x":328,"y":72,"label":"Out"},
      {"type":"Out","id":"dev11","x":328,"y":112,"label":"Out"}
    ],
    "connectors":[
      {"from":"dev3.in0","to":"dev0.out0"},
      {"from":"dev3.in1","to":"dev1.out0"},
      {"from":"dev4.in0","to":"dev5.out0"},
      {"from":"dev4.in1","to":"dev5.out1"},
      {"from":"dev4.in2","to":"dev8.out0"},
      {"from":"dev4.in3","to":"dev8.out1"},
      {"from":"dev5.in0","to":"dev0.out0"},
      {"from":"dev5.in1","to":"dev1.out0"},
      {"from":"dev5.in2","to":"dev7.out0"},
      {"from":"dev5.in3","to":"dev7.out0"},
      {"from":"dev6.in0","to":"dev2.out0"},
      {"from":"dev7.in0","to":"dev6.out0"},
      {"from":"dev7.in1","to":"dev6.out0"},
      {"from":"dev7.in2","to":"dev6.out0"},
      {"from":"dev7.in3","to":"dev6.out0"},
      {"from":"dev7.in4","to":"dev6.out0"},
      {"from":"dev7.in5","to":"dev6.out0"},
      {"from":"dev7.in6","to":"dev6.out0"},
      {"from":"dev7.in7","to":"dev6.out0"},
      {"from":"dev8.in0","to":"dev3.out0"},
      {"from":"dev8.in1","to":"dev3.out1"},
      {"from":"dev8.in2","to":"dev9.out0"},
      {"from":"dev8.in3","to":"dev9.out0"},
      {"from":"dev9.in0","to":"dev2.out0"},
      {"from":"dev9.in1","to":"dev2.out0"},
      {"from":"dev9.in2","to":"dev2.out0"},
      {"from":"dev9.in3","to":"dev2.out0"},
      {"from":"dev9.in4","to":"dev2.out0"},
      {"from":"dev9.in5","to":"dev2.out0"},
      {"from":"dev9.in6","to":"dev2.out0"},
      {"from":"dev9.in7","to":"dev2.out0"},
      {"from":"dev10.in0","to":"dev4.out0"},
      {"from":"dev11.in0","to":"dev4.out1"}
    ],
  },

  // CZeroFlip16
  {
    name: 'CZeroFlip16',
    width: 600,
    height: 500,
    noRender: true,
    noToolbox: true,
    "devices":[
      {"type":"In","id":"dev0","x":24,"y":64,"label":"xH"},
      {"type":"In","id":"dev1","x":24,"y":104,"label":"zx"},
      {"type":"In","id":"dev2","x":24,"y":144,"label":"nx"},
      {"type":"CZero16","id":"dev3","x":80,"y":32,"label":"CZero16"},
      {"type":"CFlip16","id":"dev4","x":184,"y":40,"label":"CFlip16"},
      {"type":"In","id":"dev5","x":24,"y":24,"label":"xL"},
      {"type":"Out","id":"dev6","x":280,"y":24,"label":"oL"},
      {"type":"Out","id":"dev7","x":280,"y":72,"label":"oH"},
    ],
    "connectors":[
      {"from":"dev3.in0","to":"dev5.out0"},
      {"from":"dev3.in1","to":"dev0.out0"},
      {"from":"dev3.in2","to":"dev1.out0"},
      {"from":"dev4.in0","to":"dev3.out0"},
      {"from":"dev4.in1","to":"dev3.out1"},
      {"from":"dev4.in2","to":"dev2.out0"},
      {"from":"dev6.in0","to":"dev4.out0"},
      {"from":"dev7.in0","to":"dev4.out1"},
    ],
  },

  // ALU
  {
    name: 'ALU',
    width: 600,
    height: 500,
    "devices":[
      {"type":"Toggle","id":"dev0","x":56,"y":16,"label":"Toggle","state":{"on":false}},
      {"type":"In","id":"dev1","x":80,"y":192,"label":"xH"},
      {"type":"In","id":"dev2","x":80,"y":152,"label":"xL"},
      {"type":"BusOut","id":"dev3","x":32,"y":152,"label":"BusOut"},
      {"type":"In","id":"dev4","x":80,"y":336,"label":"yL"},
      {"type":"In","id":"dev5","x":80,"y":376,"label":"yH"},
      {"type":"In","id":"dev6","x":80,"y":424,"label":"zy"},
      {"type":"In","id":"dev7","x":80,"y":464,"label":"ny"},
      {"type":"In","id":"dev8","x":80,"y":240,"label":"zx"},
      {"type":"In","id":"dev9","x":80,"y":280,"label":"nx"},
      {"type":"DC","id":"dev10","x":8,"y":16,"label":"DC"},
      {"type":"Toggle","id":"dev11","x":96,"y":16,"label":"Toggle","state":{"on":true}},
      {"type":"Toggle","id":"dev12","x":136,"y":16,"label":"Toggle","state":{"on":true}},
      {"type":"Toggle","id":"dev13","x":176,"y":16,"label":"Toggle","state":{"on":false}},
      {"type":"Toggle","id":"dev14","x":216,"y":16,"label":"Toggle","state":{"on":false}},
      {"type":"Toggle","id":"dev15","x":256,"y":16,"label":"Toggle","state":{"on":false}},
      {"type":"Toggle","id":"dev16","x":296,"y":16,"label":"Toggle","state":{"on":false}},
      {"type":"Toggle","id":"dev17","x":336,"y":16,"label":"Toggle","state":{"on":false}},
      {"type":"LED","id":"dev18","x":448,"y":152,"label":"LED"},
      {"type":"BusIn","id":"dev19","x":392,"y":192,"label":"BusIn"},
      {"type":"CZeroFlip16","id":"dev20","x":152,"y":368,"label":"CZeroFlip16"},
      {"type":"CZeroFlip16","id":"dev21","x":152,"y":192,"label":"CZeroFlip16"},
      {"type":"In","id":"dev22","x":80,"y":512,"label":"f"},
      {"type":"Add16","id":"dev23","x":240,"y":216,"label":"Add16"},
      {"type":"And16","id":"dev24","x":256,"y":320,"label":"And16"},
      {"type":"In","id":"dev25","x":80,"y":560,"label":"no"},
      {"type":"Toggle","id":"dev26","x":56,"y":72,"label":"Toggle","state":{"on":true}},
      {"type":"Toggle","id":"dev27","x":96,"y":72,"label":"Toggle","state":{"on":true}},
      {"type":"Toggle","id":"dev28","x":136,"y":72,"label":"Toggle","state":{"on":false}},
      {"type":"Toggle","id":"dev29","x":176,"y":72,"label":"Toggle","state":{"on":false}},
      {"type":"Toggle","id":"dev30","x":216,"y":72,"label":"Toggle","state":{"on":false}},
      {"type":"Toggle","id":"dev31","x":256,"y":72,"label":"Toggle","state":{"on":false}},
      {"type":"Toggle","id":"dev32","x":296,"y":72,"label":"Toggle","state":{"on":false}},
      {"type":"Toggle","id":"dev33","x":336,"y":72,"label":"Toggle","state":{"on":false}},
      {"type":"BusOut","id":"dev34","x":32,"y":304,"label":"BusOut"},
      {"type":"LED","id":"dev35","x":448,"y":192,"label":"LED"},
      {"type":"LED","id":"dev36","x":448,"y":232,"label":"LED"},
      {"type":"LED","id":"dev37","x":448,"y":272,"label":"LED"},
      {"type":"Or8Way","id":"dev38","x":168,"y":648,"label":"Or8Way"},
      {"type":"Out","id":"dev39","x":368,"y":464,"label":"oL"},
      {"type":"Out","id":"dev40","x":368,"y":512,"label":"oH"},
      {"type":"Out","id":"dev41","x":368,"y":560,"label":"zr"},
      {"type":"Out","id":"dev42","x":368,"y":608,"label":"ng"},
      {"type":"Toggle","id":"dev43","x":424,"y":72,"label":"ny","state":{"on":false}},
      {"type":"Toggle","id":"dev44","x":384,"y":72,"label":"zy","state":{"on":false}},
      {"type":"Toggle","id":"dev45","x":384,"y":16,"label":"zx","state":{"on":false}},
      {"type":"Toggle","id":"dev46","x":424,"y":16,"label":"nx","state":{"on":false}},
      {"type":"Toggle","id":"dev47","x":24,"y":512,"label":"f","state":{"on":true}},
      {"type":"Toggle","id":"dev48","x":24,"y":560,"label":"no","state":{"on":false}},
      {"type":"LED","id":"dev49","x":448,"y":320,"label":"zr"},
      {"type":"LED","id":"dev50","x":448,"y":368,"label":"ng"},
      {"type":"Mux4Way8","id":"dev51","x":176,"y":472,"label":"Mux4Way8"},
      {"type":"Mux4Way8","id":"dev52","x":176,"y":536,"label":"Mux4Way8"},
      {"type":"CFlip16","id":"dev53","x":272,"y":528,"label":"CFlip16"},
      {"type":"BusIn","id":"dev54","x":320,"y":656,"label":"BusIn"},
      {"type":"NOT","id":"dev55","x":248,"y":664,"label":"NOT"},
      {"type":"Or8Way","id":"dev56","x":168,"y":680,"label":"Or8Way"},
      {"type":"OR","id":"dev57","x":208,"y":664,"label":"OR"}
    ],
    "connectors":[
      {"from":"dev0.in0","to":"dev10.out0"},
      {"from":"dev2.in0","to":"dev3.out0"},
      {"from":"dev3.in0","to":"dev0.out0"},
      {"from":"dev3.in1","to":"dev11.out0"},
      {"from":"dev3.in2","to":"dev12.out0"},
      {"from":"dev3.in3","to":"dev13.out0"},
      {"from":"dev3.in4","to":"dev14.out0"},
      {"from":"dev3.in5","to":"dev15.out0"},
      {"from":"dev3.in6","to":"dev16.out0"},
      {"from":"dev3.in7","to":"dev17.out0"},
      {"from":"dev4.in0","to":"dev34.out0"},
      {"from":"dev6.in0","to":"dev44.out0"},
      {"from":"dev7.in0","to":"dev43.out0"},
      {"from":"dev8.in0","to":"dev45.out0"},
      {"from":"dev9.in0","to":"dev46.out0"},
      {"from":"dev11.in0","to":"dev10.out0"},
      {"from":"dev12.in0","to":"dev10.out0"},
      {"from":"dev13.in0","to":"dev10.out0"},
      {"from":"dev18.in0","to":"dev19.out0"},
      {"from":"dev19.in0","to":"dev39.out0"},
      {"from":"dev20.in0","to":"dev4.out0"},
      {"from":"dev20.in1","to":"dev5.out0"},
      {"from":"dev20.in2","to":"dev6.out0"},
      {"from":"dev20.in3","to":"dev7.out0"},
      {"from":"dev21.in0","to":"dev2.out0"},
      {"from":"dev21.in1","to":"dev1.out0"},
      {"from":"dev21.in2","to":"dev8.out0"},
      {"from":"dev21.in3","to":"dev9.out0"},
      {"from":"dev22.in0","to":"dev47.out0"},
      {"from":"dev23.in1","to":"dev21.out0"},
      {"from":"dev23.in2","to":"dev21.out1"},
      {"from":"dev23.in3","to":"dev20.out0"},
      {"from":"dev23.in4","to":"dev20.out1"},
      {"from":"dev24.in0","to":"dev21.out0"},
      {"from":"dev24.in1","to":"dev21.out1"},
      {"from":"dev24.in2","to":"dev20.out0"},
      {"from":"dev24.in3","to":"dev20.out1"},
      {"from":"dev25.in0","to":"dev48.out0"},
      {"from":"dev26.in0","to":"dev10.out0"},
      {"from":"dev27.in0","to":"dev10.out0"},
      {"from":"dev28.in0","to":"dev10.out0"},
      {"from":"dev29.in0","to":"dev10.out0"},
      {"from":"dev30.in0","to":"dev10.out0"},
      {"from":"dev31.in0","to":"dev10.out0"},
      {"from":"dev32.in0","to":"dev10.out0"},
      {"from":"dev33.in0","to":"dev10.out0"},
      {"from":"dev34.in0","to":"dev26.out0"},
      {"from":"dev34.in1","to":"dev27.out0"},
      {"from":"dev34.in2","to":"dev28.out0"},
      {"from":"dev34.in3","to":"dev29.out0"},
      {"from":"dev34.in4","to":"dev30.out0"},
      {"from":"dev34.in5","to":"dev31.out0"},
      {"from":"dev34.in6","to":"dev32.out0"},
      {"from":"dev34.in7","to":"dev33.out0"},
      {"from":"dev35.in0","to":"dev19.out1"},
      {"from":"dev36.in0","to":"dev19.out2"},
      {"from":"dev37.in0","to":"dev19.out3"},
      {"from":"dev38.in0","to":"dev53.out0"},
      {"from":"dev39.in0","to":"dev53.out0"},
      {"from":"dev40.in0","to":"dev53.out1"},
      {"from":"dev41.in0","to":"dev55.out0"},
      {"from":"dev42.in0","to":"dev54.out7"},
      {"from":"dev43.in0","to":"dev10.out0"},
      {"from":"dev44.in0","to":"dev10.out0"},
      {"from":"dev45.in0","to":"dev10.out0"},
      {"from":"dev46.in0","to":"dev10.out0"},
      {"from":"dev47.in0","to":"dev10.out0"},
      {"from":"dev48.in0","to":"dev10.out0"},
      {"from":"dev49.in0","to":"dev41.out0"},
      {"from":"dev50.in0","to":"dev42.out0"},
      {"from":"dev51.in0","to":"dev24.out0"},
      {"from":"dev51.in1","to":"dev23.out0"},
      {"from":"dev51.in4","to":"dev22.out0"},
      {"from":"dev52.in0","to":"dev24.out1"},
      {"from":"dev52.in1","to":"dev23.out1"},
      {"from":"dev52.in4","to":"dev22.out0"},
      {"from":"dev53.in0","to":"dev51.out0"},
      {"from":"dev53.in1","to":"dev52.out0"},
      {"from":"dev53.in2","to":"dev25.out0"},
      {"from":"dev54.in0","to":"dev53.out1"},
      {"from":"dev55.in0","to":"dev57.out0"},
      {"from":"dev56.in0","to":"dev53.out1"},
      {"from":"dev57.in0","to":"dev38.out0"},
      {"from":"dev57.in1","to":"dev56.out0"}
    ],
  },

  // Final
  {
  },
]

window.addEventListener('load', () => {
  const parents = document.querySelectorAll('.simcir-placeholder')
  if (!parents)
    return

  let toolbox = [
    {"type":"NAND"},
    {"type":"In"},
    {"type":"Out"},
    {"type":"DC"},
    {"type":"LED"},
    {"type":"Toggle"},
    {"type":"OSC"},
    {"type":"BusIn"},
    {"type":"BusOut"},
  ]

  let j = 0
  const recur = (i: number) => {
    if (i >= kDevices.length)
      return

    const parent = parents[j]
    if (parent == null)
      return

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
    setTimeout(() => recur(i + 1), 100)
  }
  recur(0)
})
