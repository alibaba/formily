import prettyFormat from 'pretty-format'

global['prettyFormat'] = prettyFormat

global['sleep'] = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time))
}

global['requestAnimationFrame'] = (fn: () => void) => setTimeout(fn, 0)

global['document'].documentElement.style['grid-column-gap'] = true
