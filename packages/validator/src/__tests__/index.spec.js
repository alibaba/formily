import { runValidation } from '../'

const testResponse = (response, tester) => {
  response.forEach(item => {
    expect(tester[item.name] === item.valid).toBeTruthy()
  })
}

test('sample validation', () => {
  const values = {
    a: 123.333,
    b: '123123',
    c: '123aa',
    d: [null, null, null]
  }

  const fieldMap = {
    a: {
      rules: 'integer'
    },
    b: {
      rules: 'url'
    },
    c: {
      rules(value) {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve()
          }, 2000)
        })
      }
    },
    d: {
      rules: { required: true }
    }
  }

  return runValidation(values, fieldMap).then(response => {
    testResponse(response, {
      a: false,
      b: false,
      c: true,
      d: false
    })
  })
})
