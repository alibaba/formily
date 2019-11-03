import {
  clone,
  isEqual,
  isFn,
  each,
  globalThisPolyfill,
  Subscribable
} from '@uform/shared'
import produce, { Draft } from 'immer'
import { IStateModelFactory, StateDirtyMap, IModel, StateModel } from '../types'
const hasProxy = !!globalThisPolyfill.Proxy

export const createStateModel = <State = {}, Props = {}>(
  Factory: IStateModelFactory<State, Props>
) => {
  return class Model<DefaultProps> extends Subscribable<State>
    implements IModel<State, Props & DefaultProps> {
    public state: State & { displayName?: string }
    public props: Props &
      DefaultProps & {
        useDirty?: boolean
      }
    public displayName?: string
    public dirtyNum: number
    public dirtys: StateDirtyMap<State>
    public persistDirtys: StateDirtyMap<State>
    public batching: boolean
    public stackCount: number
    public controller: StateModel<State>

    constructor(defaultProps: DefaultProps) {
      super()
      this.state = { ...Factory.defaultState }
      this.props = {
        ...Factory.defaultProps,
        ...defaultProps
      }
      this.dirtys = {}
      this.persistDirtys = {}
      this.dirtyNum = 0
      this.stackCount = 0
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
      this.dirtys = {}
      this.dirtyNum = 0
      this.batching = false
    }

    getState = (callback?: (state: State) => any) => {
      if (isFn(callback)) {
        return callback(this.getState())
      } else {
        if (isFn(this.controller.publishState)) {
          return this.controller.publishState(this.state)
        }

        if (!hasProxy || this.props.useDirty) {          
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
          this.state = produce(this.state, (draft) => {
            callback(draft)
          })
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
          if (!this.batching) {
            this.dirtys = {}
            this.dirtyNum = 0
          }
          if (!this.stackCount) {
            this.persistDirtys = {}
          }
          this.stackCount++
          callback(draft)
          if (isFn(this.controller.computeState)) {
            this.controller.computeState(draft, this.state)
          }
          const draftKeys = Object.keys(draft || {})
          const stateKeys = Object.keys(this.state || {})

          each(draftKeys.length > stateKeys.length ? draft : this.state, (value, key) => {
            if (!isEqual(this.state[key], draft[key])) {
              this.state[key] = draft[key]
              this.dirtys[key] = true
              this.persistDirtys[key] = true
              this.dirtyNum++
            }
          })
          if (isFn(this.controller.dirtyCheck)) {
            const result = this.controller.dirtyCheck(this.dirtys)
            if (result !== undefined) {
              Object.assign(this.dirtys, result)
            }
          }
          if (this.dirtyNum > 0 && !silent) {
            if (this.batching) return
            this.notify(this.getState())
            this.dirtys = {}
            this.dirtyNum = 0
          }
        } else {          
          if (!this.batching) {
            this.dirtys = {}
            this.dirtyNum = 0
          }
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
                if (op === 'replace') {
                  if (!isEqual(this.state[path[0]], value)) {
                    this.dirtys[path[0]] = true
                    this.persistDirtys[path[0]] = true
                    this.dirtyNum++
                  }
                } else {
                  this.dirtys[path[0]] = true
                  this.persistDirtys[path[0]] = true
                  this.dirtyNum++
                }
              })
            }
          )
          if (isFn(this.controller.dirtyCheck)) {
            const result = this.controller.dirtyCheck(this.dirtys)
            if (result !== undefined) {
              Object.assign(this.dirtys, result)
            }
          }
          if (this.dirtyNum > 0 && !silent) {
            if (this.batching) return
            this.notify(this.getState())
            this.dirtys = {}
            this.dirtyNum = 0
            //1. onFieldChange内的setFormValuesIn中不希望重置当前字段的dirtymap，如果不重置就会死循环
            //2. 自己监听自己，自己修改自己的状态，希望触发onFieldChange
          }
        }
        this.stackCount--
        if (!this.stackCount) {
          this.persistDirtys = {}
        }
      }
    }
    /**
     * 当前操作的变化情况
     */
    hasChanged = (key?: string) =>
      key ? this.dirtys[key] === true : this.dirtyNum > 0
    /**
     *
     *在一组操作过程中的变化情况
     */
    hasChangedInSequence = (key?: string) =>
      key
        ? this.persistDirtys[key]
        : Object.keys(this.persistDirtys || {}).filter(k => this.persistDirtys[k] === true).length > 0

    getChanged = () => this.dirtys

    getChangedInSequence = () => this.persistDirtys
  }
}
