import prettyFormat from 'pretty-format'
import '@testing-library/jest-dom/extend-expect'

global['prettyFormat'] = prettyFormat

global['sleep'] = time => {
  return new Promise(resolve => setTimeout(resolve, time))
}

global['requestAnimationFrame'] = fn => setTimeout(fn)
