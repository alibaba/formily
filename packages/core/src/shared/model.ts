import {
  clone,
  isEqual,
  isFn,
  each,
  isEmpty,
  globalThisPolyfill
} from '@uform/shared'
import produce, { Draft } from 'immer'
import {
  IStateModelFactory,
  StateModelProps,
  StateDirtyMap,
  StateModel
} from '../types'
const hasProxy = !!globalThisPolyfill.Proxy

type Subscriber<S> = (payload: S) => void

type Inner<T> = T extends (...args: any[]) => new (...args: any[]) => infer P
  ? P
  : never

export type Model = Inner<typeof createStateModel>

export const createStateModel = <State = {}, Props = {}>(
  Factory: IStateModelFactory<State, Props>
) => {
  return class Model<DefaultProps> {
    public state: State
    public props: Props & DefaultProps & StateModelProps<State>
    public displayName?: string
    public dirtyNum: number
    public dirtyMap: StateDirtyMap<State>
    public subscribers: Subscriber<State>[]
    public batching: boolean
    public controller: StateModel<State>
    constructor(defaultProps: DefaultProps) {
      this.state = { ...Factory.defaultState }
      this.props = {
        ...Factory.defaultProps,
        ...defaultProps
      }
      this.dirtyMap = {}
      this.dirtyNum = 0
      this.subscribers = []
      this.batching = false
      this.controller = new Factory(this.state, this.props)
      this.displayName = Factory.displayName
    }

    subscribe = (callback?: Subscriber<State>) => {
      if (
        isFn(callback) &&
        !this.subscribers.some(fn => fn.toString() === callback.toString())
      ) {
        this.subscribers.push(callback)
      }
    }

    unsubscribe = (callback?: Subscriber<State>) => {
      if (isFn(callback)) {
        this.subscribers = this.subscribers.filter(fn => {
          return fn.toString() !== callback.toString()
        })
      } else {
        this.subscribers.length = 0
      }
    }

    batch = (callback?: () => void) => {
      this.batching = true
      if (isFn(callback)) {
        callback()
      }
      if (this.dirtyNum > 0) {
        this.notify(this.getState())
      }
      this.dirtyMap = {}
      this.dirtyNum = 0
      this.batching = false
    }

    notify = (payload: State) => {
      each(this.subscribers, callback => callback(payload))
    }

    getState = (callback?: (state: State) => any) => {
      if (isFn(callback)) {
        return callback(this.getState())
      } else {
        if (!hasProxy || this.props.useDirty) {
          if (isFn(this.controller.publishState)) {
            return this.controller.publishState(this.state)
          }
          return clone(this.state)
        } else {
          return produce(this.state, () => {})
        }
      }
    }

    getSourceState = (callback?: (state: State) => State) => {
      if (isFn(callback)) {
        return callback(this.state)
      } else {
        return this.state
      }
    }

    setSourceState = (callback: (state: State) => void) => {
      if (isFn(callback)) {
        callback(this.state)
      }
    }

    setState = (
      callback: (state: State | Draft<State>) => State | void,
      silent = false
    ) => {
      if (isFn(callback)) {
        if (!hasProxy || this.props.useDirty) {
          const draft = this.getState()
          this.dirtyNum = 0
          this.dirtyMap = {}
          callback(draft)
          if (isFn(this.controller.computeState)) {
            this.controller.computeState(draft)
          }
          each(this.state, (value, key) => {
            if (isEmpty(value) && isEmpty(draft[key])) return
            if (!isEqual(value, draft[key])) {
              this.state[key] = draft[key]
              this.dirtyMap[key] = true
              this.dirtyNum++
            }
          })
          if (isFn(this.controller.dirtyCheck)) {
            const result = this.controller.dirtyCheck(this.dirtyMap)
            if (result !== undefined) {
              Object.assign(this.dirtyMap, result)
            }
          }
          if (this.dirtyNum > 0 && !silent) {
            if (this.batching) return
            this.notify(this.getState())
            this.dirtyMap = {}
            this.dirtyNum = 0
          }
        } else {
          this.dirtyNum = 0
          this.dirtyMap = {}
          //用proxy解决脏检查计算属性问题
          this.state = produce(
            this.state,
            draft => {
              callback(draft)
              if (isFn(this.controller.computeState)) {
                this.controller.computeState(draft)
              }
            },
            patches => {
              patches.forEach(({ path, op, value }) => {
                if (!this.dirtyMap[path[0]]) {
                  if (op === 'replace') {
                    if (!isEqual(this.state[path[0]], value)) {
                      this.dirtyMap[path[0]] = true
                      this.dirtyNum++
                    }
                  } else {
                    this.dirtyMap[path[0]] = true
                    this.dirtyNum++
                  }
                }
              })
            }
          )
          if (isFn(this.controller.dirtyCheck)) {
            const result = this.controller.dirtyCheck(this.dirtyMap)
            if (result !== undefined) {
              Object.assign(this.dirtyMap, result)
            }
          }
          if (this.dirtyNum > 0 && !silent) {
            if (this.batching) return
            this.notify(this.getState())
            this.dirtyMap = {}
            this.dirtyNum = 0
          }
        }
      }
    }

    hasChanged = (key?: string) =>
      key ? !!this.dirtyMap[key] : this.dirtyNum > 0

    getChanged = () => {
      if (!hasProxy || this.props.useDirty) {
        return clone(this.dirtyMap)
      } else {
        return produce(this.dirtyMap, () => {})
      }
    }
  }
}
