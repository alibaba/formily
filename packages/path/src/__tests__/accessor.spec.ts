import { Path } from '../'

const { getIn, setIn } = Path

test('test getIn null parent', () => {
  const value = { aa: null }
  expect(getIn(value, 'aa')).toEqual(null)
  expect(getIn(value, 'aa.bb.cc')).toEqual(undefined)
})

test('test getIn and setIn', () => {
  const value = { a: { b: { c: 2, d: 333 } } }
  expect(getIn(value, 'a.b.c')).toEqual(2)
  setIn(value, 'a.b.c', 1111)
  expect(getIn(value, 'a.b.c')).toEqual(1111)
})

test('test getIn with destructor', () => {
  const value = { array: [{ aa: 123, bb: 321 }] }
  expect(getIn(value, 'array.0.[aa,bb]')).toEqual([123, 321])
})

test('test setIn auto create array', () => {
  const value = { array: null }
  setIn(value, 'array[0].bb[2]', 'hello world')
  expect(value).toEqual({
    array: [
      {
        bb: [undefined, undefined, 'hello world'],
      },
    ],
  })
  expect(getIn(undefined, 'aa.bb.cc')).toEqual(undefined)
  setIn(undefined, 'aa.bb.cc', 123)
})

test('map', () => {
  const value = { map: new Map() }
  setIn(value, 'map.aa.bb.cc', 123)
  expect(getIn(value, 'map.aa.bb.cc')).toEqual(123)
})

test('test setIn array properties', () => {
  const value = { array: [] }
  setIn(value, 'array.xxx', 'hello world')
  expect(value).toEqual({ array: [] })
})

test('test setIn dose not affect other items', () => {
  const value = {
    aa: [
      {
        dd: [
          {
            ee: '是',
          },
        ],
        cc: '1111',
      },
    ],
  }

  setIn(value, 'aa.1.dd.0.ee', '否')
  expect(value.aa[0]).toEqual({
    dd: [
      {
        ee: '是',
      },
    ],
    cc: '1111',
  })
})

test('destruct getIn', () => {
  // getIn 通过解构表达式从扁平数据转为复合嵌套数据
  const value = { a: { b: { c: 2, d: 333 } } }
  expect(getIn({ a: { b: { kk: 2, mm: 333 } } }, 'a.b.{c:kk,d:mm}')).toEqual({
    c: 2,
    d: 333,
  })

  expect(
    getIn(
      { kk: 2, mm: 333 },
      `{
        a : {
          b : {
            c : kk,
            d : mm
          }
        }
      }`
    )
  ).toEqual(value)
  expect(getIn({ bb: undefined, dd: undefined }, `[{aa:bb,cc:dd}]`)).toEqual([])
  expect(
    getIn(
      { kk: undefined, mm: undefined },
      `{
        a : {
          b : {
            c : kk,
            d : mm
          }
        }
      }`
    )
  ).toEqual({})
})

test('destruct setIn', () => {
  const value = { a: { b: { c: 2, d: 333 } } }
  // setIn 从复杂嵌套结构中解构数据出来对其做赋值处理
  expect(
    setIn(
      {},
      `{
        a : {
          b : {
            c,
            d
          }
        }
      }`,
      value
    )
  ).toEqual({ c: 2, d: 333 })

  expect(
    setIn(
      {},
      `
      [aa,bb]
      `,
      [123, 444]
    )
  ).toEqual({ aa: 123, bb: 444 })
  expect(setIn({}, 'aa.bb.ddd.[aa,bb]', [123, 444])).toEqual({
    aa: { bb: { ddd: { aa: 123, bb: 444 } } },
  })

  expect(setIn({}, 'aa.bb.ddd.[{cc:aa,bb}]', [{ cc: 123, bb: 444 }])).toEqual({
    aa: { bb: { ddd: { aa: 123, bb: 444 } } },
  })
})

test('setIn with a.b.c.{aaa,bbb}', () => {
  expect(Path.setIn({}, 'a.b.c.{aaa,bbb}', { aaa: 123, bbb: 321 })).toEqual({
    a: { b: { c: { aaa: 123, bbb: 321 } } },
  })
})

test('getIn with a.b.c.{aaa,bbb}', () => {
  expect(
    Path.getIn({ a: { b: { c: { aaa: 123, bbb: 321 } } } }, 'a.b.c.{aaa,bbb}')
  ).toEqual({ aaa: 123, bbb: 321 })
})

