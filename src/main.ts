///<reference path="./decl/simcirjs.d.ts" />

import {simcir} from 'simcirjs'
import './nandonly'

window.addEventListener('load', () => {
  const parent = document.getElementById('simcir-placeholder')
  if (!parent)
    return

  simcir.registerDevice('NOT', {
    width: 600,
    height: 400,
    toolbox:[
      {"type":"In"},
      {"type":"Out"},
      {"type":"DC"},
      {"type":"LED"},
      {"type":"Toggle"},
      {"type":"NAND"},
    ],
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

    chipWidth: 2,
    draw: function(g, x, y, width, height) {
      g.moveTo(x - 1, y)
      g.lineTo(x - 1 + width - 2, y + height / 2)
      g.lineTo(x - 1, y + height)
      g.lineTo(x - 1, y)
      g.closePath(true)

      g.drawCircle(x + width - 1, y + height / 2, 2)
    },
  })

  const div = document.createElement('div')
  simcir.setupSimcir([div], {
    width: parent.clientWidth,
    height: parent.clientHeight,
  })

  div.classList.add('simcir')

  parent.appendChild(div)
})
