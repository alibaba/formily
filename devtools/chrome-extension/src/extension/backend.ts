//inject content script

const serializeObject = (obj: any) => {
  const seens = new WeakMap()
  const serialize = (obj: any) => {
    if (Array.isArray(obj)) {
      return obj.map(serialize)
    } else if (typeof obj === 'function') {
      return `f ${obj.displayName || obj.name}(){ }`
    } else if (typeof obj === 'object') {
      if (seens.get(obj)) return '#CircularReference'
      if (!obj) return obj
      if ('$$typeof' in obj && '_owner' in obj) {
        seens.set(obj, true)
        return '#ReactNode'
      } else if (obj.toJS) {
        seens.set(obj, true)
        return obj.toJS()
      } else if (obj.toJSON) {
        seens.set(obj, true)
        return obj.toJSON()
      } else {
        seens.set(obj, true)
        const result = {}
        for (let key in obj) {
          result[key] = serialize(obj[key])
        }
        seens.set(obj, false)
        return result
      }
    }
    return obj
  }
  return serialize(obj)
}

const send = ({
  type,
  id,
  form,
}: {
  type: string
  id?: string | number
  form?: any
}) => {
  const graph = serializeObject(form?.getFormGraph())
  window.postMessage(
    {
      source: '@formily-devtools-inject-script',
      type,
      id,
      graph:
        form &&
        JSON.stringify(graph, (key, value) => {
          if (typeof value === 'symbol') {
            return value.toString()
          }
          return value
        }),
    },
    '*'
  )
}

send({
  type: 'init',
})

interface IIdleDeadline {
  didTimeout: boolean
  timeRemaining: () => DOMHighResTimeStamp
}

const HOOK = {
  hasFormilyInstance: false,
  hasOpenDevtools: false,
  store: {},
  openDevtools() {
    this.hasOpenDevtools = true
  },
  closeDevtools() {
    this.hasOpenDevtools = false
  },
  setVm(fieldId: string, formId: string) {
    if (fieldId) {
      globalThis.$vm = this.store[formId].fields[fieldId]
    } else {
      globalThis.$vm = this.store[formId]
    }
  },
  inject(id: number, form: any) {
    this.hasFormilyInstance = true
    this.store[id] = form
    send({
      type: 'install',
      id,
      form,
    })
    let timer = null
    const task = () => {
      globalThis.requestIdleCallback((deadline: IIdleDeadline) => {
        if (this.store[id]) {
          if (deadline.timeRemaining() < 16) {
            task()
          } else {
            send({
              type: 'update',
              id,
              form,
            })
          }
        }
      })
    }
    form.subscribe(() => {
      if (!this.hasOpenDevtools) return
      clearTimeout(timer)
      timer = setTimeout(task, 300)
    })
  },
  update() {
    const keys = Object.keys(this.store || {})
    keys.forEach((id) => {
      send({
        type: 'update',
        id,
        form: this.store[id],
      })
    })
  },
  unmount(id: number) {
    delete this.store[id]
    send({
      type: 'uninstall',
      id,
    })
  },
}

globalThis.__FORMILY_DEV_TOOLS_HOOK__ = HOOK
globalThis.__UFORM_DEV_TOOLS_HOOK__ = HOOK
