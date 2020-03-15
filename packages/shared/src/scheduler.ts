/* eslint-disable */
import { unstable_scheduleCallback, unstable_LowPriority } from 'scheduler'

export const scheduler = {
  applyWithLowPriority(callback: () => void) {
    unstable_scheduleCallback(unstable_LowPriority, callback)
  }
}
