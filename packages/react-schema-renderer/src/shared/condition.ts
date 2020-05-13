import { isArr, isEqual, isBool } from '@formily/shared'

export type ILinkageCondition = any[]

export class JSONCondition {
  public source: ILinkageCondition
  public value: any
  constructor(json: ILinkageCondition, value: any) {
    this.source = json || []
    this.value = value
  }

  complieAtom = (source = []): boolean => {
    switch (source[0]) {
      case '&&':
        return source.slice(1).every(this.complieAtom)
      case '||':
        return source.slice(1).some(this.complieAtom)
      case '>':
        return Number(this.value) > Number(source[1])
      case '<':
        return Number(this.value) < Number(source[1])
      case '>=':
        return Number(this.value) >= Number(source[1])
      case '<=':
        return Number(this.value) <= Number(source[1])
      case '=':
      case '==':
        return isEqual(this.value, source[1])
      case '!=':
        return !isEqual(this.value, source[1])
      case '!':
        return !this.value
      case 'includes':
        if(isArr(this.value)) {
          return this.value.indexOf(source[1]) > -1
        }
        return String(this.value).includes(source[1])
      case 'pattern':
        return new RegExp(source[1]).test(this.value)
      case 'startWith':
        return String(this.value).startsWith(source[1])
      case 'endWith':
        return String(this.value).endsWith(source[1])
    }
    return false
  }

  complie() {
    return this.complieAtom(this.source)
  }

  static calculate = (condition: any, value: any) => {
    if (isArr(condition)) {
      return new JSONCondition(condition, value).complie()
    }
    if (isBool(condition)) return condition
    return false
  }
}
