const fs = require('fs-extra')
const path = require('path')
const json5 = require('json5')
const cwd = process.cwd()

module.exports = api => {
  if (api) api.cache(true)
  return json5.parse(fs.readFileSync(path.resolve(cwd, '.babelrc'), 'utf8'))
}
