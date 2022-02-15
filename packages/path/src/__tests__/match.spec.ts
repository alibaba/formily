import expect from 'expect'
import { Path } from '../'
import { Matcher } from '../matcher'

const match = (obj) => {
  for (let name in obj) {
    test('test match ' + name, () => {
      const path = new Path(name)
      if (Array.isArray(obj[name]) && Array.isArray(obj[name][0])) {
        obj[name].forEach((_path) => {
          expect(path.match(_path)).toBeTruthy()
        })
      } else {
        expect(path.match(obj[name])).toBeTruthy()
      }
    })
  }
}

const unmatch = (obj) => {
  for (let name in obj) {
    test('test unmatch ' + name, () => {
      const path = new Path(name)
      if (Array.isArray(obj[name]) && Array.isArray(obj[name][0])) {
        obj[name].forEach((_path) => {
          expect(path.match(_path)).toBeFalsy()
        })
      } else {
        expect(path.match(obj[name])).toBeFalsy()
      }
    })
  }
}

test('basic match', () => {
  expect(Path.parse('xxx').match('')).toBeFalsy()
  expect(Path.parse('xxx').match('aaa')).toBeFalsy()
  expect(Path.parse('xxx.eee').match('xxx')).toBeFalsy()
  expect(Path.parse('*(xxx.eee~)').match('xxx')).toBeFalsy()
  expect(Path.parse('xxx.eee~').match('xxx.eee')).toBeTruthy()
  expect(Path.parse('*(!xxx.eee,yyy)').match('xxx')).toBeFalsy()
  expect(Path.parse('*(!xxx.eee,yyy)').match('xxx.ooo.ppp')).toBeTruthy()
  expect(Path.parse('*(!xxx.eee,yyy)').match('xxx.eee')).toBeFalsy()
  expect(Path.parse('*(!xxx.eee~,yyy)').match('xxx.eee')).toBeFalsy()
  expect(Path.parse('~.aa').match('xxx.aa')).toBeTruthy()
})

test('not expect match not', () => {
  expect(new Matcher({}).match(['']).matched).toBeFalsy()
})

test('test matchGroup', () => {
  const pattern = new Path('*(aa,bb,cc)')
  expect(pattern.matchAliasGroup('aa', 'bb')).toEqual(true)
  const excludePattern = new Path('aa.bb.*(11,22,33).*(!aa,bb,cc)')
  expect(
    excludePattern.matchAliasGroup('aa.bb.11.mm', 'aa.cc.dd.bb.11.mm')
  ).toEqual(true)
  expect(excludePattern.matchAliasGroup('aa.cc', 'aa.kk.cc')).toEqual(false)
  expect(new Path('aa.*(!bb)').matchAliasGroup('kk.mm.aa.bb', 'aa.bb')).toEqual(
    false
  )
  expect(
    new Path('aa.*(!bb)').matchAliasGroup('kk.mm.aa.bb.cc', 'kk.mm.aa')
  ).toEqual(false)
  expect(new Path('aa.*(!bb,oo)').matchAliasGroup('kk.mm', 'aa')).toEqual(false)
  expect(new Path('aa.*(!bb.*)').matchAliasGroup('kk.mm', 'aa')).toEqual(false)
  expect(new Path('aa.*(!bb)').matchAliasGroup('kk.mm.aa.cc', 'aa.cc')).toEqual(
    true
  )
  const patttern2 = Path.parse('*(array)')
  expect(patttern2.matchAliasGroup(['array', 0], ['array', 0])).toEqual(false)
})

test('exclude match', () => {
  //路径长度相等
  expect(Path.parse('*(!aaa)').match('ggg')).toBeTruthy()
  expect(Path.parse('*(!aaa)').match('aaa')).toBeFalsy()
  expect(Path.parse('*(!aaa.bbb)').match('ggg.ddd')).toBeTruthy()
  expect(Path.parse('*(!aaa.ccc)').match('aaa.ccc')).toBeFalsy()
  //长路径匹配短路径
  expect(Path.parse('*(!aaa.bbb)').match('ggg')).toBeTruthy()
  expect(Path.parse('*(!aaa.bbb)').match('aaa')).toBeFalsy()
  //短路径匹配长路径
  expect(Path.parse('*(!aaa)').match('aaa.bbb')).toBeTruthy()
  expect(Path.parse('*(!aaa)').match('aaa.ccc')).toBeTruthy()
  expect(Path.parse('*(!aaa)').match('bbb.ccc')).toBeTruthy()

  expect(Path.parse('*(!aaa,bbb)').match('bbb')).toBeFalsy()
  expect(Path.parse('*(!aaa.bbb)').match('aaa.ccc')).toBeTruthy()
  expect(Path.parse('*(!basic.name,versionTag)').match('basic.id')).toBeTruthy()
  expect(Path.parse('*(!basic.name,versionTag)').match('basic')).toBeFalsy()
  expect(
    Path.parse('*(!basic.name,versionTag)').match('isExecutable')
  ).toBeTruthy()
  expect(
    Path.parse('*(!basic.name,versionTag)').match('versionTag')
  ).toBeFalsy()
  expect(
    Path.parse('*(!basic.name,basic.name.*,versionTag)').match('basic.name')
  ).toBeFalsy()
  expect(
    Path.parse('*(!basic.name,basic.name.*,versionTag)').match('basic.name.kkk')
  ).toBeFalsy()
  expect(Path.parse('aa.*(!bb)').match('kk.mm.aa.bb.cc')).toBeFalsy()
  expect(Path.parse('aa.*(!bb)').match('aa')).toBeFalsy()
  expect(Path.parse('aa.*(!bb.*)').match('aa')).toBeFalsy()
  expect(Path.parse('aa.*(!bb,cc)').match('aa')).toBeFalsy()
  expect(Path.parse('aa.*(!bb,cc)').match('aa.dd')).toBeTruthy()
  expect(Path.parse('aa.*(!bb,cc)').match('aa.kk')).toBeTruthy()
})

