import {
  clone,
  isEqual,
  isFn,
  each,
  globalThisPolyfill,
  Subscribable,
  FormPath,
  FormPathPattern,
  isValid,
  toArr,
  defaults
} from '@formily/shared'
import produce, { Draft, setAutoFreeze } from 'immer'
import {
  IStateModelProvider,
  IStateModelFactory,
  StateDirtyMap,
  IModel,
  StateModel
} from '../types'
const hasProxy = !!globalThisPolyfill.Proxy

setAutoFreeze(false)

export const createStateModel = <State = {}, Props = {}>(
  Factory: IStateModelFactory<State, Props>
): IStateModelProvider<State, Props> => {
  return class Model<DefaultProps = any> extends Subscribable<State>
    implements IModel<State, Props & DefaultProps> {
    public state: State & { displayName?: string }
    public props: Props &
      DefaultProps & {
        useDirty?: boolean
        computeState?: (draft: State, prevState: State) => void
      }
    public cacheProps?: any
    public displayName?: string
    public dirtyNum: number
    public dirtys: StateDirtyMap<State>
    public prevState: State
    public batching: boolean
    public stackCount: number
    public controller: StateModel<State>

    constructor(defaultProps: DefaultProps) {
      super()
      this.state = { ...Factory.defaultState }
      this.prevState = { ...Factory.defaultState }
      this.props = defaults(Factory.defaultProps, defaultProps)
      this.dirtys = {}
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

    getSourceState = (callback?: (state: State) => any) => {
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

    watchProps = <T extends { [key: string]: any }>(
      props: T,
      keys: string[],
      callback: (
        changedProps: {
          [key: string]: any
        },
        props?: T
      ) => void
    ) => {
      if (!this.cacheProps) {
        this.cacheProps = { ...props }
      } else {
        let changeNum = 0
        let changedProps = {}
        toArr(keys).forEach((key: string) => {
          if (!isEqual(this.cacheProps[key], props[key])) {
            changeNum++
            changedProps[key] = props[key]
          }
        })
        if (changeNum > 0) {
          if (isFn(callback)) {
            callback(changedProps, props)
          }
          this.cacheProps = { ...props }
        }
      }
    }

    setState = (
      callback: (state: State | Draft<State>) => State | void,
      silent = false
    ) => {
      if (isFn(callback)) {
        this.stackCount++
        if (!hasProxy || this.props.useDirty) {
          const draft = this.getState()
          if (!this.batching) {
            this.dirtys = {}
            this.dirtyNum = 0
          }
          callback(draft)
          if (isFn(this.props.computeState)) {
            this.props.computeState(draft, this.state)
          }
          if (isFn(this.controller.computeState)) {
            this.controller.computeState(draft, this.state)
          }
          const draftKeys = Object.keys(draft || {})
          const stateKeys = Object.keys(this.state || {})

          each(
            draftKeys.length > stateKeys.length ? draft : this.state,
            (value, key) => {
              if (!isEqual(this.state[key], draft[key])) {
                this.state[key] = draft[key]
                this.dirtys[key] = true
                this.dirtyNum++
              }
            }
          )
          if (isFn(this.controller.dirtyCheck)) {
            const result = this.controller.dirtyCheck(this.dirtys)
            if (isValid(result)) {
              Object.assign(this.dirtys, result)
            }
          }
          if (this.dirtyNum > 0 && !silent) {
            if (this.batching) {
              this.stackCount--
              return
            }
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
              if (isFn(this.props.computeState)) {
                this.props.computeState(draft, this.state)
              }
              if (isFn(this.controller.computeState)) {
                this.controller.computeState(draft, this.state)
              }
            },
            patches => {
              patches.forEach(({ path, op, value }) => {
                if (op === 'replace') {
                  if (!isEqual(this.state[path[0]], value)) {
                    this.dirtys[path[0]] = true
                    this.dirtyNum++
                  }
                } else {
                  this.dirtys[path[0]] = true
                  this.dirtyNum++
                }
              })
            }
          )
          if (isFn(this.controller.dirtyCheck)) {
            const result = this.controller.dirtyCheck(this.dirtys)
            if (isValid(result)) {
              Object.assign(this.dirtys, result)
            }
          }
          if (this.dirtyNum > 0 && !silent) {
            if (this.batching) {
              this.stackCount--
              return
            }
            this.notify(this.getState())
            this.dirtys = {}
            this.dirtyNum = 0
          }
        }

        this.stackCount--
        if (!this.stackCount) {
          this.prevState = { ...this.state }
        }
      }
    }
    /**
     * 当前操作的变化情况
     */
    isDirty = (key?: string) =>
      key ? this.dirtys[key] === true : this.dirtyNum > 0

    getDirtyInfo = () => this.dirtys

    /**
     *
     *在一组操作过程中的变化情况
     */
    hasChanged = (path?: FormPathPattern) => {
      return path
        ? !isEqual(
            FormPath.getIn(this.prevState, path),
            FormPath.getIn(this.state, path)
          )
        : !isEqual(this.prevState, this.state)
    }
  } as any
}
