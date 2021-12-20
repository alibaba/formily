/* eslint-disable */
import {
  unstable_scheduleCallback,
  unstable_LowPriority,
  unstable_IdlePriority,
  unstable_NormalPriority
} from 'scheduler'

export const scheduler = {
  applyWithIdlePriority(callback:()=>void){
    unstable_scheduleCallback(unstable_IdlePriority,callback)
  },
  applyWithLowPriority(callback: () => void) {
    unstable_scheduleCallback(unstable_LowPriority, callback)
  },
  applyWidthNormalPriority(callback: () => void) {
    unstable_scheduleCallback(unstable_NormalPriority, callback)
  }
}