test('match regexp', () => {
  expect(Path.parse(/^\d+$/).match('212')).toBeTruthy()
  expect(Path.parse(/^\d+$/).match('212dd')).toBeFalsy()
})

test('test zero', () => {
  expect(Path.parse('t.0.value~').match(['t', 0, 'value_list'])).toEqual(true)
})

test('test optional wild match', () => {
  expect(Path.parse('aa.**').match(['aa'])).toEqual(true)
  expect(Path.parse('aa.**').match(['aa', 'bb', 'cc'])).toEqual(true)
  expect(Path.parse('aa.*').match(['aa'])).toEqual(false)
  expect(Path.parse('aa.\\*\\*\\.aa').match(['aa', '**.aa'])).toEqual(true)
  expect(Path.parse('aa.[[**.aa]]').match(['aa', '**.aa'])).toEqual(true)
  expect(() => Path.parse('aa.**.aa').match(['aa'])).toThrowError()
  expect(() => Path.parse('aa.**(bb)').match(['aa'])).toThrowError()
  expect(Path.parse('*(aa.**)').match(['aa'])).toEqual(true)
  expect(Path.parse('*(aa.**,bb.**)').match(['aa'])).toEqual(true)
  expect(Path.parse('*(aa.**,bb.**)').match(['aa', 'bb', 'cc'])).toEqual(true)
  expect(Path.parse('*(aa.**,bb.**)').match(['bb'])).toEqual(true)
  expect(Path.parse('*(aa.**,bb.**)').match(['bb', 'cc', 'dd'])).toEqual(true)
  expect(Path.parse('*(aa.**,bb.**)').match(['cc'])).toEqual(false)
  expect(Path.parse('*(aa.**,bb.**).bb').match(['aa', 'oo'])).toEqual(true)
  expect(Path.parse('*(aa.**,bb.**).bb').match(['bb', 'oo'])).toEqual(true)
  expect(Path.parse('*(aa.**,bb.**).bb').match(['aa', 'oo', 'bb'])).toEqual(
    true
  )
  expect(Path.parse('*(aa.**,bb.**).bb').match(['bb', 'oo', 'bb'])).toEqual(
    true
  )
  expect(
    Path.parse('*(aa.**,bb.**).bb').match(['aa', 'oo', 'kk', 'dd', 'bb'])
  ).toEqual(true)
  expect(
    Path.parse('*(aa.**,bb.**).bb').match(['cc', 'oo', 'kk', 'dd', 'bb'])
  ).toEqual(false)
  expect(
    Path.parse('*(aa.**,bb.**).bb').match(['bb', 'oo', 'kk', 'dd', 'bb'])
  ).toEqual(true)
  expect(
    Path.parse('*(aa.**,bb.**).bb').match(['kk', 'oo', 'kk', 'dd', 'bb'])
  ).toEqual(false)
})

test('test expand', () => {
  expect(
    Path.parse('t.0.value~').match(['t', 0, 'value_list', 'hello'])
  ).toEqual(false)
})

test('test multi expand', () => {
  expect(Path.parse('*(aa~,bb~).*').match(['aa12323', 'asdasd'])).toEqual(true)
})

test('test group', () => {
  const node = Path.parse('*(phases.*.type,phases.*.steps.*.type)')
  expect(node.match('phases.0.steps.1.type')).toBeTruthy()
})

test('test segments', () => {
  const node = Path.parse('a.0.b')
  expect(node.match(['a', 0, 'b'])).toEqual(true)
})

test('nested group match', () => {
  expect(
    Path.parse('aa.*.*(bb,cc).dd.*(kk,oo).ee').match('aa.0.cc.dd.kk.ee')
  ).toEqual(true)
})

test('group match with destructor', () => {
  expect(Path.parse('*([startDate,endDate],date,weak)').match('date')).toEqual(
    true
  )
  expect(Path.parse('*({startDate,endDate},date,weak)').match('date')).toEqual(
    true
  )
  expect(Path.parse('*([startDate,endDate],date,weak)').match('xxx')).toEqual(
    false
  )
  expect(Path.parse('*({startDate,endDate},date,weak)').match('xxx')).toEqual(
    false
  )
  expect(
    Path.parse('*([startDate,endDate],date,weak)').match('[startDate,endDate]')
  ).toEqual(true)
  expect(
    Path.parse('*({startDate,endDate},date,weak)').match('{startDate,endDate}')
  ).toEqual(true)
})

