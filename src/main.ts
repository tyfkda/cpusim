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
      {"type":"Toggle","id":"dev0","x":64,"y":24,"label":"Toggle","state":{"on":true}},
      {"type":"DC","id":"dev1","x":16,"y":48,"label":"DC"},
      {"type":"Toggle","id":"dev2","x":64,"y":72,"label":"Toggle","state":{"on":true}},
      {"type":"In","id":"dev3","x":112,"y":24,"label":"a"},
      {"type":"In","id":"dev4","x":112,"y":72,"label":"b"},
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

  for (let i = 0; i < kDevices.length; ++i) {
    const parent = parents[i]
    if (parent == null)
      break
    const device = kDevices[i]
    let nextToolbox = toolbox
    device.width = parent.clientWidth
    device.height = parent.clientHeight
    device.toolbox = toolbox
    if (device.name != null) {
      const name = device.name
      if (!device.noRegister) {
        simcir.registerDevice(name, device)
        nextToolbox = [{type: name}].concat(toolbox)
      }
    }

    const div = document.createElement('div')
    div.classList.add('simcir')
    parent.appendChild(div)
    simcir.setupSimcir([div], device)

    toolbox = nextToolbox
  }
})
