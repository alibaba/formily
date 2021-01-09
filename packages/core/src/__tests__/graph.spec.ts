import { FormGraph } from '../shared/graph'
import { FormPathPattern, FormPath } from '@formily/shared'
import { IField, IVirtualField } from '../types'
import createForm from '../'
import { Form } from '../models/form'

test('constructor with strategy', () => {
  function matchStrategy(
    pattern: FormPathPattern,
    node: IField | IVirtualField
  ) {
    const matchPattern = FormPath.parse(pattern)
    return node.getSourceState(
      state => matchPattern.match(state.name) || matchPattern.match(state.path)
    )
  }

  const form = createForm()
  const vf1 = form.registerVirtualField({ name: 'a' })
  const graph = new FormGraph({ matchStrategy })
  graph.appendNode(vf1, 'a')
  expect(graph.select('a')).toEqual(vf1)
})

test('constructor without strategy', () => {
  const form = createForm()
  const vf1 = form.registerVirtualField({ name: 'a' })
  const graph = new FormGraph()
  graph.appendNode(vf1, vf1.state.path)
  expect(graph.select(vf1.state.path)).toEqual(vf1)
})

test('appendNode', () => {
  const state = new Form({})
  const form = createForm()
  const vf1 = form.registerVirtualField({ name: 'a' })
  const vf1Children = form.registerVirtualField({ name: 'a.a' })
  const vf2 = form.registerVirtualField({ name: 'b' })
  const vf2Children = form.registerVirtualField({ name: 'b.b' })
  const graph = new FormGraph()
  graph.appendNode(state, '')
  graph.appendNode(vf1, vf1.state.path)
  graph.appendNode(vf2, vf2.state.path)
  graph.appendNode(vf1Children, vf1Children.state.path)
  graph.appendNode(vf2Children, vf2Children.state.path)
  // DFS
  expect(graph.selectChildren('')[0]).toEqual(vf1)
  expect(graph.selectChildren('')[1]).toEqual(vf1Children)
  expect(graph.selectChildren('')[2]).toEqual(vf2)
  expect(graph.selectChildren('')[3]).toEqual(vf2Children)
  expect(graph.selectChildren(vf1.state.path)).toEqual([vf1Children])
  expect(graph.selectChildren(vf2.state.path)).toEqual([vf2Children])
  expect(graph.selectChildren(vf1Children.state.path)).toEqual([])
  expect(graph.selectChildren(vf2Children.state.path)).toEqual([])
})

test('appendNode disOreder', () => {
  const state = new Form({})
  const form = createForm()
  const vf1 = form.registerVirtualField({ name: 'a' })
  const vf1Children = form.registerVirtualField({ name: 'a.a' })
  const vf2 = form.registerVirtualField({ name: 'b' })
  const graph = new FormGraph()
  // 极端情况，先加子节点，再加父节点不会生效，保证上层代码正常即可
  graph.appendNode(vf1Children, vf1Children.state.path)
  graph.appendNode(vf1, vf1.state.path)
  graph.appendNode(vf2, vf2.state.path)
  expect(graph.selectChildren(vf1.state.path)).toEqual([])
  expect(graph.selectChildren('')).toEqual([])
  graph.appendNode(state, '')
  expect(graph.selectChildren('')).toEqual([])
})

test('select', () => {
  const form = createForm()
  const vf1 = form.registerVirtualField({ name: 'a' })
  const graph = new FormGraph()
  graph.appendNode(vf1, vf1.state.path)
  expect(graph.select(vf1.state.path)).toEqual(vf1)
  expect(graph.select('b')).toEqual(undefined)
})

test('get', () => {
  const form = createForm()
  const vf1 = form.registerVirtualField({ name: 'a' })
  const graph = new FormGraph()
  graph.appendNode(vf1, vf1.state.path)
  expect(graph.get(vf1.state.path)).toEqual(vf1)
  expect(graph.get('b')).toEqual(undefined)
})

