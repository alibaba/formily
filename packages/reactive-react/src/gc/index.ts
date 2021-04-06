import { globalThisPolyfill } from '@formily/shared'
import './global'

const registry =
  globalThisPolyfill['FinalizationRegistry'] &&
  new globalThisPolyfill['FinalizationRegistry']((token: any) =>
    token?.clean?.()
  )

type Token = { clean: () => void }
export class GarbageCollector<T = any> {
  private expireTime: number
  private request: NodeJS.Timeout
  private token: Token
  constructor(clean?: () => void, expireTime = 10_000) {
    this.token = {
      clean,
    }
    this.expireTime = expireTime
  }

  open(target: T) {
    if (registry) {
      registry.register(target, this.token, this.token)
    } else {
      this.request = setTimeout(() => {
        this.token?.clean?.()
      }, this.expireTime)
    }
  }

  close() {
    if (registry) {
      registry.unregister(this.token)
    } else {
      clearTimeout(this.request)
    }
  }
}
