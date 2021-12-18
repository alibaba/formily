const { switchVersion, loadModule } = require('./utils.js')

const Vue = loadModule('vue')

try {
  if (Vue.version.startsWith('2.')) {
    switchVersion(2)
  } else if (Vue.version.startsWith('3.')) {
    switchVersion(3)
  }
} catch (err) {
  // nothing to do
}
