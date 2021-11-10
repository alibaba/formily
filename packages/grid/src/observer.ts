const isHTMLElement = (node: Node): node is HTMLElement => node.nodeType === 1

type ChildNode = {
  element?: HTMLElement
  observer?: MutationObserver
  dispose?: () => void
}

export class ChildListMutationObserver {
  observer: MutationObserver
  callback: MutationCallback
  childList: ChildNode[] = []
  init: MutationObserverInit
  constructor(callback: MutationCallback) {
    this.callback = callback
    this.observer = new MutationObserver(this.handler)
  }

  observeChildList(element: HTMLElement) {
    Array.from(element.children).forEach((node: HTMLElement) => {
      this.addObserver(node)
    })
  }

  addObserver(element: HTMLElement) {
    const child = this.childList.find((t) => t.element === element)
    if (!child) {
      const childIndex = this.childList.length
      const child = {
        element,
        observer: new MutationObserver(this.callback),
        dispose: () => {
          if (child.observer) {
            child.observer.disconnect()
            delete child.observer
            this.childList.splice(childIndex, 1)
          }
        },
      }
      child.observer.observe(child.element, {
        ...this.init,
        subtree: false,
        childList: false,
        characterData: false,
        characterDataOldValue: false,
        attributeOldValue: false,
      })
      this.childList.push(child)
    }
  }

  removeObserver(element: HTMLElement) {
    const child = this.childList.find((t) => t.element === element)
    if (child) {
      child.dispose?.()
    }
  }

  handler = (mutations: MutationRecord[]) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (isHTMLElement(node)) {
            this.addObserver(node)
          }
        })
        mutation.removedNodes.forEach((node) => {
          if (isHTMLElement(node)) {
            this.removeObserver(node)
          }
        })
      }
    })
    this.callback(mutations, this.observer)
  }

  observe = (element: HTMLElement, init?: MutationObserverInit) => {
    this.init = init
    this.observeChildList(element)
    this.observer.observe(element, {
      ...this.init,
      subtree: false,
      childList: true,
      characterData: false,
      characterDataOldValue: false,
      attributeOldValue: false,
    })
  }

  disconnect = () => {
    this.observer.disconnect()
  }
}
