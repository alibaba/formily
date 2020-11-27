import { FormPath, isArr } from '@formily/shared'
import { action, makeObservable, observable } from 'mobx'
import {
  FeedbackInformation,
  IFeedbackInformation,
  IFeedbackVisitor
} from '../types'
export class Feedback {
  informations: FeedbackInformation[] = []
  constructor(informations?: FeedbackInformation[]) {
    this.informations = informations || []
    makeObservable(this, {
      informations: observable,
      update: action,
      clear: action,
      traverse: action
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

  traverse = (visitor?: IFeedbackVisitor) => {
    this.informations = this.informations.map(visitor)
  }

  update = (...infos: IFeedbackInformation[]) => {
    if (infos.length > 1) return infos.forEach(info => this.update(info))
    if (infos.length === 0) return
    const info = infos[0]
    const target = {
      ...info,
      path: info?.path ? String(info.path) : '@root'
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

  find = (info: IFeedbackInformation) => {
    return this.informations.filter(item => {
      if (info.type && info.type !== item.type) return false
      if (info.code && info.code !== item.code) return false
      if (info.path && !FormPath.parse(info.path).match(item.path)) return false
      if (isArr(item.messages) && !item.messages.length) return false
      if (!item.messages) return false
      if (info.triggerType && info.triggerType !== item.triggerType)
        return false
      return true
    })
  }

  clear = (info?: IFeedbackInformation) => {
    this.informations = this.informations.filter(item => {
      if (info.type && info.type !== item.type) return true
      if (info.code && info.code !== item.code) return true
      if (info.path && !FormPath.parse(info.path).match(item.path)) return true
      if (info.triggerType && info.triggerType !== item.triggerType) return true
      return false
    })
  }
}
