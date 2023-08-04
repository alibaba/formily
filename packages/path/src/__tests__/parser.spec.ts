import expect from 'expect'
import { Parser } from '../parser'
import { Path } from '../'
const parse = (string: string, json: any, index: number) => {
  test('test ' + string + ` : ${index}`, () => {
    const parser = new Parser(string)
    expect(parser.parse()).toEqual(json)
  })
}

const batchTest = (obj) => {
  let i = 0
  for (let key in obj) {
    i++
    parse(key, obj[key], i)
  }
}

test('relative', () => {
  const parser = new Parser('..[ + 1 ].dd.bb', new Path(['aa', '1', 'cc']))
  const parser2 = new Parser('.ee', new Path(['aa', '1', 'cc']))
  const parser3 = new Parser('.', new Path(['aa', '1', 'cc']))
  const parser4 = new Parser('..', new Path(['aa', '1', 'cc']))
  const parser5 = new Parser('.[].dd', new Path(['aa', '1']))
  const parser6 = new Parser('.[].[]', new Path(['aa', '1']))
  const parser7 = new Parser('.[].[aa]', new Path(['aa', '1']))
  parser2.parse()
  parser3.parse()
  parser4.parse()
  parser5.parse()
  parser6.parse()
  parser7.parse()
  expect(parser.parse()).toEqual({
    type: 'Identifier',
    value: 'aa',
    after: {
      type: 'DotOperator',
      after: {
        type: 'DestructorExpression',
        value: {
          type: 'ArrayPattern',
          elements: [
            {
              type: 'Identifier',
              value: '+',
              after: {
                type: 'Identifier',
                value: '1',
              },
            },
          ],
        },
        source: '2',
        after: {
          type: 'DotOperator',
          after: {
            type: 'Identifier',
            value: 'dd',
            after: {
              type: 'DotOperator',
              after: {
                type: 'Identifier',
                value: 'bb',
              },
            },
          },
        },
      },
    },
  })
  expect(parser.data.segments).toEqual(['aa', '2', 'dd', 'bb'])
  expect(parser2.data.segments).toEqual(['aa', '1', 'ee'])
  expect(parser3.data.segments).toEqual(['aa', '1'])
  expect(parser4.data.segments).toEqual(['aa'])
  expect(parser5.data.segments).toEqual(['aa', '1', 'dd'])
  expect(parser6.data.segments).toEqual(['aa', '1', '[]'])
  expect(parser7.data.segments).toEqual(['aa', '1', '[aa]'])
})

test('calculate', () => {
  const parser0 = new Parser('..[+].dd.bb', new Path(['aa', '1', 'cc']))
  parser0.parse()
  expect(parser0.data.segments).toEqual(['aa', '2', 'dd', 'bb'])

  const parser = new Parser('..[ -1 ].dd.bb', new Path(['aa', '1', 'cc']))
  parser.parse()
  expect(parser.data.segments).toEqual(['aa', '0', 'dd', 'bb'])

  // TODO support
  // const parser2 = new Parser('..[ *2 ].dd.bb', new Path(['aa', '2', 'cc']))
  // parser2.parse()
  // expect(parser2.data.segments).toEqual(['aa', '4', 'dd', 'bb'])

  const parser3 = new Parser('..[ /2 ].dd.bb', new Path(['aa', '2', 'cc']))
  parser3.parse()
  expect(parser3.data.segments).toEqual(['aa', '1', 'dd', 'bb'])

  const parser4 = new Parser('..[ +1 ].dd.bb', new Path(['aa', 'a', 'cc']))
  parser4.parse()
  expect(parser4.data.segments).toEqual(['aa', 'a1', 'dd', 'bb'])

  const parser5 = new Parser('..[ -1 ].dd.bb', new Path(['aa', 'a', 'cc']))
  parser5.parse()
  expect(parser5.data.segments).toEqual(['aa', 'NaN', 'dd', 'bb'])

  // TODO support
  // const parser6 = new Parser('..[ *1 ].dd.bb', new Path(['aa', 'a', 'cc']))
  // parser6.parse()
  // expect(parser6.data.segments).toEqual(['aa', 'NaN', 'dd', 'bb'])

  const parser7 = new Parser('..[ /1 ].dd.bb', new Path(['aa', 'a', 'cc']))
  parser7.parse()
  expect(parser7.data.segments).toEqual(['aa', 'NaN', 'dd', 'bb'])

  const parser8 = new Parser('..[1].dd.bb', new Path(['aa', '1', 'cc']))
  parser8.parse()
  expect(parser8.data.segments).toEqual(['aa', '2', 'dd', 'bb'])
  const parser9 = new Parser('')
  parser9.next()
  expect(parser9.parseObjectProperties()).toEqual([])
})

