import prettyFormat from 'pretty-format'
// import 'jest-styled-components'

global['prettyFormat'] = prettyFormat

global['sleep'] = time => {
  return new Promise(resolve => setTimeout(resolve, time))
}

global['requestAnimationFrame'] = fn => setTimeout(fn)
