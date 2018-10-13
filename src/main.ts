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

function drawNOR(g: any, x: number, y: number, width: number, height: number) {
  drawOR(g, x - 1, y, width, height)
  g.drawCircle(x + width, y + height / 2, 2)
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

  // NOR
  {
    name: 'NOR',
    width: 600,
    height: 150,
    noRender: true,
    //noToolbox: true,
    // Custom draw
    chipWidth: 2,
    draw: drawNOR,
    "devices":[
      {"type":"Toggle","id":"dev0","x":64,"y":24,"label":"Toggle","state":{"on":false}},
      {"type":"DC","id":"dev1","x":16,"y":48,"label":"DC"},
      {"type":"Toggle","id":"dev2","x":64,"y":72,"label":"Toggle","state":{"on":false}},
      {"type":"In","id":"dev3","x":112,"y":24,"label":""},
      {"type":"In","id":"dev4","x":112,"y":72,"label":""},
      {"type":"Out","id":"dev5","x":256,"y":48,"label":""},
      {"type":"LED","id":"dev6","x":304,"y":48,"label":"LED"},
      {"type":"OR","id":"dev7","x":160,"y":48,"label":"OR"},
      {"type":"NOT","id":"dev8","x":208,"y":48,"label":"NOT"}
    ],
    "connectors":[
      {"from":"dev0.in0","to":"dev1.out0"},
      {"from":"dev2.in0","to":"dev1.out0"},
      {"from":"dev3.in0","to":"dev0.out0"},
      {"from":"dev4.in0","to":"dev2.out0"},
      {"from":"dev5.in0","to":"dev8.out0"},
      {"from":"dev6.in0","to":"dev5.out0"},
      {"from":"dev7.in0","to":"dev3.out0"},
      {"from":"dev7.in1","to":"dev4.out0"},
      {"from":"dev8.in0","to":"dev7.out0"}
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

  // Not8
  {
    name: 'Not8',
    width: 600,
    height: 300,
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
      {"type":"BusIn","id":"dev8","x":64,"y":88,"label":"BusIn"},
      {"type":"BusOut","id":"dev9","x":192,"y":88,"label":"BusOut"},
      {"type":"In","id":"dev10","x":8,"y":104,"label":""},
      {"type":"Out","id":"dev11","x":240,"y":104,"label":""}
    ],
    "connectors":[
      {"from":"dev0.in0","to":"dev8.out0"},
      {"from":"dev1.in0","to":"dev8.out1"},
      {"from":"dev2.in0","to":"dev8.out2"},
      {"from":"dev3.in0","to":"dev8.out3"},
      {"from":"dev4.in0","to":"dev8.out4"},
      {"from":"dev5.in0","to":"dev8.out5"},
      {"from":"dev6.in0","to":"dev8.out6"},
      {"from":"dev7.in0","to":"dev8.out7"},
      {"from":"dev8.in0","to":"dev10.out0"},
      {"from":"dev9.in0","to":"dev0.out0"},
      {"from":"dev9.in1","to":"dev1.out0"},
      {"from":"dev9.in2","to":"dev2.out0"},
      {"from":"dev9.in3","to":"dev3.out0"},
      {"from":"dev9.in4","to":"dev4.out0"},
      {"from":"dev9.in5","to":"dev5.out0"},
      {"from":"dev9.in6","to":"dev6.out0"},
      {"from":"dev9.in7","to":"dev7.out0"},
      {"from":"dev11.in0","to":"dev9.out0"}
    ],
  },

  // And8
  {
    name: 'And8',
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
      {"type":"AND","id":"dev3","x":152,"y":112,"label":""},
      {"type":"AND","id":"dev4","x":152,"y":144,"label":""},
      {"type":"AND","id":"dev5","x":152,"y":176,"label":""},
      {"type":"AND","id":"dev6","x":152,"y":208,"label":""},
      {"type":"AND","id":"dev7","x":152,"y":240,"label":""},
      {"type":"BusIn","id":"dev8","x":80,"y":64,"label":"a0-7"},
      {"type":"BusIn","id":"dev9","x":80,"y":160,"label":"b0-7"},
      {"type":"In","id":"dev10","x":24,"y":80,"label":""},
      {"type":"BusOut","id":"dev11","x":216,"y":112,"label":"BusOut"},
      {"type":"In","id":"dev12","x":24,"y":184,"label":"","inPort":{"fill":"#cf0"}},
      {"type":"Out","id":"dev13","x":272,"y":128,"label":""}
    ],
    "connectors":[
      {"from":"dev0.in0","to":"dev8.out0"},
      {"from":"dev0.in1","to":"dev9.out0"},
      {"from":"dev1.in0","to":"dev8.out1"},
      {"from":"dev1.in1","to":"dev9.out1"},
      {"from":"dev2.in0","to":"dev8.out2"},
      {"from":"dev2.in1","to":"dev9.out2"},
      {"from":"dev3.in0","to":"dev8.out3"},
      {"from":"dev3.in1","to":"dev9.out3"},
      {"from":"dev4.in0","to":"dev8.out4"},
      {"from":"dev4.in1","to":"dev9.out4"},
      {"from":"dev5.in0","to":"dev8.out5"},
      {"from":"dev5.in1","to":"dev9.out5"},
      {"from":"dev6.in0","to":"dev8.out6"},
      {"from":"dev6.in1","to":"dev9.out6"},
      {"from":"dev7.in0","to":"dev8.out7"},
      {"from":"dev7.in1","to":"dev9.out7"},
      {"from":"dev8.in0","to":"dev10.out0"},
      {"from":"dev9.in0","to":"dev12.out0"},
      {"from":"dev11.in0","to":"dev0.out0"},
      {"from":"dev11.in1","to":"dev1.out0"},
      {"from":"dev11.in2","to":"dev2.out0"},
      {"from":"dev11.in3","to":"dev3.out0"},
      {"from":"dev11.in4","to":"dev4.out0"},
      {"from":"dev11.in5","to":"dev5.out0"},
      {"from":"dev11.in6","to":"dev6.out0"},
      {"from":"dev11.in7","to":"dev7.out0"},
      {"from":"dev13.in0","to":"dev11.out0"}
    ],
  },

  // Or8
  {
    name: 'Or8',
    width: 600,
    height: 600,
    noRender: true,
    // Custom draw
    chipWidth: 2,
    draw: drawOR,
    "devices":[
      {"type":"BusIn","id":"dev0","x":80,"y":64,"label":"a0-7"},
      {"type":"BusIn","id":"dev1","x":80,"y":160,"label":"b0-7"},
      {"type":"In","id":"dev2","x":24,"y":80,"label":""},
      {"type":"BusOut","id":"dev3","x":216,"y":112,"label":"BusOut"},
      {"type":"OR","id":"dev4","x":152,"y":8,"label":"OR"},
      {"type":"OR","id":"dev5","x":152,"y":40,"label":"OR"},
      {"type":"OR","id":"dev6","x":152,"y":72,"label":"OR"},
      {"type":"OR","id":"dev7","x":152,"y":104,"label":"OR"},
      {"type":"OR","id":"dev8","x":152,"y":136,"label":"OR"},
      {"type":"OR","id":"dev9","x":152,"y":168,"label":"OR"},
      {"type":"OR","id":"dev10","x":152,"y":200,"label":"OR"},
      {"type":"OR","id":"dev11","x":152,"y":232,"label":"OR"},
      {"type":"Out","id":"dev12","x":272,"y":128,"label":""},
      {"type":"In","id":"dev13","x":24,"y":184,"label":"","inPort":{"fill":"#cf0"}}
    ],
    "connectors":[
      {"from":"dev0.in0","to":"dev2.out0"},
      {"from":"dev1.in0","to":"dev13.out0"},
      {"from":"dev3.in0","to":"dev4.out0"},
      {"from":"dev3.in1","to":"dev5.out0"},
      {"from":"dev3.in2","to":"dev6.out0"},
      {"from":"dev3.in3","to":"dev7.out0"},
      {"from":"dev3.in4","to":"dev8.out0"},
      {"from":"dev3.in5","to":"dev9.out0"},
      {"from":"dev3.in6","to":"dev10.out0"},
      {"from":"dev3.in7","to":"dev11.out0"},
      {"from":"dev4.in0","to":"dev0.out0"},
      {"from":"dev4.in1","to":"dev1.out0"},
      {"from":"dev5.in0","to":"dev0.out1"},
      {"from":"dev5.in1","to":"dev1.out1"},
      {"from":"dev6.in0","to":"dev0.out2"},
      {"from":"dev6.in1","to":"dev1.out2"},
      {"from":"dev7.in0","to":"dev0.out3"},
      {"from":"dev7.in1","to":"dev1.out3"},
      {"from":"dev8.in0","to":"dev0.out4"},
      {"from":"dev8.in1","to":"dev1.out4"},
      {"from":"dev9.in0","to":"dev0.out5"},
      {"from":"dev9.in1","to":"dev1.out5"},
      {"from":"dev10.in0","to":"dev0.out6"},
      {"from":"dev10.in1","to":"dev1.out6"},
      {"from":"dev11.in0","to":"dev0.out7"},
      {"from":"dev11.in1","to":"dev1.out7"},
      {"from":"dev12.in0","to":"dev3.out0"}
    ],
  },

  // Not16
  {
    name: 'Not16',
    width: 600,
    height: 150,
    noRender: true,
    // Custom draw
    chipWidth: 2,
    draw: drawNOT,
    "devices":[
      {"type":"Not8","id":"dev0","x":72,"y":24,"label":"Not8"},
      {"type":"In","id":"dev1","x":24,"y":24,"label":""},
      {"type":"Out","id":"dev2","x":120,"y":24,"label":""},
      {"type":"Not8","id":"dev3","x":72,"y":64,"label":"Not8"},
      {"type":"In","id":"dev4","x":24,"y":64,"label":""},
      {"type":"Out","id":"dev5","x":120,"y":64,"label":""}
    ],
    "connectors":[
      {"from":"dev0.in0","to":"dev1.out0"},
      {"from":"dev2.in0","to":"dev0.out0"},
      {"from":"dev3.in0","to":"dev4.out0"},
      {"from":"dev5.in0","to":"dev3.out0"}
    ],
  },

  // And16
  {
    name: 'And16',
    width: 600,
    height: 200,
    noRender: true,
    // Custom draw
    chipWidth: 2,
    draw: drawAND,
    "devices":[
      {"type":"In","id":"dev0","x":16,"y":24,"label":""},
      {"type":"And8","id":"dev1","x":80,"y":40,"label":"And8"},
      {"type":"Out","id":"dev2","x":128,"y":40,"label":""},
      {"type":"In","id":"dev3","x":24,"y":64,"label":""},
      {"type":"In","id":"dev4","x":16,"y":104,"label":""},
      {"type":"And8","id":"dev5","x":80,"y":120,"label":"And8"},
      {"type":"Out","id":"dev6","x":128,"y":120,"label":""},
      {"type":"In","id":"dev7","x":24,"y":144,"label":""}
    ],
    "connectors":[
      {"from":"dev1.in0","to":"dev0.out0"},
      {"from":"dev1.in1","to":"dev3.out0"},
      {"from":"dev2.in0","to":"dev1.out0"},
      {"from":"dev5.in0","to":"dev4.out0"},
      {"from":"dev5.in1","to":"dev7.out0"},
      {"from":"dev6.in0","to":"dev5.out0"}
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
      {"type":"In","id":"dev0","x":16,"y":24,"label":""},
      {"type":"Out","id":"dev1","x":128,"y":40,"label":""},
      {"type":"In","id":"dev2","x":24,"y":64,"label":""},
      {"type":"In","id":"dev3","x":16,"y":104,"label":""},
      {"type":"Out","id":"dev4","x":128,"y":120,"label":""},
      {"type":"In","id":"dev5","x":24,"y":144,"label":""},
      {"type":"Or8","id":"dev6","x":80,"y":40,"label":"Or8"},
      {"type":"Or8","id":"dev7","x":80,"y":120,"label":"Or8"}
    ],
    "connectors":[
      {"from":"dev1.in0","to":"dev6.out0"},
      {"from":"dev4.in0","to":"dev7.out0"},
      {"from":"dev6.in0","to":"dev0.out0"},
      {"from":"dev6.in1","to":"dev2.out0"},
      {"from":"dev7.in0","to":"dev3.out0"},
      {"from":"dev7.in1","to":"dev5.out0"}
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
      {"type":"BusOut","id":"dev4","x":128,"y":120,"label":"BusOut"},
      {"type":"Add16","id":"dev5","x":184,"y":32,"label":"Add16"},
      {"type":"DC","id":"dev6","x":24,"y":112,"label":"DC"}
    ],
    "connectors":[
      {"from":"dev2.in0","to":"dev5.out0"},
      {"from":"dev3.in0","to":"dev5.out1"},
      {"from":"dev4.in0","to":"dev6.out0"},
      {"from":"dev5.in1","to":"dev0.out0"},
      {"from":"dev5.in2","to":"dev1.out0"},
      {"from":"dev5.in3","to":"dev4.out0"}
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
    width: 900,
    height: 500,
    "devices":[
      {"type":"CZeroFlip16","id":"dev0","x":96,"y":64,"label":"CZeroFlip16"},
      {"type":"Or8Way","id":"dev1","x":520,"y":280,"label":"Or8Way"},
      {"type":"Mux4Way8","id":"dev2","x":320,"y":208,"label":"Mux4Way8"},
      {"type":"Mux4Way8","id":"dev3","x":320,"y":272,"label":"Mux4Way8"},
      {"type":"CFlip16","id":"dev4","x":416,"y":264,"label":"CFlip16"},
      {"type":"NOT","id":"dev5","x":600,"y":296,"label":"NOT"},
      {"type":"Or8Way","id":"dev6","x":520,"y":312,"label":"Or8Way"},
      {"type":"OR","id":"dev7","x":560,"y":296,"label":"OR"},
      {"type":"BusIn","id":"dev8","x":520,"y":368,"label":"BusIn"},
      {"type":"Add16","id":"dev9","x":200,"y":200,"label":"Add16"},
      {"type":"And16","id":"dev10","x":216,"y":104,"label":"And16"},
      {"type":"CZeroFlip16","id":"dev11","x":96,"y":248,"label":"CZeroFlip16"},
      {"type":"In","id":"dev12","x":24,"y":24,"label":"xL"},
      {"type":"In","id":"dev13","x":24,"y":64,"label":"xH"},
      {"type":"In","id":"dev14","x":24,"y":112,"label":"zx"},
      {"type":"In","id":"dev15","x":24,"y":152,"label":"nx"},
      {"type":"In","id":"dev16","x":24,"y":208,"label":"yL"},
      {"type":"In","id":"dev17","x":24,"y":248,"label":"yH"},
      {"type":"In","id":"dev18","x":24,"y":296,"label":"zy"},
      {"type":"In","id":"dev19","x":24,"y":336,"label":"ny"},
      {"type":"In","id":"dev20","x":24,"y":392,"label":"f"},
      {"type":"In","id":"dev21","x":24,"y":440,"label":"no"},
      {"type":"Out","id":"dev22","x":696,"y":88,"label":"oL"},
      {"type":"Out","id":"dev23","x":696,"y":136,"label":"oH"},
      {"type":"Out","id":"dev24","x":696,"y":184,"label":"zr"},
      {"type":"Out","id":"dev25","x":696,"y":232,"label":"ng"}
    ],
    "connectors":[
      {"from":"dev0.in0","to":"dev12.out0"},
      {"from":"dev0.in1","to":"dev13.out0"},
      {"from":"dev0.in2","to":"dev14.out0"},
      {"from":"dev0.in3","to":"dev15.out0"},
      {"from":"dev1.in0","to":"dev4.out0"},
      {"from":"dev2.in0","to":"dev10.out0"},
      {"from":"dev2.in1","to":"dev9.out0"},
      {"from":"dev2.in4","to":"dev20.out0"},
      {"from":"dev3.in0","to":"dev10.out1"},
      {"from":"dev3.in1","to":"dev9.out1"},
      {"from":"dev3.in4","to":"dev20.out0"},
      {"from":"dev4.in0","to":"dev2.out0"},
      {"from":"dev4.in1","to":"dev3.out0"},
      {"from":"dev4.in2","to":"dev21.out0"},
      {"from":"dev5.in0","to":"dev7.out0"},
      {"from":"dev6.in0","to":"dev4.out1"},
      {"from":"dev7.in0","to":"dev1.out0"},
      {"from":"dev7.in1","to":"dev6.out0"},
      {"from":"dev8.in0","to":"dev4.out1"},
      {"from":"dev9.in1","to":"dev0.out0"},
      {"from":"dev9.in2","to":"dev0.out1"},
      {"from":"dev9.in3","to":"dev11.out0"},
      {"from":"dev9.in4","to":"dev11.out1"},
      {"from":"dev10.in0","to":"dev0.out0"},
      {"from":"dev10.in1","to":"dev0.out1"},
      {"from":"dev10.in2","to":"dev11.out0"},
      {"from":"dev10.in3","to":"dev11.out1"},
      {"from":"dev11.in0","to":"dev16.out0"},
      {"from":"dev11.in1","to":"dev17.out0"},
      {"from":"dev11.in2","to":"dev18.out0"},
      {"from":"dev11.in3","to":"dev19.out0"},
      {"from":"dev22.in0","to":"dev4.out0"},
      {"from":"dev23.in0","to":"dev4.out1"},
      {"from":"dev24.in0","to":"dev5.out0"},
      {"from":"dev25.in0","to":"dev8.out7"}
    ]
  },

  // RS-FF
  {
    name: 'RS-FF',
    width: 600,
    height: 150,
    "devices":[
      {"type":"DC","id":"dev0","x":16,"y":32,"label":"DC"},
      {"type":"NOR","id":"dev1","x":160,"y":16,"label":"NOR"},
      {"type":"Toggle","id":"dev2","x":64,"y":64,"label":"Toggle","state":{"on":true}},
      {"type":"Toggle","id":"dev3","x":64,"y":16,"label":"Toggle","state":{"on":false}},
      {"type":"NOR","id":"dev4","x":160,"y":64,"label":"NOR"},
      {"type":"In","id":"dev5","x":112,"y":16,"label":"R"},
      {"type":"In","id":"dev6","x":112,"y":64,"label":"S"},
      {"type":"LED","id":"dev7","x":256,"y":16,"label":"LED"},
      {"type":"Out","id":"dev8","x":208,"y":16,"label":"Q"}
    ],
    "connectors":[
      {"from":"dev1.in0","to":"dev5.out0"},
      {"from":"dev1.in1","to":"dev4.out0"},
      {"from":"dev2.in0","to":"dev0.out0"},
      {"from":"dev3.in0","to":"dev0.out0"},
      {"from":"dev4.in0","to":"dev1.out0"},
      {"from":"dev4.in1","to":"dev6.out0"},
      {"from":"dev5.in0","to":"dev3.out0"},
      {"from":"dev6.in0","to":"dev2.out0"},
      {"from":"dev7.in0","to":"dev8.out0"},
      {"from":"dev8.in0","to":"dev1.out0"}
    ],
  },

  // D-FF
  {
    name: 'D-FF',
    width: 600,
    height: 150,
    "devices":[
      {"type":"DC","id":"dev0","x":16,"y":24,"label":"DC"},
      {"type":"Toggle","id":"dev1","x":64,"y":16,"label":"Toggle","state":{"on":false}},
      {"type":"Toggle","id":"dev2","x":64,"y":64,"label":"Toggle","state":{"on":true}},
      {"type":"In","id":"dev3","x":112,"y":16,"label":"D"},
      {"type":"In","id":"dev4","x":112,"y":64,"label":"CLK"},
      {"type":"NOT","id":"dev5","x":160,"y":16,"label":"NOT"},
      {"type":"LED","id":"dev6","x":384,"y":32,"label":"LED"},
      {"type":"AND","id":"dev7","x":208,"y":16,"label":"AND"},
      {"type":"AND","id":"dev8","x":208,"y":56,"label":"AND"},
      {"type":"RS-FF","id":"dev9","x":256,"y":32,"label":"RS-FF"},
      {"type":"Out","id":"dev10","x":336,"y":32,"label":"Out"}
    ],
    "connectors":[
      {"from":"dev1.in0","to":"dev0.out0"},
      {"from":"dev2.in0","to":"dev0.out0"},
      {"from":"dev3.in0","to":"dev1.out0"},
      {"from":"dev4.in0","to":"dev2.out0"},
      {"from":"dev5.in0","to":"dev3.out0"},
      {"from":"dev6.in0","to":"dev10.out0"},
      {"from":"dev7.in0","to":"dev5.out0"},
      {"from":"dev7.in1","to":"dev4.out0"},
      {"from":"dev8.in0","to":"dev3.out0"},
      {"from":"dev8.in1","to":"dev4.out0"},
      {"from":"dev9.in0","to":"dev7.out0"},
      {"from":"dev9.in1","to":"dev8.out0"},
      {"from":"dev10.in0","to":"dev9.out0"}
    ],
  },

  // Bit
  {
    name: 'Bit',
    width: 600,
    height: 150,
    "devices":[
      {"type":"DC","id":"dev0","x":16,"y":32,"label":"DC"},
      {"type":"Toggle","id":"dev1","x":64,"y":16,"label":"Toggle","state":{"on":false}},
      {"type":"Toggle","id":"dev2","x":64,"y":64,"label":"Toggle","state":{"on":true}},
      {"type":"Mux","id":"dev3","x":160,"y":32,"label":"Mux"},
      {"type":"D-FF","id":"dev4","x":240,"y":48,"label":"D-FF"},
      {"type":"Out","id":"dev5","x":320,"y":48,"label":"Out"},
      {"type":"Toggle","id":"dev6","x":64,"y":120,"label":"Toggle","state":{"on":true}},
      {"type":"In","id":"dev7","x":112,"y":16,"label":"in"},
      {"type":"In","id":"dev8","x":112,"y":64,"label":"load"},
      {"type":"In","id":"dev9","x":112,"y":120,"label":"CLK"},
      {"type":"LED","id":"dev10","x":368,"y":48,"label":"LED"}
    ],
    "connectors":[
      {"from":"dev1.in0","to":"dev0.out0"},
      {"from":"dev2.in0","to":"dev0.out0"},
      {"from":"dev3.in0","to":"dev4.out0"},
      {"from":"dev3.in1","to":"dev7.out0"},
      {"from":"dev3.in2","to":"dev8.out0"},
      {"from":"dev4.in0","to":"dev3.out0"},
      {"from":"dev4.in1","to":"dev9.out0"},
      {"from":"dev5.in0","to":"dev4.out0"},
      {"from":"dev6.in0","to":"dev0.out0"},
      {"from":"dev7.in0","to":"dev1.out0"},
      {"from":"dev8.in0","to":"dev2.out0"},
      {"from":"dev9.in0","to":"dev6.out0"},
      {"from":"dev10.in0","to":"dev5.out0"}
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