test('setIn with a.b.c.{aaa,bbb} source has extra property', () => {
  expect(
    Path.setIn({ a: { b: { c: { kkk: 'ddd' } } } }, 'a.b.c.{aaa,bbb}', {
      aaa: 123,
      bbb: 321,
    })
  ).toEqual({ a: { b: { c: { aaa: 123, bbb: 321, kkk: 'ddd' } } } })
})

test('getIn with a.b.c.{aaa,bbb} source has extra property', () => {
  expect(
    Path.getIn(
      { a: { b: { c: { aaa: 123, bbb: 321, kkk: 'ddd' } } } },
      'a.b.c.{aaa,bbb}'
    )
  ).toEqual({ aaa: 123, bbb: 321 })
})

test('setIn with a.b.c.{aaa:ooo,bbb}', () => {
  expect(
    Path.setIn({ a: { b: { c: { kkk: 'ddd' } } } }, 'a.b.c.{aaa:ooo,bbb}', {
      aaa: 123,
      bbb: 321,
    })
  ).toEqual({ a: { b: { c: { ooo: 123, bbb: 321, kkk: 'ddd' } } } })
})

test('getIn with a.b.c.{aaa:ooo,bbb}', () => {
  expect(
    Path.getIn(
      { a: { b: { c: { ooo: 123, bbb: 321, kkk: 'ddd' } } } },
      'a.b.c.{aaa:ooo,bbb}'
    )
  ).toEqual({ aaa: 123, bbb: 321 })
})

test('setIn with a.b.c.[aaa,bbb]', () => {
  expect(Path.setIn({}, 'a.b.c.[aaa,bbb]', [123, 321])).toEqual({
    a: { b: { c: { aaa: 123, bbb: 321 } } },
  })
})

test('getIn with a.b.c.[aaa,bbb]', () => {
  expect(
    Path.getIn({ a: { b: { c: { aaa: 123, bbb: 321 } } } }, 'a.b.c.[aaa,bbb]')
  ).toEqual([123, 321])
})

test('setIn with a.b.c.[aaa,bbb] source has extra property', () => {
  expect(
    Path.setIn(
      { a: { b: { c: { kkk: 'ddd' } } } },
      'a.b.c.[aaa,bbb]',
      [123, 321]
    )
  ).toEqual({ a: { b: { c: { aaa: 123, bbb: 321, kkk: 'ddd' } } } })
})

test('getIn with a.b.c.[aaa,bbb] source has extra property', () => {
  expect(
    Path.getIn(
      { a: { b: { c: { aaa: 123, bbb: 321, kkk: 'ddd' } } } },
      'a.b.c.[aaa,bbb]'
    )
  ).toEqual([123, 321])
})

test('setIn with a.b.c.[{ddd,kkk:mmm},bbb]', () => {
  expect(
    Path.setIn({}, 'a.b.c.[{ddd,kkk:mmm},bbb]', [{ ddd: 123, kkk: 'hhh' }, 321])
  ).toEqual({ a: { b: { c: { ddd: 123, bbb: 321, mmm: 'hhh' } } } })
})

test('getIn with a.b.c.[{ddd,kkk:mmm},bbb]', () => {
  expect(
    Path.getIn(
      { a: { b: { c: { ddd: 123, bbb: 321, mmm: 'hhh' } } } },
      'a.b.c.[{ddd,kkk:mmm},bbb]'
    )
  ).toEqual([{ ddd: 123, kkk: 'hhh' }, 321])
})

test('setIn with a.b.c.{aaa:ooo,bbb:[ccc,ddd]}', () => {
  expect(
    Path.setIn(
      { a: { b: { c: { kkk: 'ddd' } } } },
      'a.b.c.{aaa:ooo,bbb:[ccc,ddd]}',
      { aaa: 123, bbb: [123, 321] }
    )
  ).toEqual({ a: { b: { c: { ooo: 123, ccc: 123, ddd: 321, kkk: 'ddd' } } } })
})

test('getIn with a.b.c.{aaa:ooo,bbb:[ccc,ddd]}', () => {
  expect(
    Path.getIn(
      { a: { b: { c: { ooo: 123, ccc: 123, ddd: 321, kkk: 'ddd' } } } },
      'a.b.c.{aaa:ooo,bbb:[ccc,ddd]}'
    )
  ).toEqual({ aaa: 123, bbb: [123, 321] })
})

