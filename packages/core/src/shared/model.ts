import { clone, isEqual, isFn, each, globalThisPolyfill } from '@uform/shared'
import produce, { Draft } from 'immer'
import { Subscrible } from './subscrible'
import { IStateModelFactory, StateDirtyMap, IModel, StateModel } from '../types'
const hasProxy = !!globalThisPolyfill.Proxy

export const createStateModel = <State = {}, Props = {}>(
  Factory: IStateModelFactory<State, Props>
) => {
  return class Model<DefaultProps> extends Subscrible<State>
    implements IModel<State, Props & DefaultProps> {
    public state: State & { displayName?: string }
    public props: Props & DefaultProps & { useDirty?: boolean }
    public displayName?: string
    public dirtyNum: number
    public dirtyMap: StateDirtyMap<State>
    public batching: boolean
    public controller: StateModel<State>
    constructor(defaultProps: DefaultProps) {
      super()
      this.state = { ...Factory.defaultState }
      this.props = {
        ...Factory.defaultProps,
        ...defaultProps
      }
      this.dirtyMap = {}
      this.dirtyNum = 0
      this.batching = false
      this.controller = new Factory(this.state, this.props)
      this.displayName = Factory.displayName
      this.state.displayName = this.displayName
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

    unsafe_getSourceState = (callback?: (state: State) => any) => {
      if (isFn(callback)) {
        return callback(this.state)
      } else {
        return this.state
      }
    }

    unsafe_setSourceState = (callback: (state: State) => void) => {
      if (isFn(callback)) {
        if (!hasProxy || this.props.useDirty) {
          callback(this.state)
        } else {
          this.state = produce(this.state, callback)
        }
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
            this.controller.computeState(draft, this.state)
          }
          const draftKeys = Object.keys(draft || {})
          const stateKeys = Object.keys(this.state || {})
          each(
            draftKeys.length > stateKeys.length ? draft : this.state,
            (value, key) => {
              if (!isEqual(value, draft[key])) {
                this.state[key] = draft[key]
                this.dirtyMap[key] = true
                this.dirtyNum++
              }
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
        } else {
          this.dirtyNum = 0
          this.dirtyMap = {}
          //用proxy解决脏检查计算属性问题
          this.state = produce(
            this.state,
            draft => {
              callback(draft)
              if (isFn(this.controller.computeState)) {
                this.controller.computeState(draft, this.state)
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
      key ? this.dirtyMap[key] === true : this.dirtyNum > 0

    getChanged = () => {
      if (!hasProxy || this.props.useDirty) {
        return clone(this.dirtyMap)
      } else {
        return this.dirtyMap
      }
    }
  }
}
