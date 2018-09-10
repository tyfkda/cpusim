///<reference path="./decl/simcirjs.d.ts" />

import {simcir} from 'simcirjs'

window.addEventListener('load', () => {
  const parent = document.getElementById('simcir-placeholder')
  if (!parent)
    return

  const div = document.createElement('div')
  simcir.setupSimcir([div], {
    width: parent.clientWidth,
    height: parent.clientHeight,
  })

  div.classList.add('simcir')

  parent.appendChild(div)
})
