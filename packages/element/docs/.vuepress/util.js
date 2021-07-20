const fs = require('fs')

module.exports = {
  getFiles(dir) {
    return fs.readdirSync(dir)
  },
}