test('existIn with a.b.c', () => {
  expect(Path.existIn({ a: { b: { c: 123123 } } }, 'a.b.c')).toEqual(true)
  expect(Path.existIn({ a: { b: { c: 123123 } } }, 'a.b.c.d')).toEqual(false)
  expect(Path.existIn({ a: 123 }, 'a.b.c.d')).toEqual(false)
  expect(
    Path.existIn(
      { a: { b: { c: { ooo: 123, ccc: 123, ddd: 321, kkk: 'ddd' } } } },
      'a.b.c.{aaa:ooo,bbb:[ccc,ddd]}'
    )
  ).toEqual(true)
  expect(
    Path.existIn(
      { a: { b: { c: { ooo: 123, ccc: 123, kkk: 'ddd' } } } },
      'a.b.c.{aaa:ooo,bbb:[ccc,ddd]}'
    )
  ).toEqual(false)
  expect(Path.existIn({ a: [{}] }, 'a.0')).toEqual(true)
})

test('existIn with start Path', () => {
  expect(Path.existIn({ a: [{}] }, 'a.0', Path.parse('a'))).toEqual(false)
  expect(Path.existIn({ a: [{}] }, 'b.a.0', Path.parse('b'))).toEqual(true)
})

test('deleteIn', () => {
  expect(
    Path.deleteIn({ a: { b: { c: { ooo: 123, ccc: 234 } } } }, 'a.b.c.ccc')
  ).toEqual({ a: { b: { c: { ooo: 123 } } } })

  expect(
    Path.deleteIn({ a: { b: { c: { ooo: 123, ccc: 234 } } } }, null)
  ).toEqual({ a: { b: { c: { ooo: 123, ccc: 234 } } } })

  expect(
    Path.deleteIn({ a: { b: { c: { ooo: 123, ccc: 234 } } } }, [])
  ).toEqual({ a: { b: { c: { ooo: 123, ccc: 234 } } } })

  expect(Path.deleteIn({ a: { b: { c: 'c' } } }, 'a.b.c.ccc')).toEqual({
    a: { b: { c: 'c' } },
  })

  expect(Path.deleteIn({ a: 1, b: 2 }, '{ a }')).toEqual({ b: 2 })
  expect(Path.deleteIn([1, 2], '[0]')).toEqual([undefined, 2])
})

test('ensureIn', () => {
  expect(Path.parse('a.b').ensureIn({}, 'default')).toEqual('default')
  expect(Path.parse('a.b').ensureIn({ a: { b: 'value' } }, 'default')).toEqual(
    'value'
  )
  expect(Path.ensureIn({}, 'a.b.c', 'default')).toEqual('default')
})

test('complex destructing', () => {
  expect(
    Path.setIn(
      {},
      '{aa:{bb:{cc:destructor1,dd:[destructor2,destructor3],ee}}}',
      {
        aa: {
          bb: {
            cc: 123,
            dd: [333, 444],
            ee: 'abcde',
          },
        },
      }
    )
  ).toEqual({
    destructor1: 123,
    destructor2: 333,
    destructor3: 444,
    ee: 'abcde',
  })
  expect(
    Path.getIn(
      {
        destructor1: 123,
        destructor2: 333,
        destructor3: 444,
        ee: 'abcde',
      },
      '{aa:{bb:{cc:destructor1,dd:[destructor2,destructor3],ee}}}'
    )
  ).toEqual({
    aa: {
      bb: {
        cc: 123,
        dd: [333, 444],
        ee: 'abcde',
      },
    },
  })
})

test('test getIn with invalid value', () => {
  const value = {
    array: [null, undefined, { nil: null, undef: undefined }],
    nil: null,
    undef: undefined,
  }
  expect(getIn(value, 'array.0')).toBeNull()
  expect(getIn(value, 'array.1')).toBeUndefined()
  expect(getIn(value, 'array.2.nil')).toBeNull()
  expect(getIn(value, 'array.2.undef')).toBeUndefined()
  expect(getIn(value, 'nil')).toBeNull()
  expect(getIn(value, 'undef')).toBeUndefined()
})

