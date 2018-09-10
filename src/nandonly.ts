/* tslint:disable */
//
// SimcirJS - basicset
//
// Copyright (c) 2014 Kazuhiko Arase
//
// URL: http://www.d-project.com/
//
// Licensed under the MIT license:
//  http://www.opensource.org/licenses/mit-license.php
//

// includes following device types:
//  DC
//  LED
//  PushOff
//  PushOn
//  Toggle
//  BUF
//  NOT
//  AND
//  NAND
//  OR
//  NOR
//  EOR
//  ENOR
//  OSC
//  7seg
//  16seg
//  4bit7seg
//  RotaryEncoder
//  BusIn
//  BusOut

import {simcir, Graphic} from 'simcirjs'

const $s = simcir

const $ = $s.$

// unit size
const unit = $s.unit

// red/black
const defaultLEDColor = '#ff0000'
const defaultLEDBgColor = '#000000'

const multiplyColor = function() {
  const HEX = '0123456789abcdef'
  const toIColor = function(sColor: string) {
    if (!sColor) {
      return 0
    }
    sColor = sColor.toLowerCase()
    if (sColor.match(/^#[0-9a-f]{3}$/i) ) {
      let iColor = 0
      for (let i = 0; i < 6; i += 1) {
        iColor = (iColor << 4) | HEX.indexOf(sColor.charAt( (i >> 1) + 1) )
      }
      return iColor
    } else if (sColor.match(/^#[0-9a-f]{6}$/i) ) {
      let iColor = 0
      for (let i = 0; i < 6; i += 1) {
        iColor = (iColor << 4) | HEX.indexOf(sColor.charAt(i + 1) )
      }
      return iColor
    }
    return 0
  }
  const toSColor = function(iColor: number) {
    let sColor = '#'
    for (let i = 0; i < 6; i += 1) {
      sColor += HEX.charAt( (iColor >>> (5 - i) * 4) & 0x0f)
    }
    return sColor
  }
  const toRGB = function(iColor: number) {
    return {
      r: (iColor >>> 16) & 0xff,
      g: (iColor >>> 8) & 0xff,
      b: iColor & 0xff}
  }
  const multiplyColor = function(iColor1: number, iColor2: number, ratio: number) {
    const c1 = toRGB(iColor1)
    const c2 = toRGB(iColor2)
    const mc = function(v1: number, v2: number, ratio: number) {
      return ~~Math.max(0, Math.min( (v1 - v2) * ratio + v2, 255) )
    }
    return (mc(c1.r, c2.r, ratio) << 16) |
      (mc(c1.g, c2.g, ratio) << 8) | mc(c1.b, c2.b, ratio)
  }
  return function(color1: string, color2: string, ratio: number) {
    return toSColor(multiplyColor(
      toIColor(color1), toIColor(color2), ratio) )
  }
}()

// symbol draw functions
//const drawBUF = function(g: Graphic, x: number, y: number, width: number, height: number) {
//  g.moveTo(x, y)
//  g.lineTo(x + width, y + height / 2)
//  g.lineTo(x, y + height)
//  g.lineTo(x, y)
//  g.closePath(true)
//}
const drawAND = function(g: Graphic, x: number, y: number, width: number, height: number) {
  g.moveTo(x, y)
  g.curveTo(x + width, y, x + width, y + height / 2)
  g.curveTo(x + width, y + height, x, y + height)
  g.lineTo(x, y)
  g.closePath(true)
}
//const drawOR = function(g: Graphic, x: number, y: number, width: number, height: number) {
//  const depth = width * 0.2
//  g.moveTo(x, y)
//  g.curveTo(x + width - depth, y, x + width, y + height / 2)
//  g.curveTo(x + width - depth, y + height, x, y + height)
//  g.curveTo(x + depth, y + height, x + depth, y + height / 2)
//  g.curveTo(x + depth, y, x, y)
//  g.closePath(true)
//}
//const drawEOR = function(g: Graphic, x: number, y: number, width: number, height: number) {
//  drawOR(g, x + 3, y, width - 3, height)
//  const depth = (width - 3) * 0.2
//  g.moveTo(x, y + height)
//  g.curveTo(x + depth, y + height, x + depth, y + height / 2)
//  g.curveTo(x + depth, y, x, y)
//  g.closePath()
//}
//const drawNOT = function(g: Graphic, x: number, y: number, width: number, height: number) {
//  drawBUF(g, x - 1, y, width - 2, height)
//  g.drawCircle(x + width - 1, y + height / 2, 2)
//}
const drawNAND = function(g: Graphic, x: number, y: number, width: number, height: number) {
  drawAND(g, x - 1, y, width - 2, height)
  g.drawCircle(x + width - 1, y + height / 2, 2)
}
//const drawNOR = function(g: Graphic, x: number, y: number, width: number, height: number) {
//  drawOR(g, x - 1, y, width - 2, height)
//  g.drawCircle(x + width - 1, y + height / 2, 2)
//}
//const drawENOR = function(g: Graphic, x: number, y: number, width: number, height: number) {
//  drawEOR(g, x - 1, y, width - 2, height)
//  g.drawCircle(x + width - 1, y + height / 2, 2)
//}
// logical functions
const AND = function(a: number, b: number) { return a & b }
//const OR = function(a: number, b: number) { return a | b }
//const EOR = function(a: number, b: number) { return a ^ b }
//const BUF = function(a: number) { return (a == 1)? 1 : 0 }
const NOT = function(a: number) { return (a == 1)? 0 : 1 }

const onValue = 1
//const offValue = null
const isHot = function(v?: number) { return v != null }
const intValue = function(v?: number) { return isHot(v)? 1 : 0 }

const createSwitchFactory = function(type: string) {
  return function(device: any) {
    const in1 = device.addInput()
    const out1 = device.addOutput()
    let on = (type == 'PushOff')

    if (type == 'Toggle' && device.deviceDef.state) {
      on = device.deviceDef.state.on
    }
    device.getState = function() {
      return type == 'Toggle'? { on : on } : null
    }

    device.$ui.on('inputValueChange', function() {
      if (on) {
        out1.setValue(in1.getValue() )
      }
    })
    const updateOutput = function() {
      out1.setValue(on? in1.getValue() : null)
    }
    updateOutput()

    const super_createUI = device.createUI
    device.createUI = function() {
      super_createUI()
      const size = device.getSize()
      const $button = $s.createSVGElement('rect').
          attr({x: size.width / 4, y: size.height / 4,
                width: size.width / 2, height: size.height / 2,
                rx: 2, ry: 2})
      $button.addClass('simcir-basicset-switch-button')
      if (type == 'Toggle' && on) {
        $button.addClass('simcir-basicset-switch-button-pressed')
      }
      device.$ui.append($button)
      const button_mouseDownHandler = function(event: Event) {
        event.preventDefault()
        event.stopPropagation()
        if (type == 'PushOn') {
          on = true
          $button.addClass('simcir-basicset-switch-button-pressed')
        } else if (type == 'PushOff') {
          on = false
          $button.addClass('simcir-basicset-switch-button-pressed')
        } else if (type == 'Toggle') {
          on = !on
          $button.addClass('simcir-basicset-switch-button-pressed')
        }
        updateOutput()
        $(document).on('mouseup', button_mouseUpHandler)
        $(document).on('touchend', button_mouseUpHandler)
      }
      const button_mouseUpHandler = function(_event: Event) {
        if (type == 'PushOn') {
          on = false
          $button.removeClass('simcir-basicset-switch-button-pressed')
        } else if (type == 'PushOff') {
          on = true
          $button.removeClass('simcir-basicset-switch-button-pressed')
        } else if (type == 'Toggle') {
          // keep state
          if (!on) {
            $button.removeClass('simcir-basicset-switch-button-pressed')
          }
        }
        updateOutput()
        $(document).off('mouseup', button_mouseUpHandler)
        $(document).off('touchend', button_mouseUpHandler)
      }
      device.$ui.on('deviceAdd', function() {
        $s.enableEvents($button, true)
        $button.on('mousedown', button_mouseDownHandler)
        $button.on('touchstart', button_mouseDownHandler)
      })
      device.$ui.on('deviceRemove', function() {
        $s.enableEvents($button, false)
        $button.off('mousedown', button_mouseDownHandler)
        $button.off('touchstart', button_mouseDownHandler)
      })
      device.$ui.addClass('simcir-basicset-switch')
    }
  }
}

const createLogicGateFactory = function(op: Function, out: Function, draw: (g: Graphic, x: number, y: number, width: number, height: number) => void) {
  return function(device: any) {
    const numInputs = (op == null)? 1 :
        Math.max(2, device.deviceDef.numInputs || 2)
    device.halfPitch = numInputs > 2
    for (let i = 0; i < numInputs; i += 1) {
      device.addInput()
    }
    device.addOutput()
    const inputs = device.getInputs()
    const outputs = device.getOutputs()
    device.$ui.on('inputValueChange', function() {
      let b = intValue(inputs[0].getValue() )
      if (op != null) {
        for (let i = 1; i < inputs.length; i += 1) {
          b = op(b, intValue(inputs[i].getValue() ) )
        }
      }
      b = out(b)
      outputs[0].setValue( (b == 1)? 1 : null)
    })
    const super_createUI = device.createUI
    device.createUI = function() {
      super_createUI()
      const size = device.getSize()
      const g = $s.graphics(device.$ui)
      g.attr['class'] = 'simcir-basicset-symbol'
      draw(g,
           (size.width - unit) / 2,
           (size.height - unit) / 2,
           unit, unit)
      if (op != null) {
        device.doc = {
          params: [
            {name: 'numInputs', type: 'number',
             defaultValue: 2,
             description: 'number of inputs.'}
          ],
          code: '{"type":"' + device.deviceDef.type + '","numInputs":2}'
        }
      }
    }
  }
}

// register direct current source
$s.registerDevice('DC', function(device: any) {
  device.addOutput()
  const super_createUI = device.createUI
  device.createUI = function() {
    super_createUI()
    device.$ui.addClass('simcir-basicset-dc')
  }
  device.$ui.on('deviceAdd', function() {
    device.getOutputs()[0].setValue(onValue)
  })
  device.$ui.on('deviceRemove', function() {
    device.getOutputs()[0].setValue(null)
  })
})

// register simple LED
$s.registerDevice('LED', function(device: any) {
  const in1 = device.addInput()
  const super_createUI = device.createUI
  device.createUI = function() {
    super_createUI()
    const hiColor = device.deviceDef.color || defaultLEDColor
    const bgColor = device.deviceDef.bgColor || defaultLEDBgColor
    const loColor = multiplyColor(hiColor, bgColor, 0.25)
    const bLoColor = multiplyColor(hiColor, bgColor, 0.2)
    const bHiColor = multiplyColor(hiColor, bgColor, 0.8)
    const size = device.getSize()
    const $ledbase = $s.createSVGElement('circle').
        attr({cx: size.width / 2, cy: size.height / 2, r: size.width / 4}).
        attr('stroke', 'none').
        attr('fill', bLoColor)
    device.$ui.append($ledbase)
    const $led = $s.createSVGElement('circle').
        attr({cx: size.width / 2, cy: size.height / 2, r: size.width / 4 * 0.8}).
        attr('stroke', 'none').
        attr('fill', loColor)
    device.$ui.append($led)
    device.$ui.on('inputValueChange', function() {
      $ledbase.attr('fill', isHot(in1.getValue() )? bHiColor : bLoColor)
      $led.attr('fill', isHot(in1.getValue() )? hiColor : loColor)
    })
    device.doc = {
      params: [
        {name: 'color', type: 'string',
         defaultValue: defaultLEDColor,
         description: 'color in hexadecimal.'},
        {name: 'bgColor', type: 'string',
         defaultValue: defaultLEDBgColor,
         description: 'background color in hexadecimal.'}
      ],
      code: '{"type":"' + device.deviceDef.type +
        '","color":"' + defaultLEDColor + '"}'
    }
  }
})

// register switches
$s.registerDevice('PushOff', createSwitchFactory('PushOff') )
$s.registerDevice('PushOn', createSwitchFactory('PushOn') )
$s.registerDevice('Toggle', createSwitchFactory('Toggle') )

// register logic gates
//$s.registerDevice('BUF', createLogicGateFactory(null, BUF, drawBUF) )
//$s.registerDevice('NOT', createLogicGateFactory(null, NOT, drawNOT) )
//$s.registerDevice('AND', createLogicGateFactory(AND, BUF, drawAND) )
$s.registerDevice('NAND', createLogicGateFactory(AND, NOT, drawNAND) )
//$s.registerDevice('OR', createLogicGateFactory(OR, BUF, drawOR) )
//$s.registerDevice('NOR', createLogicGateFactory(OR, NOT, drawNOR) )
//$s.registerDevice('XOR', createLogicGateFactory(EOR, BUF, drawEOR) )
//$s.registerDevice('XNOR', createLogicGateFactory(EOR, NOT, drawENOR) )
// deprecated. not displayed in the default toolbox.
//$s.registerDevice('EOR', createLogicGateFactory(EOR, BUF, drawEOR), true)
//$s.registerDevice('ENOR', createLogicGateFactory(EOR, NOT, drawENOR), true)
