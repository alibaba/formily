import backend from 'raw-loader!./backend'
function nullthrows(x: any, message?: string) {
  if (x != null) {
    return x
  }
  const error: any = new Error(
    message !== undefined ? message : 'Got unexpected ' + x
  )
  error.framesToPop = 1 // Skip nullthrows's own stack frame.
  throw error
}

function injectCode(code) {
  const script = document.createElement('script')
  script.textContent = code

  // This script runs before the <head> element is created,
  // so we add the script to <html> instead.
  nullthrows(document.documentElement).appendChild(script)
  nullthrows(script.parentNode).removeChild(script)
}

injectCode(`;(function(){
  var exports = {};
  ${backend}
})()`)