test('exist', () => {
  const form = createForm()
  const vf1 = form.registerVirtualField({ name: 'a' })
  const graph = new FormGraph()
  graph.appendNode(vf1, vf1.state.path)
  expect(graph.exist(vf1.state.path)).toEqual(true)
  expect(graph.exist('b')).toEqual(false)
})

test('replace', () => {
  const form = createForm()
  const vf1 = form.registerVirtualField({ name: 'a' })
  const vf1Children = form.registerVirtualField({ name: 'a.a' })
  const vf2 = form.registerVirtualField({ name: 'b' })
  const graph = new FormGraph()
  graph.appendNode(vf1, vf1.state.path)
  graph.appendNode(vf1Children, vf1Children.state.path)
  expect(graph.get(vf1.state.path)).toEqual(vf1)
  expect(graph.get(vf1Children.state.path)).toEqual(vf1Children)
  graph.replace(vf1.state.path, vf2)
  expect(graph.get(vf1.state.path)).toEqual(vf2)
  // 完全打平, 更换parent不会影响子类
  expect(graph.get(vf1Children.state.path)).toEqual(vf1Children)
})

test('remove', () => {
  const form = createForm()
  const vf1 = form.registerVirtualField({ name: 'a' })
  const graph = new FormGraph()
  graph.appendNode(vf1, vf1.state.path)
  expect(graph.exist(vf1.state.path)).toEqual(true)
  graph.remove(vf1.state.path)
  expect(graph.exist(vf1.state.path)).toEqual(false)
})

test('remove deep', () => {
  const state = new Form({})
  const form = createForm()
  const vf1 = form.registerVirtualField({ name: 'a' })
  const vf1Children = form.registerVirtualField({ name: 'a.a' })
  const vf1GrandChildren = form.registerVirtualField({ name: 'a.a.a' })
  const graph = new FormGraph()
  graph.appendNode(state, '')
  graph.appendNode(vf1, vf1.state.path)
  graph.appendNode(vf1Children, vf1Children.state.path)
  graph.appendNode(vf1GrandChildren, vf1GrandChildren.state.path)
  graph.remove(vf1.state.path)
  expect(graph.exist(vf1.state.path)).toEqual(false)
  expect(graph.exist(vf1Children.state.path)).toEqual(false)
  expect(graph.exist(vf1GrandChildren.state.path)).toEqual(false)
})

test('map', () => {
  const form = createForm()
  const vf1 = form.registerVirtualField({ name: 'a' })
  const vf2 = form.registerVirtualField({ name: 'b' })
  const graph = new FormGraph()
  graph.appendNode(vf1, vf1.state.path)
  graph.appendNode(vf2, vf2.state.path)
  // nodes 是kv结构, map后也是kv结构
  const result = graph.map(node => node)
  expect(result).toEqual({ a: vf1, b: vf2 })
})

test('reduce', () => {
  const form = createForm()
  const vf1 = form.registerVirtualField({ name: 'a' })
  const vf2 = form.registerVirtualField({ name: 'b' })
  const graph = new FormGraph()
  graph.appendNode(vf1, vf1.state.path)
  graph.appendNode(vf2, vf2.state.path)
  const result = graph.reduce((buf, node) => [...buf].concat(node), [])
  expect(result).toEqual([vf1, vf2])
})

test('selectChildren', () => {
  const state = new Form({})
  const form = createForm()
  const vf1 = form.registerVirtualField({ name: 'a' })
  const vf2 = form.registerVirtualField({ name: 'b' })
  const graph = new FormGraph()
  graph.appendNode(state, '')
  graph.appendNode(vf1, vf1.state.path)
  graph.appendNode(vf2, vf2.state.path)
  expect(graph.selectChildren('')).toEqual([vf1, vf2])
  expect(graph.selectChildren(vf1.state.path)).toEqual([])
  expect(graph.selectChildren(vf2.state.path)).toEqual([])
})

