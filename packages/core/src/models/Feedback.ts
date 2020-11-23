import { FormPathPattern, FormPath, isArr } from '@formily/shared'
import { action, makeObservable, observable } from 'mobx'

export type FeedbackInformation = {
  type: 'error' | 'warning' | 'success'
  code?: string
  path?: FormPathPattern
  messages?: FeedbackMessage
}

export type FeedbackMessage = any[]

export class Feedback {
  informations: FeedbackInformation[] = []
  constructor(informations?: FeedbackInformation[]) {
    this.informations = informations || []
    makeObservable(this, {
      informations: observable,
      update: action,
      clear: action
    })
  }

  get valid() {
    return !this.errors.length
  }

  get invalid() {
    return !this.valid
  }

  get errors() {
    return this.find({
      type: 'error'
    })
  }

  get warnings() {
    return this.find({
      type: 'warning'
    })
  }

  get successes() {
    return this.find({
      type: 'success'
    })
  }

  update(info: FeedbackInformation) {
    const target = {
      path: '__TOP__',
      ...info
    }
    const searched = this.find(target)
    if (searched?.length) {
      searched.forEach(item => {
        Object.assign(item, target)
      })
    } else {
      this.informations.push(target)
    }
  }

  find(info: Partial<FeedbackInformation>) {
    return this.informations.filter(item => {
      if (info.type && info.type !== item.type) return false
      if (info.code && info.code !== item.code) return false
      if (info.path && !FormPath.parse(info.path).match(item.path)) return false
      if (isArr(item.messages) && !item.messages.length) return false
      if (!item.messages) return false
      return true
    })
  }

  clear(info?: Partial<FeedbackInformation>) {
    this.informations = this.informations.filter(item => {
      if (info.type && info.type !== item.type) return true
      if (info.code && info.code !== item.code) return true
      if (info.path && !FormPath.parse(info.path).match(item.path)) return true
      return false
    })
  }
}