test('parser unexpected', () => {
  const parser = new Parser('array[]')
  expect(() => parser.parse()).toThrowError()

  const parser2 = new Parser('array[0.')
  expect(() => parser2.parse()).toThrowError()

  const parser3 = new Parser('.[+]', new Path('*.1.cc'))
  expect(() => parser3.parse()).toThrowError()

  const parser4 = new Parser('[:,4]')
  expect(() => parser4.parse()).toThrowError()
})

test('tokenizer', () => {
  const originFromCharCode = String.fromCharCode
  String.fromCharCode = null

  const parser = new Parser('aa.bb')
  parser.parse()
  expect(parser.data.segments).toEqual(['aa', 'bb'])

  const parser2 = new Parser('array.0.[aa,bb]')
  parser2.parse()
  expect(parser2.data.segments).toEqual(['array', '0', '[aa,bb]'])

  String.fromCharCode = originFromCharCode

  const char13 = String.fromCharCode(13)
  const parser3 = new Parser(`${char13} aa.bb`)
  parser3.parse()

  const char11 = String.fromCharCode(11)
  const parser4 = new Parser(`${char11} aa.bb`)
  parser4.parse()

  const parser5 = new Parser('')
  parser5.next()
  parser5.parse()
  expect(parser5.data.segments).toEqual([])

  const char10 = String.fromCharCode(10)
  const parser6 = new Parser(`{
                c${char13}${char10}: kk,
                d : mm
          }`)
  parser6.parse()
  expect(parser6.data.segments).toEqual(['{c:kk,d:mm}'])

  const parser7 = new Parser(`{
                c${char13}${char11}: kk,
                d : mm
          }`)
  parser7.parse()
  expect(parser7.data.segments).toEqual(['{c:kk,d:mm}'])

  const parser8 = new Parser(`\\name`)
  parser8.state.pos++
  parser8.parse()
  expect(parser8.data.segments).toEqual(['name'])

  const parser9 = new Parser(`[a,{b}]`)
  parser9.parse()
  expect(parser9.data.segments).toEqual(['[a,{b}]'])

  const parser10 = new Parser(`*(a.b.c.*(aa,bb))`)
  parser10.parse()
  expect(parser10.data.segments).toEqual([])

  const parser11 = new Parser(`{a,[b,{c}]. }`)
  expect(() => parser11.parse()).toThrowError()

  const parser12 = new Parser(`*(a.*[1:3])`)
  parser12.parse()
  expect(parser12.data.segments).toEqual([])

  const parser13 = new Parser(`*(a.*[1:3]])`)
  expect(() => parser13.parse()).toThrowError()
})