test('selectParent', () => {
  const state = new Form({})
  const form = createForm()
  const vf1 = form.registerVirtualField({ name: 'a' })
  const vf1Children = form.registerVirtualField({ name: 'a.a' })
  const vf2 = form.registerVirtualField({ name: 'b' })
  const vf2Children = form.registerVirtualField({ name: 'b.b' })
  const graph = new FormGraph()
  graph.appendNode(state, '')
  graph.appendNode(vf1, vf1.state.path)
  graph.appendNode(vf2, vf2.state.path)
  graph.appendNode(vf1Children, vf1Children.state.path)
  graph.appendNode(vf2Children, vf2Children.state.path)
  expect(graph.selectParent('')).toEqual(undefined)
  expect(graph.selectParent(vf1.state.path)).toEqual(state)
  expect(graph.selectParent(vf2.state.path)).toEqual(state)
  expect(graph.selectParent(vf1Children.state.path)).toEqual(vf1)
  expect(graph.selectParent(vf2Children.state.path)).toEqual(vf2)
})

test('eachChildren eacher', () => {
  const state = new Form({})
  const form = createForm()
  const vf1 = form.registerVirtualField({ name: 'a' })
  const vf1Children = form.registerVirtualField({ name: 'a.a' })
  const vf1GrandChildren = form.registerVirtualField({ name: 'a.a.a' })
  const graph = new FormGraph()
  graph.appendNode(state, '')
  graph.appendNode(vf1, vf1.state.path)
  graph.appendNode(vf1Children, vf1Children.state.path)
  graph.appendNode(vf1GrandChildren, vf1GrandChildren.state.path)

  // shallow mode: recursion = false
  const shallowChilds = []
  graph.eachChildren((node, path) => {
    shallowChilds.push({ node, path })
  }, false)

  expect(shallowChilds).toEqual([
    { node: vf1, path: FormPath.getPath(vf1.state.path) }
  ])

  // deep mode: recursion = true
  const deepChilds = []
  graph.eachChildren((node, path) => {
    deepChilds.push({ node, path })
  }, true)
  expect(deepChilds).toEqual([
    { node: vf1, path: FormPath.getPath(vf1.state.path) },
    { node: vf1Children, path: FormPath.getPath(vf1Children.state.path) },
    {
      node: vf1GrandChildren,
      path: FormPath.getPath(vf1GrandChildren.state.path)
    }
  ])
})

test('eachChildren path eacher', () => {
  const state = new Form({})
  const form = createForm()
  const vf1 = form.registerVirtualField({ name: 'a' })
  const vf1Children = form.registerVirtualField({ name: 'a.a' })
  const vf1GrandChildren = form.registerVirtualField({ name: 'a.a.a' })
  const graph = new FormGraph()
  graph.appendNode(state, '')
  graph.appendNode(vf1, vf1.state.path)
  graph.appendNode(vf1Children, vf1Children.state.path)
  graph.appendNode(vf1GrandChildren, vf1GrandChildren.state.path)

  // deep mode: recursion = true
  const deepChilds = []
  graph.eachChildren(
    'a',
    (node, path) => {
      deepChilds.push({ node, path })
    },
    true
  )
  expect(deepChilds).toEqual([
    { node: vf1Children, path: FormPath.getPath(vf1Children.state.path) },
    {
      node: vf1GrandChildren,
      path: FormPath.getPath(vf1GrandChildren.state.path)
    }
  ])
})

test('eachChildren path selector eacher', () => {
  const state = new Form({})
  const form = createForm()
  const vf1 = form.registerVirtualField({ name: 'a' })
  const vf1Children = form.registerVirtualField({ name: 'a.a' })
  const vf1GrandChildren = form.registerVirtualField({ name: 'a.a.a' })
  const graph = new FormGraph()
  graph.appendNode(state, '')
  graph.appendNode(vf1, vf1.state.path)
  graph.appendNode(vf1Children, vf1Children.state.path)
  graph.appendNode(vf1GrandChildren, vf1GrandChildren.state.path)

  // shallow mode: recursion = false
  const shallowChilds = []
  graph.eachChildren(
    'a',
    'a.a.a',
    (node, path) => {
      shallowChilds.push({ node, path })
    },
    false
  )
  expect(shallowChilds).toEqual([])

  // deep mode: recursion = true
  const deepChilds = []
  graph.eachChildren(
    'a',
    'a.a',
    (node, path) => {
      deepChilds.push({ node, path })
    },
    true
  )
  expect(deepChilds).toEqual([
    { node: vf1Children, path: FormPath.getPath(vf1Children.state.path) }
  ])
})

