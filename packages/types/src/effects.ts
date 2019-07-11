import { Subject } from 'rxjs/internal/Subject'
import { IFormActions, IFormPathMatcher } from './form'
export type Dispatcher = (eventName: string, payload: any) => void
export type IEffects = (selector: ISelector, actions: IFormActions) => void

export type ISelector = (
  eventName: string,
  formPathPattern: string | IFormPathMatcher
) => Subject<any>
