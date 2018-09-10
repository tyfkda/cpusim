declare module 'simcirjs' {
  type Graphic = any

  interface SimcirJS {
    public $: any
    public unit: number

    public setupSimcir(elem: any, options: any)
    public createSVGElement(tagName: string)
    public enableEvents(elem: any, enable: boolean)
    public graphics(elem: any): Graphic
    public registerDevice(type: string, factory: Function, deprecated?: boolean)
  }

  declare const simcir: SimcirJS
}
