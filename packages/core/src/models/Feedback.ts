import { FormPath, isArr, isRegExp } from '@formily/shared'
import { action, computed, makeObservable, observable } from 'mobx'
import {
  FeedbackInformation,
  IFeedbackInformation,
  ISearchFeedbackInformation,
  IFeedbackReducer
} from '../types'
export class Feedback {
  informations: FeedbackInformation[] = []
  constructor(informations?: FeedbackInformation[]) {
    this.informations = informations || []
    makeObservable(this, {
      informations: observable,
      valid: computed,
      invalid: computed,
      errors: computed,
      successes: computed,
      warnings: computed,
      update: action,
      clear: action,
      reduce: action
    })
  }

  get valid() {
    return !this.errors.length
  }

  get invalid() {
    return !this.valid
  }

  get errors() {
    return this.query({
      type: 'error'
    })
  }

  get warnings() {
    return this.query({
      type: 'warning'
    })
  }

  get successes() {
    return this.query({
      type: 'success'
    })
  }

  reduce = (reducer?: IFeedbackReducer) => {
    this.informations = this.informations.reduce(reducer, [])
  }

  update = (...infos: IFeedbackInformation[]) => {
    if (infos.length > 1) return infos.forEach(info => this.update(info))
    if (infos.length === 0) return
    const info = infos[0]
    const target = {
      ...info,
      address: info?.address ? String(info.address) : '@root',
      path: info?.path ? String(info.path) : ''
    }
    const searched = this.query(target)
    if (searched?.length) {
      searched.forEach(item => {
        Object.assign(item, target)
      })
    } else {
      this.informations.push(target)
    }
  }

  query = (info: ISearchFeedbackInformation) => {
    return this.informations.filter(item => {
      if (info.type && info.type !== item.type) return false
      if (info.code && info.code !== item.code) return false
      if (info.address) {
        if (isRegExp(info.address)) {
          if (!info.address.test(item.address)) return false
        } else if (!FormPath.parse(info.address).match(item.address))
          return false
      }
      if (info.path) {
        if (isRegExp(info.path)) {
          if (!info.path.test(item.path)) return false
        } else if (!FormPath.parse(info.path).match(item.path)) return false
      }
      if (isArr(item.messages) && !item.messages.length) return false
      if (!item.messages) return false
      if (info.triggerType && info.triggerType !== item.triggerType)
        return false
      return true
    })
  }

  clear = (info?: ISearchFeedbackInformation) => {
    this.informations = this.informations.filter(item => {
      if (info.type && info.type !== item.type) return true
      if (info.code && info.code !== item.code) return true
      if (info.address) {
        if (isRegExp(info.address)) {
          if (!info.address.test(item.address)) return true
        } else if (!FormPath.parse(info.address).match(item.address))
          return true
      }
      if (info.path) {
        if (isRegExp(info.path)) {
          if (!info.path.test(item.path)) return true
        } else if (!FormPath.parse(info.path).match(item.path)) return true
      }
      if (info.triggerType && info.triggerType !== item.triggerType) return true
      return false
    })
  }
}
