import { globalThisPolyfill } from '@formily/shared'
import './global'

const registry =
  globalThisPolyfill['FinalizationRegistry'] &&
  new globalThisPolyfill['FinalizationRegistry']((clean: () => void) => clean())

export class GarbageCollector {
  private target: object
  private cleaner: () => void
  private expireTime: number
  private request: NodeJS.Timeout
  constructor(target: object, cleaner?: () => void, expireTime = 10_000) {
    this.target = target
    this.cleaner = cleaner
    this.expireTime = expireTime
  }

  open() {
    if (registry) {
      registry.register(this.target, () => {
        this.cleaner?.()
      })
    }
    this.request = setTimeout(() => {
      this.cleaner?.()
    }, this.expireTime)
  }

  close() {
    if (registry) {
      registry.unregister(this.target)
    }
    clearTimeout(this.request)
  }
}