test('test setIn with invalid value', () => {
  const value = {
    a: 1,
    b: 2,
    array: [null, undefined, { nil: null, undef: undefined }],
    nil: null,
    undef: undefined,
  }
  setIn(value, 'a', null)
  setIn(value, 'b', undefined)
  // undefined 与 null 互转
  setIn(value, 'array.0', undefined)
  setIn(value, 'array.1', null)
  setIn(value, 'array.2.nil', undefined)
  setIn(value, 'array.2.undef', null)
  setIn(value, 'nil', undefined)
  setIn(value, 'undef', null)

  expect(getIn(value, 'a')).toBeNull()
  expect(getIn(value, 'b')).toBeUndefined()
  expect(getIn(value, 'array.0')).toBeUndefined()
  expect(getIn(value, 'array.1')).toBeNull()
  expect(getIn(value, 'array.2.nil')).toBeUndefined()
  expect(getIn(value, 'array.2.undef')).toBeNull()
  expect(getIn(value, 'nil')).toBeUndefined()
  expect(getIn(value, 'undef')).toBeNull()
})

test('path arguments', () => {
  const path = new Path('a.b.c')
  expect(new Path(path).segments).toEqual(['a', 'b', 'c'])

  const matchPath = Path.match('a.b.c')
  expect(new Path(matchPath).segments).toEqual(['a', 'b', 'c'])

  expect(new Path(undefined).segments).toEqual([])
})

test('path methods', () => {
  const path = Path.parse('a.b.c')

  expect(path.concat(Path.parse('d.e')).segments).toEqual([
    'a',
    'b',
    'c',
    'd',
    'e',
  ])

  expect(Path.parse(['a', 'b', 'c']).toString()).toEqual('a.b.c')
  expect(Path.parse(['a', 'b', 'c']).length).toEqual(3)

  const matchPath = Path.parse('*')
  const regexPath = Path.parse(/.+/)
  expect(() => matchPath.concat('a')).toThrowError()
  expect(() => regexPath.concat('a')).toThrowError()
  expect(() => matchPath.slice()).toThrowError()
  expect(() => regexPath.slice()).toThrowError()
  expect(() => matchPath.pop()).toThrowError()
  expect(() => regexPath.pop()).toThrowError()
  expect(() => matchPath.splice(0, 1)).toThrowError()
  expect(() => regexPath.splice(0, 1)).toThrowError()
  expect(() => matchPath.forEach(() => {})).toThrowError()
  expect(() => regexPath.forEach(() => {})).toThrowError()
  expect(() => matchPath.map(() => {})).toThrowError()
  expect(() => regexPath.map(() => {})).toThrowError()
  expect(() => matchPath.reduce((p) => p, '')).toThrowError()
  expect(() => regexPath.reduce((p) => p, '')).toThrowError()

  expect(path.slice().segments).toEqual(['a', 'b', 'c'])
  expect(path.push('d').segments).toEqual(['a', 'b', 'c', 'd'])
  expect(path.pop().segments).toEqual(['a', 'b'])
  expect(path.splice(0, 1).segments).toEqual(['b', 'c'])

  let key = ''
  path.forEach((p) => (key += p + '_'))
  expect(key).toEqual('a_b_c_')
  expect(path.map((p) => p)).toEqual(['a', 'b', 'c'])
  expect(path.reduce((str, p) => str + p, '')).toEqual('abc')
  expect(path.parent().segments).toEqual(['a', 'b'])

  expect(() => Path.parse('*').includes('*')).toThrowError()
  expect(() => Path.parse('*').includes('*')).toThrowError()
  expect(() => Path.parse('a.b').includes('*')).toThrowError()
  expect(Path.parse('*').includes('a.b')).toBeTruthy()
  expect(Path.parse('a.b').includes('a.b')).toBeTruthy()
  expect(Path.parse('a.b').includes('a.c')).toBeFalsy()
  expect(Path.parse('a.b').includes('a.b.c')).toBeFalsy()

  expect(Path.parse('a.b.c').transform(/[a-z]/, (...result) => result)).toEqual(
    ['a', 'b', 'c']
  )
  expect(Path.parse('a.b.c').transform(/[a-b]/, (...result) => result)).toEqual(
    ['a', 'b']
  )
  expect(Path.parse('a.b.c').transform('', null)).toEqual('')
  expect(() => Path.parse('*').transform('', () => {})).toThrowError()
  expect(Path.transform('a.b.c', /[a-z]/, (...result) => result)).toEqual([
    'a',
    'b',
    'c',
  ])

  expect(Path.parse('a.b.c').match('*')).toBeTruthy()
  expect(() => Path.parse('*').match('*')).toThrowError()
  expect(Path.match('*')('a.b.c')).toBeTruthy()
  expect(Path.match('a.b')('a.b.c')).toBeFalsy()

  const matcher = Path.match('a.b.c')
  expect(Path.parse(matcher).segments).toEqual(['a', 'b', 'c'])
})
