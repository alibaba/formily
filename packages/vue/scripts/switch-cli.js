const { switchVersion } = require('./utils.js')
const {
  switchVersion: switchVueDemiVersion,
} = require('vue-demi/scripts/utils.js')

const version = process.argv[2]
const vueEntry = process.argv[3] || 'vue'

if (version == '2') {
  switchVersion(2)
  console.log(`[formily-vue] Switched types for Vue 2`)
  switchVueDemiVersion(2, vueEntry)
  console.log(`[vue-demi] Switched for Vue 2 (entry: "${vueEntry}")`)
} else if (version == '3') {
  switchVersion(3)
  console.log(`[formily-vue] Switched types for Vue 3`)
  switchVueDemiVersion(3, vueEntry)
  console.log(`[vue-demi] Switched for Vue 3 (entry: "${vueEntry}")`)
} else {
  console.warn(
    `[formily-vue] expecting version "2" or "3" but got "${version}"`
  )
  process.exit(1)
}
