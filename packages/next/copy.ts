import { copy } from 'fs-extra'
import glob from 'glob'

glob(`./src/**/*.{less,scss}`, (err, files) => {
  if (err) {
    throw err
  }
  files.forEach((filename) => {
    copy(filename, filename.replace(/src\//, 'esm/'))
    copy(filename, filename.replace(/src\//, 'lib/'))
  })
})
