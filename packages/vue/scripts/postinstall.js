const { switchVersion, loadModule } = require('./utils.js')

const Vue = loadModule('vue')

if (Vue.version.startsWith('2.')) {
  switchVersion(2)
} else if (Vue.version.startsWith('3.')) {
  switchVersion(3)
}