match({
  '*': [[], ['aa'], ['aa', 'bb', 'cc'], ['aa', 'dd', 'gg']],
  '*.a.b': [
    ['c', 'a', 'b'],
    ['k', 'a', 'b'],
    ['m', 'a', 'b'],
  ],
  'a.*.k': [
    ['a', 'b', 'k'],
    ['a', 'd', 'k'],
    ['a', 'c', 'k'],
  ],
  'a.*(b,d,m).k': [
    ['a', 'b', 'k'],
    ['a', 'd', 'k'],
    ['a', 'm', 'k'],
  ],
  'a.*(!b,d,m).*(!a,b)': [
    ['a', 'o', 'k'],
    ['a', 'q', 'k'],
    ['a', 'c', 'k'],
  ],
  'a.*(b.c.d,d,m).k': [
    ['a', 'b', 'c', 'd', 'k'],
    ['a', 'd', 'k'],
    ['a', 'm', 'k'],
  ],
  'a.*(b.*(c,k).d,d,m).k': [
    ['a', 'b', 'c', 'd', 'k'],
    ['a', 'b', 'k', 'd', 'k'],
    ['a', 'd', 'k'],
    ['a', 'm', 'k'],
  ],
  'a.b.*': [
    ['a', 'b', 'c', 'd'],
    ['a', 'b', 'c'],
    ['a', 'b', 2, 'aaa', 3, 'bbb'],
  ],
  '*(step1,step2).*': [
    ['step1', 'aa', 'bb'],
    ['step1', 'aa', 'bb', 'ccc', 'ddd'],
  ],
  'dyanmic.*(!dynamic-1)': [
    ['dyanmic', 'dynamic-2'],
    ['dyanmic', 'dynamic-3'],
  ],
  't.0.value~': [['t', '0', 'value']],
  'a.*[10:50].*(!a,b)': [
    ['a', 49, 's'],
    ['a', 10, 's'],
    ['a', 50, 's'],
  ],
  'a.*[10:].*(!a,b)': [
    ['a', 49, 's'],
    ['a', 10, 's'],
    ['a', 50, 's'],
  ],
  'a.*[].*(!a,b)': [
    ['a', 49, 's'],
    ['a', 10, 's'],
    ['a', 50, 's'],
  ],
  'a.*[:50].*(!a,b)': [
    ['a', 49, 's'],
    ['a', 10, 's'],
    ['a', 50, 's'],
  ],
  'a.*([[a.b.c]],[[c.b.d~]])': [
    ['a', '[[a.b.c]]'],
    ['a', 'c.b.d~'],
  ],
  'a.*(!k,d,m).k': [
    ['a', 'u', 'k'],
    ['a', 'o', 'k'],
    ['a', 'p', 'k'],
  ],
  'a\\.\\*\\[1\\]': [['a.*[1]']],
  '[[\\[aa,bb\\]]]': [['[aa,bb]']],
  '[[\\[aa,bb\\]   ]]': [['[aa,bb]   ']],
  '[[   \\[aa,bb~\\]   ]]': [['   [aa,bb~]   ']],
  'aa.bb.*': [['aa', 'bb', 'ccc']],
  'a.*': [
    ['a', 'b'],
    ['a', 'b', 'c'],
  ],
  'aa.*.*(bb,cc).dd': [['aa', '0', 'cc', 'dd']],
  'aaa.products.0.*': [['aaa', 'products', '0', 'aaa']],
  'aa~.ccc': [
    ['aa', 'ccc'],
    ['aa12', 'ccc'],
  ],
  '*(aa~,bb~).*': [
    ['aa12323', 'asdasd'],
    ['bb12222', 'asd'],
  ],
  '*(aa,bb,bb.aa)': [['bb', 'aa']],
  '*(!aa,bb,bb.aa)': [['xx'], ['yyy']],
  '*(!aaa)': [['bbb']],
  '*(!aaa,bbb)': [['ccc'], ['ggg']],
  '*([startDate,endDate],date,weak)': [['date']],
})

unmatch({
  'a.*': [['a'], ['b']],
  '*(array)': [['array', '0']],
  'aa.bb.*': [['aa', 'bb']],
  'a.*.b': [['a', 'k', 'b', 'd']],
  '*(!aaa)': [['aaa']],
  'dyanmic.*(!dynamic-1)': [['dyanmic', 'dynamic-1']],
  'dyanmic.*(!dynamic-1.*)': [['dyanmic', 'dynamic-1', 'ccc']],
  a: [['c', 'b']],
  'aa~.ccc': [['a', 'ccc'], ['aa'], ['aaasdd']],
  bb: [['bb', 'cc']],
  'aa.*(cc,bb).*.aa': [['aa', 'cc', '0', 'bb']],
})
