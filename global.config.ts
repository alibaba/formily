import prettyFormat from 'pretty-format'

global['prettyFormat'] = prettyFormat

global['sleep'] = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time))
}

global['requestAnimationFrame'] = (fn) => setTimeout(fn)

global.document.documentElement.style['grid-column-gap'] = true

// 把 console.error 转换成 error，方便断言
;(() => {
  const spy = jest.spyOn(console, 'error')
  beforeAll(() => {
    spy.mockImplementation((message) => {
      console.log(message)
      throw new Error(message)
    })
  })

  afterAll(() => {
    spy.mockRestore()
  })
})()
