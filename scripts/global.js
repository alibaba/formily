global.sleep = time => {
  return new Promise(resolve => setTimeout(resolve, time))
}

global.requestAnimationFrame = fn => setTimeout(fn)