batchTest({
  '*': {
    type: 'WildcardOperator',
  },
  'a.b.c': {
    type: 'Identifier',
    value: 'a',
    after: {
      type: 'DotOperator',
      after: {
        type: 'Identifier',
        value: 'b',
        after: {
          type: 'DotOperator',
          after: {
            type: 'Identifier',
            value: 'c',
          },
        },
      },
    },
  },
  'a.b.*': {
    type: 'Identifier',
    value: 'a',
    after: {
      type: 'DotOperator',
      after: {
        type: 'Identifier',
        value: 'b',
        after: {
          type: 'DotOperator',
          after: {
            type: 'WildcardOperator',
          },
        },
      },
    },
  },
  'a.b.*(111,222,aaa)': {
    type: 'Identifier',
    value: 'a',
    after: {
      type: 'DotOperator',
      after: {
        type: 'Identifier',
        value: 'b',
        after: {
          type: 'DotOperator',
          after: {
            type: 'WildcardOperator',
            filter: {
              type: 'GroupExpression',
              value: [
                {
                  type: 'Identifier',
                  value: '111',
                },
                {
                  type: 'Identifier',
                  value: '222',
                },
                {
                  type: 'Identifier',
                  value: 'aaa',
                },
              ],
            },
          },
        },
      },
    },
  },
  'a.b.*(!111,222,aaa)': {
    type: 'Identifier',
    value: 'a',
    after: {
      type: 'DotOperator',
      after: {
        type: 'Identifier',
        value: 'b',
        after: {
          type: 'DotOperator',
          after: {
            type: 'WildcardOperator',
            filter: {
              type: 'GroupExpression',
              isExclude: true,
              value: [
                {
                  type: 'Identifier',
                  value: '111',
                },
                {
                  type: 'Identifier',
                  value: '222',
                },
                {
                  type: 'Identifier',
                  value: 'aaa',
                },
              ],
            },
          },
        },
      },
    },
  },
  'a.b. * [  11 :  22  ]': {
    type: 'Identifier',
    value: 'a',
    after: {
      type: 'DotOperator',
      after: {
        type: 'Identifier',
        value: 'b',
        after: {
          type: 'DotOperator',
          after: {
            type: 'WildcardOperator',
            filter: {
              type: 'RangeExpression',
              start: {
                type: 'Identifier',
                value: '11',
              },
              end: {
                type: 'Identifier',
                value: '22',
              },
            },
          },
        },
      },
    },
  },
  'a.b.*([[123123!,()]],[[aaa]])': {
    type: 'Identifier',
    value: 'a',
    after: {
      type: 'DotOperator',
      after: {
        type: 'Identifier',
        value: 'b',
        after: {
          type: 'DotOperator',
          after: {
            type: 'WildcardOperator',
            filter: {
              type: 'GroupExpression',
              value: [
                {
                  type: 'IgnoreExpression',
                  value: '123123!,()',
                },
                {
                  type: 'IgnoreExpression',
                  value: 'aaa',
                },
              ],
            },
          },
        },
      },
    },
  },
  'a.b.*([[123123!,()]],aaa)': {
    type: 'Identifier',
    value: 'a',
    after: {
      type: 'DotOperator',
      after: {
        type: 'Identifier',
        value: 'b',
        after: {
          type: 'DotOperator',
          after: {
            type: 'WildcardOperator',
            filter: {
              type: 'GroupExpression',
              value: [
                {
                  type: 'IgnoreExpression',
                  value: '123123!,()',
                },
                {
                  type: 'Identifier',
                  value: 'aaa',
                },
              ],
            },
          },
        },
      },
    },
  },
  'a.b.*(![[123123!,()]],aaa)': {
    type: 'Identifier',
    value: 'a',
    after: {
      type: 'DotOperator',
      after: {
        type: 'Identifier',
        value: 'b',
        after: {
          type: 'DotOperator',
          after: {
            type: 'WildcardOperator',
            filter: {
              type: 'GroupExpression',
              value: [
                {
                  type: 'IgnoreExpression',
                  value: '123123!,()',
                },
                {
                  type: 'Identifier',
                  value: 'aaa',
                },
              ],
              isExclude: true,
            },
          },
        },
      },
    },
  },
  'a.b  . *   (![[123123!,()]],aaa,bbb)': {
    type: 'Identifier',
    value: 'a',
    after: {
      type: 'DotOperator',
      after: {
        type: 'Identifier',
        value: 'b',
        after: {
          type: 'DotOperator',
          after: {
            type: 'WildcardOperator',
            filter: {
              type: 'GroupExpression',
              value: [
                {
                  type: 'IgnoreExpression',
                  value: '123123!,()',
                },
                {
                  type: 'Identifier',
                  value: 'aaa',
                },
                {
                  type: 'Identifier',
                  value: 'bbb',
                },
              ],
              isExclude: true,
            },
          },
        },
      },
    },
  },
  'a.b.[[123123!,()]]   ': {
    type: 'Identifier',
    value: 'a',
    after: {
      type: 'DotOperator',
      after: {
        type: 'Identifier',
        value: 'b',
        after: {
          type: 'DotOperator',
          after: {
            type: 'IgnoreExpression',
            value: '123123!,()',
          },
        },
      },
    },
  },
  [`a .  
     b .  
       [[123123!,()]]
    
    .aaaa`]: {
    type: 'Identifier',
    value: 'a',
    after: {
      type: 'DotOperator',
      after: {
        type: 'Identifier',
        value: 'b',
        after: {
          type: 'DotOperator',
          after: {
            type: 'IgnoreExpression',
            value: '123123!,()',
            after: {
              type: 'DotOperator',
              after: {
                type: 'Identifier',
                value: 'aaaa',
              },
            },
          },
        },
      },
    },
  },
  'a.*(aaa.d.*(!sss),ddd,bbb).c.b': {
    type: 'Identifier',
    value: 'a',
    after: {
      type: 'DotOperator',
      after: {
        type: 'WildcardOperator',
        filter: {
          type: 'GroupExpression',
          value: [
            {
              type: 'Identifier',
              value: 'aaa',
              after: {
                type: 'DotOperator',
                after: {
                  type: 'Identifier',
                  value: 'd',
                  after: {
                    type: 'DotOperator',
                    after: {
                      type: 'WildcardOperator',
                      filter: {
                        type: 'GroupExpression',
                        isExclude: true,
                        value: [
                          {
                            type: 'Identifier',
                            value: 'sss',
                          },
                        ],
                      },
                    },
                  },
                },
              },
            },
            {
              type: 'Identifier',
              value: 'ddd',
            },
            {
              type: 'Identifier',
              value: 'bbb',
            },
          ],
        },
        after: {
          type: 'DotOperator',
          after: {
            type: 'Identifier',
            value: 'c',
            after: {
              type: 'DotOperator',
              after: {
                type: 'Identifier',
                value: 'b',
              },
            },
          },
        },
      },
    },
  },
  'aa.bb.cc.{aa,bb,cc:kk}': {
    type: 'Identifier',
    value: 'aa',
    after: {
      type: 'DotOperator',
      after: {
        type: 'Identifier',
        value: 'bb',
        after: {
          type: 'DotOperator',
          after: {
            type: 'Identifier',
            value: 'cc',
            after: {
              type: 'DotOperator',
              after: {
                type: 'DestructorExpression',
                value: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'ObjectPatternProperty',
                      key: { type: 'Identifier', value: 'aa' },
                    },
                    {
                      type: 'ObjectPatternProperty',
                      key: { type: 'Identifier', value: 'bb' },
                    },
                    {
                      type: 'ObjectPatternProperty',
                      key: { type: 'Identifier', value: 'cc' },
                      value: { type: 'Identifier', value: 'kk' },
                    },
                  ],
                },
                source: '{aa,bb,cc:kk}',
              },
            },
          },
        },
      },
    },
  },
  'aa.bb.cc.[ [aa,bb,cc,[ [{aa:bb}] ]] ]': {
    type: 'Identifier',
    value: 'aa',
    after: {
      type: 'DotOperator',
      after: {
        type: 'Identifier',
        value: 'bb',
        after: {
          type: 'DotOperator',
          after: {
            type: 'Identifier',
            value: 'cc',
            after: {
              type: 'DotOperator',
              after: {
                type: 'DestructorExpression',
                value: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'ArrayPattern',
                      elements: [
                        {
                          type: 'Identifier',
                          value: 'aa',
                        },
                        {
                          type: 'Identifier',
                          value: 'bb',
                        },
                        {
                          type: 'Identifier',
                          value: 'cc',
                        },
                        {
                          type: 'ArrayPattern',
                          elements: [
                            {
                              type: 'ArrayPattern',
                              elements: [
                                {
                                  type: 'ObjectPattern',
                                  properties: [
                                    {
                                      type: 'ObjectPatternProperty',
                                      key: {
                                        type: 'Identifier',
                                        value: 'aa',
                                      },
                                      value: {
                                        type: 'Identifier',
                                        value: 'bb',
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                source: '[[aa,bb,cc,[[{aa:bb}]]]]',
              },
            },
          },
        },
      },
    },
  },
})
