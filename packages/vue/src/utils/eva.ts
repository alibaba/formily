import { computed } from '@vue/composition-api'
import { Subject } from 'rxjs/internal/Subject'
import { filter } from 'rxjs/internal/operators/filter'

const isFn = val => typeof val === 'function'

const implementSymbol = Symbol.for('__REVA_IMPLEMENT__')
const namesSymbol = Symbol.for('__REVA_NAMES__')
const actionsSymbol = Symbol.for('__REVA_ACTIONS')

const createEva = (actions, effects, subscribes) => {
  subscribes = subscribes || {}

  const subscription = () => {
    if (isFn(effects)) {
      effects((type, $filter) => {
        if (!subscribes[type]) {
          subscribes[type] = new Subject()
        }
        if (isFn($filter)) {
          return subscribes[type].pipe(filter($filter))
        }
        return subscribes[type]
      })
    }
  }

  const dispatch = (type, ...args) => {
    if (subscribes[type]) {
      subscribes[type].next(...args)
    }
  }

  dispatch.lazy = (type, fn) => {
    if (subscribes[type] && isFn(fn)) {
      subscribes[type].next(fn())
    }
  }

  const implementAction = (name, fn) => {
    if (actions && actions[implementSymbol]) {
      actions[implementSymbol](name, fn)
    }
    return fn
  }

  const implementActions = obj => {
    const actions = {}
    for (const name in obj) {
      if (obj.hasOwnProperty(name) && isFn(obj[name])) {
        actions[name] = implementAction(name, obj[name])
      }
    }
    return actions
  }

  return {
    dispatch,
    subscription,
    implementActions
  }
}

class ActionFactory {
  constructor(names, isAsync = true) {
    const resolvers = {}
    const actions = {}
    names.forEach(name => {
      this[name] = (...args) => {
        if (isAsync) {
          return new Promise((resolve, reject) => {
            if (actions[name]) {
              resolve(actions[name](...args))
            } else {
              resolvers[name] = resolvers[name] || []
              resolvers[name].push({ resolve, args, reject })
            }
          })
        } else {
          if (actions[name]) {
            return actions[name](...args)
          } else {
            resolvers[name] = resolvers[name] || []
            resolvers[name].push({ resolve: null, args, reject: null })
            if (console && console.error) {
              console.error(
                `The action "${name}" is not implemented! We recommend that you call this method by \`createAsyncFormActions\``
              )
            }
          }
        }
      }
    })

    this[actionsSymbol] = true
    this[namesSymbol] = names

    this[implementSymbol] = (name, fn) => {
      if (resolvers[name] && resolvers[name].length) {
        setTimeout(() => {
          for (let i = 0; i < resolvers[name].length; i++) {
            const { resolve, args } = resolvers[name][i]
            if (resolve) resolve(fn(...args))
            else {
              fn(...args)
            }
          }
          resolvers[name].length = 0
        })
      }
      actions[name] = fn
      return fn
    }
  }
}

export const createActions = (...names) => new ActionFactory(names, false)

export const createAsyncActions = (...names) => new ActionFactory(names, true)

export const mergeActions = (...all) => {
  const implement = (name, fn) => {
    all.forEach(actions => {
      if (actions[implementSymbol] && actions[namesSymbol].indexOf(name) > -1) {
        actions[implementSymbol](name, fn)
      }
    })
    return fn
  }
  const result = {}
  for (let i = 0; i < all.length; i++) {
    const actions = all[i]
    result[namesSymbol] = result[namesSymbol] || []
    result[namesSymbol] = result[namesSymbol].concat(actions[namesSymbol])
    let key
    for (key in actions) {
      if (
        actions.hasOwnProperty(key) &&
        key !== implementSymbol &&
        key !== namesSymbol
      ) {
        result[key] = actions[key]
      }
    }
  }
  result[actionsSymbol] = true
  result[implementSymbol] = implement
  return result
}

export const createEffects = fn => fn

export const useEva = ({
  actions = null,
  effects = null,
  subscribes = null,
  autoRun = true
} = {}) => {
  return computed(() => {
    const manager = createEva(actions, effects, subscribes)
    if (autoRun) {
      manager.subscription()
    }
    return manager
  }).value
}
