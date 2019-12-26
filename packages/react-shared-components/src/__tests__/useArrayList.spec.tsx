import React, { Fragment } from 'react'
import ReactDOMServer from 'react-dom/server'
import { ArrayContext } from '../context'
import { useArrayList } from '../hooks/useArrayList'
import { renderHook } from '@testing-library/react-hooks'

const ArrayWrapper = props => {
  return (
    <ArrayContext.Provider value={props}>
      {props.children}
    </ArrayContext.Provider>
  )
}

describe('useArrayList', () => {
  test('default index', () => {
    const { result: defaultResult } = renderHook(() => useArrayList(), {
      wrapper: props => <ArrayWrapper value={[]} {...props} />
    })
    expect(defaultResult.current.currentIndex).toEqual(0)

    const { result } = renderHook(() => useArrayList(2), {
      wrapper: props => <ArrayWrapper value={[]} {...props} />
    })
    expect(result.current.currentIndex).toEqual(2)
  })

  test('empty', () => {
    const { result: emptyResult } = renderHook(() => useArrayList(), {
      wrapper: props => <ArrayWrapper value={[]} {...props} />
    })
    expect(emptyResult.current.isEmpty).toEqual(true)

    const { result: validResult } = renderHook(() => useArrayList(), {
      wrapper: props => <ArrayWrapper value={[{}]} {...props} />
    })
    expect(validResult.current.isEmpty).toEqual(false)
  })

  test('disabled', () => {
    const { result: basic } = renderHook(() => useArrayList(), {
      wrapper: props => <ArrayWrapper {...props} />
    })
    expect(basic.current.isDisable).toEqual(false)

    const { result: disabledResult } = renderHook(() => useArrayList(), {
      wrapper: props => <ArrayWrapper disabled {...props} />
    })
    expect(disabledResult.current.isDisable).toEqual(true)

    const { result: editableResult } = renderHook(() => useArrayList(), {
      wrapper: props => <ArrayWrapper editable={false} {...props} />
    })
    expect(editableResult.current.isDisable).toEqual(true)
  })

  test('allow-*', () => {
    const { result: emptyResult } = renderHook(() => useArrayList(), {
      wrapper: props => <ArrayWrapper value={[]} {...props} />
    })
    expect(emptyResult.current.allowRemove).toEqual(true)
    expect(emptyResult.current.allowAddition).toEqual(true)
    expect(emptyResult.current.allowMoveDown).toEqual(false)
    expect(emptyResult.current.allowMoveUp).toEqual(false)

    const { result: oneResult } = renderHook(() => useArrayList(), {
      wrapper: props => <ArrayWrapper value={[{}]} {...props} />
    })
    expect(oneResult.current.allowRemove).toEqual(true)
    expect(oneResult.current.allowAddition).toEqual(true)
    expect(oneResult.current.allowMoveDown).toEqual(false)
    expect(oneResult.current.allowMoveUp).toEqual(false)

    const { result: twoResult } = renderHook(() => useArrayList(), {
      wrapper: props => <ArrayWrapper value={[{}, {}]} {...props} />
    })
    expect(twoResult.current.allowRemove).toEqual(true)
    expect(twoResult.current.allowAddition).toEqual(true)
    expect(twoResult.current.allowMoveDown).toEqual(true)
    expect(twoResult.current.allowMoveUp).toEqual(true)
  })

  test('disabled and allow-*', () => {
    const { result: disabledResult } = renderHook(() => useArrayList(), {
      wrapper: props => <ArrayWrapper disabled value={[{}, {}]} {...props} />
    })
    expect(disabledResult.current.allowRemove).toEqual(false)
    expect(disabledResult.current.allowAddition).toEqual(false)
    expect(disabledResult.current.allowMoveDown).toEqual(false)
    expect(disabledResult.current.allowMoveUp).toEqual(false)
  })

  test('render', () => {
    // common renders
    const { result: basicResult } = renderHook(() => useArrayList(), {
      wrapper: props => (
        <ArrayWrapper
          renders={{
            test: 123
          }}
          {...props}
        />
      )
    })

    const result = basicResult.current.renderWith(
      'test',
      node => <Fragment>{node}</Fragment>,
      null
    )
    expect(ReactDOMServer.renderToStaticMarkup(result)).toEqual('123')

    // jsx renders
    const { result: jsxResult } = renderHook(() => useArrayList(), {
      wrapper: props => (
        <ArrayWrapper
          renders={{
            test: <div>123</div>
          }}
          {...props}
        />
      )
    })

    const resultJSX = jsxResult.current.renderWith(
      'test',
      node => <Fragment>{node}</Fragment>,
      null
    )
    expect(ReactDOMServer.renderToStaticMarkup(resultJSX)).toEqual(
      '<div>123</div>'
    )

    // function renders
    const { result: funcResult } = renderHook(() => useArrayList(), {
      wrapper: props => (
        <ArrayWrapper
          renders={{
            test: idx => `currentIndex:${idx}`
          }}
          {...props}
        />
      )
    })

    const resultFunc = funcResult.current.renderWith(
      'test',
      node => <Fragment>{node}</Fragment>,
      null
    )
    expect(ReactDOMServer.renderToStaticMarkup(resultFunc)).toEqual(
      `currentIndex:0`
    )

    // function wrapper
    const { result: wrapperResult } = renderHook(() => useArrayList(), {
      wrapper: props => (
        <ArrayWrapper
          renders={{
            test: idx => `currentIndex:${idx}`
          }}
          {...props}
        />
      )
    })

    const resultWrapper = wrapperResult.current.renderWith(
      'test',
      node => <Fragment>{node}</Fragment>,
      props => {
        const {
          children,
          isEmpty,
          isDisable,
          currentIndex,
          allowAddition,
          allowRemove,
          allowMoveDown,
          allowMoveUp
        } = props
        // context passed
        expect(isEmpty).toEqual(true)
        expect(isDisable).toEqual(false)
        expect(currentIndex).toEqual(0)
        expect(allowRemove).toEqual(true)
        expect(allowAddition).toEqual(true)
        expect(allowMoveDown).toEqual(false)
        expect(allowMoveUp).toEqual(false)

        return <div>{children}</div>
      }
    )
    expect(ReactDOMServer.renderToStaticMarkup(resultWrapper)).toEqual(
      `<div>currentIndex:0</div>`
    )

    // empty function wrapper
    const { result: wrapperResult2 } = renderHook(() => useArrayList(), {
      wrapper: props => (
        <ArrayWrapper
          renders={{
            test: idx => `currentIndex:${idx}`
          }}
          {...props}
        />
      )
    })

    const resultWrapper2 = wrapperResult2.current.renderWith(
      'test',
      node => <Fragment>{node}</Fragment>,
      props => {
        // do nothing...
      }
    )
    expect(ReactDOMServer.renderToStaticMarkup(resultWrapper2)).toEqual('')
  })
})
