import {
  isEqual,
  isFn,
  Subscribable,
  FormPath,
  FormPathPattern,
  defaults,
  shallowClone
} from '@formily/shared'
import {
  produce,
  enableAllPlugins,
  setAutoFreeze,
  Patch,
  Draft
} from 'immer'
import { StateDirtyMap, IDirtyModelFactory, NormalRecord } from '../types'

enableAllPlugins()
setAutoFreeze(false)

type Recipe<State> = (state?: State) => any

type ExtendsState = NormalRecord & { displayName?: string }

type ExtendsProps<State> = NormalRecord & {
  computeState?: (state: Draft<State>, prevState: State) => any
  dirtyCheck?: (path: FormPathPattern, value: any, nextValue: any) => boolean
}

const applyPatches = (target: any, patches: Patch[]) => {
  patches.forEach(({ op, path, value }) => {
    if (op === 'replace' || op === 'add') {
      FormPath.setIn(target, path, value)
    } else if (op === 'remove') {
      FormPath.deleteIn(target, path)
    }
  })
}

export const createModel = <
  SourceState extends ExtendsState,
  Props extends ExtendsProps<SourceState>
>(
  Factory: IDirtyModelFactory<SourceState, Props>
) => {
  type State = Partial<SourceState>
  return class Model extends Subscribable {
    factory: InstanceType<IDirtyModelFactory<State, Props>>
    state: State
    prevState: State
    props: Props
    patches: Patch[]
    dirtys: StateDirtyMap<State>
    dirtyCount: number
    batching: boolean
    cache: Map<any, any>
    displayName: string
    constructor(props: Props = {} as any) {
      super()
      this.props = defaults(Factory.defaultProps, props)
      this.displayName = Factory.displayName
      this.factory = new Factory(this.props)
      this.cache = new Map()
      this.state = this.factory.state
      this.state.displayName = this.displayName
      this.prevState = this.state
    }

    getBaseState() {
      if (isFn(this.factory.getState)) {
        return this.factory.getState(this.state)
      } else {
        return this.state
      }
    }

    getDirtys(patches: Patch[]): StateDirtyMap<State> {
      return patches.reduce((buf, { path }) => {
        buf[path[0]] = true
        return buf
      }, {})
    }

    dirtyCheck(path: FormPathPattern, nextValue: any) {
      const currentValue = FormPath.getIn(this.state, path)
      if (isFn(this.factory.dirtyCheck)) {
        if (isFn(this.props.dirtyCheck)) {
          return (
            this.factory.dirtyCheck(path, currentValue, nextValue) &&
            this.props.dirtyCheck(path, currentValue, nextValue)
          )
        } else {
          return this.factory.dirtyCheck(path, currentValue, nextValue)
        }
      } else {
        if (isFn(this.props.dirtyCheck)) {
          return this.props.dirtyCheck(path, currentValue, nextValue)
        } else {
          return currentValue !== nextValue
        }
      }
    }

    setState(recipe?: Recipe<State>, silent?: boolean) {
      if (!isFn(recipe)) return
      const base = this.getBaseState()
      this.dirtyCount = 0
      this.patches = []
      this.prevState = base
      this.factory.prevState = base
      produce(
        base,
        draft => {
          recipe(draft)
        },
        patches => {
          this.patches = this.patches.concat(patches)
        }
      )
      this.state = produce(
        base,
        draft => {
          applyPatches(draft, this.patches)
          const dirtys = this.getDirtys(this.patches)
          if (isFn(this.props.computeState)) {
            this.props.computeState(draft, this.prevState)
          }
          if (isFn(this.factory.produce)) {
            this.factory.produce(draft, dirtys)
          }
        },
        patches => {
          if (isFn(this.factory.dirtyCheck)) {
            patches.forEach(patch => {
              const { path, value } = patch
              if (this.dirtyCheck(path, value)) {
                this.patches.push(patch)
                this.dirtyCount++
              }
            })
          } else {
            this.patches = this.patches.concat(patches)
            this.dirtyCount += patches.length
          }
        }
      )
      this.factory.state = this.state
      this.dirtys = this.getDirtys(this.patches)
      if (this.dirtyCount > 0 && !silent) {
        this.notify(this.getState())
      }
      this.dirtyCount = 0
      this.dirtys = {}
      this.patches = []
    }

    setSourceState(recipe?: Recipe<State>) {
      if (!isFn(recipe)) return this.state
      recipe(this.state)
    }

    getState<T extends Recipe<State>>(
      recipe?: T
    ): T extends Recipe<State> ? ReturnType<T> : State {
      if (!isFn(recipe)) return this.getBaseState()
      return recipe(this.getBaseState())
    }

    getSourceState<T extends Recipe<State>>(
      recipe?: T
    ): T extends Recipe<State> ? ReturnType<T> : State {
      if (!isFn(recipe)) return this.state as any
      return recipe(this.state)
    }

    batch(callback?: () => void) {
      this.batching = true
      const prevState = this.state
      if (isFn(callback)) {
        callback()
      }
      this.prevState = prevState
      if (this.dirtyCount > 0) {
        this.notify(this.getState())
      }
      this.batching = false
      this.dirtys = {}
      this.dirtyCount = 0
      this.patches = []
    }

    setCache(key: string, value: any) {
      this.cache.set(key, shallowClone(value))
    }

    getCache(key: string) {
      return this.cache.get(key)
    }

    removeCache(key: string) {
      this.cache.delete(key)
    }

    isDirty(key?: string) {
      if (key) {
        return this.dirtys[key]
      } else {
        return this.dirtyCount > 0
      }
    }

    hasChanged = (path?: FormPathPattern) => {
      return path
        ? !isEqual(
            FormPath.getIn(this.prevState, path),
            FormPath.getIn(this.state, path)
          )
        : !isEqual(this.prevState, this.state)
    }
  }
}
