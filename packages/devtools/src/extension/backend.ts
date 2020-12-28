//inject content script

const serializeObject = (obj: any) => {
  if (Array.isArray(obj)) {
    return obj.map(serializeObject)
  } else if (typeof obj === 'object') {
    if (!obj) return obj
    if ('$$typeof' in obj && '_owner' in obj) {
      return '#ReactNode'
    } else if (obj.toJS) {
      return obj.toJS()
    } else if (obj.toJSON) {
      return obj.toJSON()
    } else {
      const result = {}
      for (let key in obj) {
        result[key] = serializeObject(obj[key])
      }
      return result
    }
  }
  return obj
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
  window.postMessage(
    {
      source: '@formily-devtools-inject-script',
      type,
      id,
      graph: form && JSON.stringify(serializeObject(form?.getFormGraph())),
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
