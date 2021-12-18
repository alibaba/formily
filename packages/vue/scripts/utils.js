const { loadModule } = require('vue-demi/scripts/utils.js')
const fs = require('fs-extra')
const path = require('path')

const dir = path.resolve(__dirname, '..', 'type-artefacts')

function switchVersion(version) {
  fs.emptyDirSync(`${dir}/cur`)
  fs.copySync(`${dir}/v${version}`, `${dir}/cur`)
}

module.exports.loadModule = loadModule
module.exports.switchVersion = switchVersion