test('eachParent', () => {
  const state = new Form({})
  const form = createForm()
  const vf1 = form.registerVirtualField({ name: 'a' })
  const vf1Children = form.registerVirtualField({ name: 'a.a' })
  const vf1GrandChildren = form.registerVirtualField({ name: 'a.a.a' })
  const graph = new FormGraph()
  graph.appendNode(state, '')
  graph.appendNode(vf1, vf1.state.path)
  graph.appendNode(vf1Children, vf1Children.state.path)
  graph.appendNode(vf1GrandChildren, vf1GrandChildren.state.path)
  const rootEacher = jest.fn()
  graph.eachParent('', rootEacher)
  expect(rootEacher).toBeCalledTimes(0)
  //expect(rootEacher).toBeCalledWith(state, FormPath.getPath(""))

  const vf1Eacher = jest.fn()
  graph.eachParent(vf1.state.path, vf1Eacher)
  expect(vf1Eacher).toBeCalledTimes(1)

  const vf1CEacher = jest.fn()
  graph.eachParent(vf1Children.state.path, vf1CEacher)
  expect(vf1CEacher).toBeCalledTimes(2)

  const vf1GEacher = jest.fn()
  graph.eachParent(vf1GrandChildren.state.path, vf1GEacher)
  expect(vf1GEacher).toBeCalledTimes(3)
})

test('getLatestParent', () => {
  const state = new Form({})
  const form = createForm()
  const vf1 = form.registerVirtualField({ name: 'a' })
  const vf1Children = form.registerVirtualField({ name: 'a.a' })
  const vf1GrandChildren = form.registerVirtualField({ name: 'a.a.a' })
  const vf2 = form.registerVirtualField({ name: 'b' })
  const vf2Children = form.registerVirtualField({ name: 'b.b' })
  const graph = new FormGraph()
  graph.appendNode(state, '')
  graph.appendNode(vf1, vf1.state.path)
  graph.appendNode(vf2, vf2.state.path)
  graph.appendNode(vf1Children, vf1Children.state.path)
  graph.appendNode(vf1GrandChildren, vf1GrandChildren.state.path)
  graph.appendNode(vf2Children, vf2Children.state.path)
  expect(graph.getLatestParent('')).toEqual(undefined)
  const rootPath = FormPath.getPath('')
  const v1Path = FormPath.getPath(vf1.state.path)
  const v2Path = FormPath.getPath(vf2.state.path)
  const v1CPath = FormPath.getPath(vf1Children.state.path)
  const v2CPath = FormPath.getPath(vf2Children.state.path)
  const root = {
    path: rootPath,
    ref: { path: rootPath, dataPath: rootPath, children: [v1Path, v2Path] }
  }
  expect(graph.getLatestParent(vf1.state.path)).toEqual(root)
  expect(graph.getLatestParent(vf2.state.path)).toEqual(root)
  expect(graph.getLatestParent(vf1Children.state.path)).toEqual({
    path: v1Path,
    ref: {
      path: v1Path,
      dataPath: v1Path,
      children: [v1CPath],
      parent: graph.getLatestParent(vf1.state.path).ref
    }
  })
  expect(graph.getLatestParent(vf2Children.state.path)).toEqual({
    path: v2Path,
    ref: {
      path: v2Path,
      dataPath: v2Path,
      children: [v2CPath],
      parent: graph.getLatestParent(vf2.state.path).ref
    }
  })
  expect(graph.getLatestParent(vf1GrandChildren.state.path)).toEqual({
    path: v1CPath,
    ref: {
      path: v1CPath,
      dataPath: v1CPath,
      children: [FormPath.getPath(vf1GrandChildren.state.path)],
      parent: graph.getLatestParent(vf1Children.state.path).ref
    }
  })
})
