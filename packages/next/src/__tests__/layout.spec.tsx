import React from 'react'
import styled from 'styled-components'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { computeNextStyleBase } from '../../src/components/FormMegaLayout/style'

const itemCls = '& > .next-form-item-control > .mega-layout-item-content'
const containerCls = '& > .next-form-item-control > .mega-layout-container-wrapper'

describe('test label-align style', () => {
  test('top', () => {
    const styleResult = computeNextStyleBase({ labelAlign: 'top' });
    const Mega = styled.div`
      ${styleResult.labelAlignStyle}
    `
    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('text-align', 'left', {
      modifier: '& > .next-form-item-label'
    })
  })

  test('top and inline', () => {
    const styleResult = computeNextStyleBase({ labelAlign: 'top', inline: true });
    const Mega = styled.div`
      ${styleResult.labelAlignStyle}
    `
    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('text-align', 'left', {
      modifier: '& > .next-form-item-label'
    })

    expect(tree).toHaveStyleRule('display', 'inline-block', {
      modifier: '&.mega-layout-item'
    })
  })

  test('left', () => {
    const styleResult = computeNextStyleBase({ labelAlign: 'left' });
    const Mega = styled.div`
      ${styleResult.labelAlignStyle}
    `

    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('text-align', 'left', {
      modifier: '& > .next-form-item-label'
    })
    expect(tree).not.toHaveStyleRule('display', 'inline-block', { modifier: '&.mega-layout-item' })
    expect(tree).not.toHaveStyleRule('display', 'block', { modifier: '&.mega-layout-item' })
  })

  test('right', () => {
    const styleResult = computeNextStyleBase({ labelAlign: 'right' });
    const Mega = styled.div`${styleResult.labelAlignStyle}`

    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('text-align', 'right', {
      modifier: '& > .next-form-item-label'
    })
    expect(tree).not.toHaveStyleRule('display', 'inline-block', { modifier: '&.mega-layout-item' })
    expect(tree).not.toHaveStyleRule('display', 'block', { modifier: '&.mega-layout-item' })
  })
})

describe('test addon style', () => {
  test('normal', () => {
    const styleResult = computeNextStyleBase({});
    const Mega = styled.div`${styleResult.addonStyle}`
    const tree = renderer.create(<Mega />).toJSON()

    expect(tree).toMatchSnapshot()
    // container
    expect(tree).toHaveStyleRule('display', 'flex', { modifier: containerCls })
    expect(tree).toHaveStyleRule('flex', '1', { modifier: `${containerCls} > .mega-layout-container-content` })
    // container content
    expect(tree).toHaveStyleRule('margin-bottom', '0', { modifier: `${containerCls} > .mega-layout-container-content` })
    // content before
    expect(tree).toHaveStyleRule('line-height', '28px', { modifier: `${containerCls} > .mega-layout-container-before` })
    expect(tree).toHaveStyleRule('font-size', '14px', { modifier: `${containerCls} > .mega-layout-container-before` })
    expect(tree).toHaveStyleRule('margin-right', 'NaNpx', { modifier: `${containerCls} > .mega-layout-container-before` })
    expect(tree).toHaveStyleRule('flex', 'initial', { modifier: `${containerCls} > .mega-layout-container-before` })
    // content after
    expect(tree).toHaveStyleRule('line-height', '28px', { modifier: `${containerCls} > .mega-layout-container-after` })
    expect(tree).toHaveStyleRule('font-size', '14px', { modifier: `${containerCls} > .mega-layout-container-after` })
    expect(tree).toHaveStyleRule('margin-left', 'NaNpx', { modifier: `${containerCls} > .mega-layout-container-after` })
    expect(tree).toHaveStyleRule('flex', 'initial', { modifier: `${containerCls} > .mega-layout-container-after` })
    // item
    expect(tree).toHaveStyleRule('display', 'flex', { modifier: itemCls })
    // item before
    expect(tree).toHaveStyleRule('margin-right', 'NaNpx', { modifier: `${itemCls} > .formily-mega-item-before` })
    expect(tree).toHaveStyleRule('line-height', '28px', { modifier: `${itemCls} > .formily-mega-item-before` })
    expect(tree).toHaveStyleRule('font-size', '14px', { modifier: `${itemCls} > .formily-mega-item-before` })
    expect(tree).toHaveStyleRule('flex', 'initial', { modifier: `${itemCls} > .formily-mega-item-before` })
    // item after
    expect(tree).toHaveStyleRule('margin-left', 'NaNpx', { modifier: `${itemCls} > .formily-mega-item-after` })
    expect(tree).toHaveStyleRule('line-height', '28px', { modifier: `${itemCls} > .formily-mega-item-after` })
    expect(tree).toHaveStyleRule('font-size', '14px', { modifier: `${itemCls} > .formily-mega-item-after` })
    expect(tree).toHaveStyleRule('flex', 'initial', { modifier: `${itemCls} > .formily-mega-item-after` })
  })

  test('gutter', () => {
    const styleResult = computeNextStyleBase({ gutter: 20 })
    const Mega = styled.div`${styleResult.addonStyle}`
    const tree = renderer.create(<Mega />).toJSON()

    const containerCls = '& > .next-form-item-control > .mega-layout-container-wrapper'
    const itemCls = '& > .next-form-item-control > .mega-layout-item-content'

    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('margin-right', '10px', { modifier: `${containerCls} > .mega-layout-container-before` })
    // content after
    expect(tree).toHaveStyleRule('margin-left', '10px', { modifier: `${containerCls} > .mega-layout-container-after` })
    // item before
    expect(tree).toHaveStyleRule('margin-right', '10px', { modifier: `${itemCls} > .formily-mega-item-before` })
    // item after
    expect(tree).toHaveStyleRule('margin-left', '10px', { modifier: `${itemCls} > .formily-mega-item-after` })
  })
})


describe('test grid layout style', () => {
  test('normal', () => {
    let layoutProps = {
      gutter: 20,
      grid: true,
      enableSafeWidth: true,
    }
    const styleResult = computeNextStyleBase(layoutProps)
    const Mega = styled.div`${styleResult.gridStyle}`
    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('width', '100%', { modifier: '& > .next-form-item' })
    expect(tree).toHaveStyleRule('display', 'flex', { modifier: '& > .next-form-item-control > .mega-layout-container-wrapper' })
    expect(tree).toHaveStyleRule('display', 'flex', { modifier: '& > .next-form-item-control > .mega-layout-container-wrapper' })

    expect(tree).toHaveStyleRule('display', 'grid', { modifier: '& > .next-form-item-control > .mega-layout-container-wrapper > .mega-layout-container-content.grid' })
    expect(tree).toHaveStyleRule('display', 'grid', { modifier: '& > .next-form-item-control > .mega-layout-item-content > .mega-layout-container-content.grid' })

    expect(tree).toHaveStyleRule('grid-column-gap', '20px', { modifier: '& > .next-form-item-control > .mega-layout-container-wrapper > .mega-layout-container-content.grid' })
    expect(tree).toHaveStyleRule('grid-column-gap', '20px', { modifier: '& > .next-form-item-control > .mega-layout-item-content > .mega-layout-container-content.grid' })

    expect(tree).toHaveStyleRule('grid-row-gap', '20px', { modifier: '& > .next-form-item-control > .mega-layout-container-wrapper > .mega-layout-container-content.grid' })
    expect(tree).toHaveStyleRule('grid-row-gap', '20px', { modifier: '& > .next-form-item-control > .mega-layout-item-content > .mega-layout-container-content.grid' })
  })

  test('gridStyle autoRow true', () => {
    let layoutProps = {
      gutter: 20,
      autoRow: true,
      context: {},
      grid: true,
      columns: 3,
      enableSafeWidth: true,
    }
    const styleResult = computeNextStyleBase(layoutProps)
    const Mega = styled.div`${styleResult.gridStyle}`
    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('grid-template-columns', `repeat(3,minmax(100px,1fr))`,
      {
        modifier: `& > .next-form-item-control > .mega-layout-container-wrapper > .mega-layout-container-content.grid`,
      })
  })

  test('gridStyle autoRow true(responsive)', () => {
    let layoutProps = {
      gutter: 20,
      autoRow: true,
      responsive: { s: 1, m: 2, lg: 3 },
      context: {},
      grid: true,
      enableSafeWidth: true,
    }
    const styleResult = computeNextStyleBase(layoutProps)
    const Mega = styled.div`${styleResult.gridStyle}`
    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('grid-template-columns', `repeat(${layoutProps.responsive.s},minmax(100px,1fr))`,
      {
        modifier: `& > .next-form-item-control > .mega-layout-container-wrapper > .mega-layout-container-content.grid`,
        media: '(max-width:720px)'
      })
    expect(tree).toHaveStyleRule('grid-template-columns', `repeat(${layoutProps.responsive.m},minmax(100px,1fr))`,
      {
        modifier: `& > .next-form-item-control > .mega-layout-container-wrapper > .mega-layout-container-content.grid`,
        media: '(min-width:720px) and (max-width:1200px)'
      })
    expect(tree).toHaveStyleRule('grid-template-columns', `repeat(${layoutProps.responsive.lg},minmax(100px,1fr))`,
      {
        modifier: `& > .next-form-item-control > .mega-layout-container-wrapper > .mega-layout-container-content.grid`,
        media: '(min-width:1200px)'
      })
  })

  test('gridStyle autoRow false', () => {
    let layoutProps = {
      gutter: 20,
      autoRow: false,
      responsive: { s: 1, m: 2, lg: 3 },
      context: {},
      grid: true,
      enableSafeWidth: true,
    }
    const styleResult = computeNextStyleBase(layoutProps)
    const Mega = styled.div`${styleResult.gridStyle}`
    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('grid-template-columns', `repeat(auto-fit,minmax(100px,1fr))`,
      {
        modifier: `& > .next-form-item-control > .mega-layout-container-wrapper > .mega-layout-container-content.grid`,
        media: '(max-width:720px)'
      })
    expect(tree).toHaveStyleRule('grid-template-columns', `repeat(auto-fit,minmax(100px,1fr))`,
      {
        modifier: `& > .next-form-item-control > .mega-layout-container-wrapper > .mega-layout-container-content.grid`,
        media: '(min-width:720px) and (max-width:1200px)'
      })
    expect(tree).toHaveStyleRule('grid-template-columns', `repeat(auto-fit,minmax(100px,1fr))`,
      {
        modifier: `& > .next-form-item-control > .mega-layout-container-wrapper > .mega-layout-container-content.grid`,
        media: '(min-width:1200px)'
      })
  })

  test('gridStyle autoRow false(enableSafeWidth=false)', () => {
    let layoutProps = {
      gutter: 20,
      autoRow: false,
      responsive: { s: 1, m: 2, lg: 3 },
      context: {},
      grid: true,
      enableSafeWidth: false,
    }
    const styleResult = computeNextStyleBase(layoutProps)
    const Mega = styled.div`${styleResult.gridStyle}`
    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('grid-template-columns', `repeat(1,1fr)`,
      {
        modifier: `& > .next-form-item-control > .mega-layout-container-wrapper > .mega-layout-container-content.grid`,
        media: '(max-width:720px)'
      })
    expect(tree).toHaveStyleRule('grid-template-columns', `repeat(2,1fr)`,
      {
        modifier: `& > .next-form-item-control > .mega-layout-container-wrapper > .mega-layout-container-content.grid`,
        media: '(min-width:720px) and (max-width:1200px)'
      })
    expect(tree).toHaveStyleRule('grid-template-columns', `repeat(3,1fr)`,
      {
        modifier: `& > .next-form-item-control > .mega-layout-container-wrapper > .mega-layout-container-content.grid`,
        media: '(min-width:1200px)'
      })
  })
})

describe('nest layout item style', () => {
  test('span style span 3', () => {
    let layoutProps = {
      responsive: { s: 1, m: 2, lg: 3 },
      span: 3,
      nested: true,
    }
    const styleResult = computeNextStyleBase(layoutProps)
    const Mega = styled.div`${styleResult.nestLayoutItemStyle}`
    const tree = renderer.create(<Mega />).toJSON()
    const containerCls = `&.mega-layout-nest-container`
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('grid-column-start', `span 1`, {
      modifier: `${containerCls}`,
      media: '(max-width: 720px)'
    })
    expect(tree).toHaveStyleRule('grid-column-start', `span 2`, {
      modifier: `${containerCls}`,
      media: '(min-width: 720px) and (max-width: 1200px)'
    })
    expect(tree).toHaveStyleRule('grid-column-start', `span 3`, {
      modifier: `${containerCls}`,
      media: '(min-width: 1200px)'
    })
  })

  test('span style span 2', () => {
    let layoutProps = {
      responsive: { s: 1, m: 2, lg: 3 },
      span: 2,
      nested: true,
    }
    const styleResult = computeNextStyleBase(layoutProps)
    const Mega = styled.div`${styleResult.nestLayoutItemStyle}`
    const tree = renderer.create(<Mega />).toJSON()
    const containerCls = `&.mega-layout-nest-container`
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('grid-column-start', `span 1`, {
      modifier: `${containerCls}`,
      media: '(max-width: 720px)'
    })
    expect(tree).toHaveStyleRule('grid-column-start', `span 2`, {
      modifier: `${containerCls}`,
      media: '(min-width: 720px) and (max-width: 1200px)'
    })
    expect(tree).toHaveStyleRule('grid-column-start', `span 2`, {
      modifier: `${containerCls}`,
      media: '(min-width: 1200px)'
    })
  })

  test('span style span 1', () => {
    let layoutProps = {
      responsive: { s: 1, m: 2, lg: 3 },
      span: 1,
      nested: true,
    }
    const styleResult = computeNextStyleBase(layoutProps)
    const Mega = styled.div`${styleResult.nestLayoutItemStyle}`
    const tree = renderer.create(<Mega />).toJSON()
    const containerCls = `&.mega-layout-nest-container`
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('grid-column-start', `span 1`, {
      modifier: `${containerCls}`,
      media: '(max-width: 720px)'
    })
    expect(tree).toHaveStyleRule('grid-column-start', `span 1`, {
      modifier: `${containerCls}`,
      media: '(min-width: 720px) and (max-width: 1200px)'
    })
    expect(tree).toHaveStyleRule('grid-column-start', `span 1`, {
      modifier: `${containerCls}`,
      media: '(min-width: 1200px)'
    })
  })

  test('grid item style in small span', () => {
    let layoutProps = {
      responsive: { s: 1, m: 2, lg: 3 },
      span: 2,
      grid: true,
    }

    const styleResult = computeNextStyleBase(layoutProps)
    const Mega = styled.div`${styleResult.gridItemStyle}`
    const tree = renderer.create(<Mega />).toJSON();
    const cls = `&.mega-layout-item-col`
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('grid-column-start', `span 1`, {
      modifier: `${cls}`,
      media: '(max-width: 720px)'
    })
    expect(tree).toHaveStyleRule('grid-column-start', `span 2`, {
      modifier: `${cls}`,
      media: '(min-width: 720px) and (max-width: 1200px)'
    })
    expect(tree).toHaveStyleRule('grid-column-start', `span 2`, {
      modifier: `${cls}`,
      media: '(min-width: 1200px)'
    })
  })

  test('grid item style in large span', () => {
    let layoutProps = {
      responsive: { s: 1, m: 2, lg: 3 },
      span: 4,
      grid: true,
    }

    const styleResult = computeNextStyleBase(layoutProps)
    const Mega = styled.div`${styleResult.gridItemStyle}`
    const tree = renderer.create(<Mega />).toJSON();
    const cls = `&.mega-layout-item-col`
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('grid-column-start', `span 1`, {
      modifier: `${cls}`,
      media: '(max-width: 720px)'
    })
    expect(tree).toHaveStyleRule('grid-column-start', `span 2`, {
      modifier: `${cls}`,
      media: '(min-width: 720px) and (max-width: 1200px)'
    })
    expect(tree).toHaveStyleRule('grid-column-start', `span 3`, {
      modifier: `${cls}`,
      media: '(min-width: 1200px)'
    })
  })
})

describe('nest grid layout container', () => {
  test('nest mega layout container', () => {
    let layoutProps = {
      responsive: { s: 1, m: 2, lg: 3 },
      columns: 3,
      gutter: 20,
      context: {
        grid: true,
      },
      grid: true,
      enableSafeWidth: true,
    }
    const styleResult = computeNextStyleBase(layoutProps)
    const Mega = styled.div`${styleResult.gridStyle}`
    const tree = renderer.create(<Mega />).toJSON();
    const cls = `& > .next-form-item-control > .mega-layout-item-content > .mega-layout-container-content.grid`
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('grid-column-gap', `20px`, {
      modifier: `${cls}`,
    })
    expect(tree).toHaveStyleRule('grid-row-gap', `20px`, {
      modifier: `${cls}`,
    })
    expect(tree).toHaveStyleRule('grid-template-columns', `repeat(auto-fit,1fr)`, {
      modifier: `${cls}`,
      media: '(max-width: 720px)'
    })
    expect(tree).toHaveStyleRule('grid-template-columns', `repeat(auto-fit,1fr)`, {
      modifier: `${cls}`,
      media: '(min-width: 720px) and (max-width: 1200px)'
    })
    expect(tree).toHaveStyleRule('grid-template-columns', `repeat(auto-fit,1fr)`, {
      modifier: `${cls}`,
      media: '(min-width: 1200px)'
    })
  })

  test('nest columns', () => {
    let layoutProps = {
      columns: 3,
      span: 3,
      nested: true,
      autoRow: true,
      contextColumns: 2,
      context: { grid: true },
      grid: true,
      enableSafeWidth: true,
    }
    const styleResult = computeNextStyleBase(layoutProps)
    const Mega = styled.div`
      ${styleResult.gridStyle}
      ${styleResult.nestLayoutItemStyle}
    `
    const tree = renderer.create(<Mega className="mega-layout-nest-container" />).toJSON();
    const cls = `& > .next-form-item-control > .mega-layout-item-content > .mega-layout-container-content.grid`
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('grid-template-columns', `repeat(3,1fr)`, {
      modifier: `${cls}`,
    })

    expect(tree).toHaveStyleRule('grid-column-start', `span 2`, {
      modifier: '&.mega-layout-nest-container',
    })
  })
})

describe('default style', () => {
  test('default style', () => {
    const styleResult = computeNextStyleBase({})
    const Mega = styled.div`${styleResult.defaultStyle}`
    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('display', 'flex')
    expect(tree).toHaveStyleRule('box-sizing', 'border-box')
    expect(tree).toHaveStyleRule('flex', 'initial', { modifier: '& > .next-form-item-label' })
    expect(tree).toHaveStyleRule('flex', '1', { modifier: '& > .next-form-item-control' })
  })
})

describe('inline style', () => {
  test('item', () => {
    const styleResult = computeNextStyleBase({ inline: true })
    const Mega = styled.div`${styleResult.inlineStyle}`
    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('display', 'inline-block')
    expect(tree).toHaveStyleRule('vertical-align', 'top')
    expect(tree).toHaveStyleRule('display', 'inline-block', { modifier: '& > .next-form-item-label' })
    expect(tree).toHaveStyleRule('vertical-align', 'top', { modifier: '& > .next-form-item-label' })

    expect(tree).toHaveStyleRule('display', 'inline-block', { modifier: '& > .next-form-item-control' })

    expect(tree).toHaveStyleRule('margin-right', 'undefinedpx', { modifier: '&:not(:last-child)' })
  })

  test('layout', () => {
    const styleResult = computeNextStyleBase({ inline: true, isLayout: true })
    const Mega = styled.div`${styleResult.inlineStyle}`
    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('display', 'inline-block')
    expect(tree).toHaveStyleRule('vertical-align', 'top')
    expect(tree).toHaveStyleRule('display', 'inline-block', { modifier: '& > .next-form-item-label' })
    expect(tree).toHaveStyleRule('vertical-align', 'top', { modifier: '& > .next-form-item-label' })

    expect(tree).toHaveStyleRule('display', 'inline-block', { modifier: '& > .next-form-item-control' })

    expect(tree).not.toHaveStyleRule('margin-right', 'undefinedpx', { modifier: '&:not(:last-child)' })
  })

  test('labelAlign:top item', () => {
    const styleResult = computeNextStyleBase({ inline: true, labelAlign: 'top' })
    const Mega = styled.div`${styleResult.inlineStyle}`
    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('display', 'block', { modifier: '& > .next-form-item-control' })
  })

  test('labelAlign:top layout', () => {
    const styleResult = computeNextStyleBase({ inline: true, isLayout: true, labelAlign: 'top' })
    const Mega = styled.div`${styleResult.inlineStyle}`
    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('display', 'block', { modifier: '& > .next-form-item-control' })
  })


  test('gutter item', () => {
    const styleResult = computeNextStyleBase({ inline: true, gutter: '20px' })
    const Mega = styled.div`${styleResult.inlineStyle}`
    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('margin-right', '20px', { modifier: '&:not(:last-child)' })
  })
})

describe('width style', () => {
  test('only labelWidth', () => {
    const styleResult = computeNextStyleBase({ labelWidth: '200px' })
    const Mega = styled.div`${styleResult.widthStyle}`
    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('display', 'flex')
    expect(tree).toHaveStyleRule('box-sizing', 'border-box')
    expect(tree).toHaveStyleRule('flex-direction', 'row')

    expect(tree).toHaveStyleRule('width', '200px', { modifier: '& > .next-form-item-label' })
    expect(tree).toHaveStyleRule('max-width', '200px', { modifier: '& > .next-form-item-label' })
    expect(tree).toHaveStyleRule('flex', '0 0 200px', { modifier: '& > .next-form-item-label' })

    expect(tree).toHaveStyleRule('flex', '1', { modifier: '& > .next-form-item-control' })
  })

  test('only wrapperWidth', () => {
    const styleResult = computeNextStyleBase({ wrapperWidth: '200px' })
    const Mega = styled.div`${styleResult.widthStyle}`
    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('display', 'flex')
    expect(tree).toHaveStyleRule('box-sizing', 'border-box')
    expect(tree).toHaveStyleRule('flex-direction', 'row')

    expect(tree).toHaveStyleRule('width', '200px', { modifier: '& > .next-form-item-control' })
    expect(tree).toHaveStyleRule('max-width', '200px', { modifier: '& > .next-form-item-control' })
    expect(tree).toHaveStyleRule('flex', '0 0 200px', { modifier: '& > .next-form-item-control' })

    // label比较特殊，不需要撑满适配，遵循next和antd的col实现
    expect(tree).not.toHaveStyleRule('flex', '1', { modifier: '& > .next-form-item-label' })
  })

  test('labelWidth and wrapperWidth', () => {
    const styleResult = computeNextStyleBase({ labelWidth: '100px', wrapperWidth: '200px' })
    const Mega = styled.div`${styleResult.widthStyle}`
    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('display', 'flex')
    expect(tree).toHaveStyleRule('box-sizing', 'border-box')
    expect(tree).toHaveStyleRule('flex-direction', 'row')

    expect(tree).toHaveStyleRule('width', '100px', { modifier: '& > .next-form-item-label' })
    expect(tree).toHaveStyleRule('max-width', '100px', { modifier: '& > .next-form-item-label' })
    expect(tree).toHaveStyleRule('flex', '0 0 100px', { modifier: '& > .next-form-item-label' })

    expect(tree).toHaveStyleRule('width', '200px', { modifier: '& > .next-form-item-control' })
    expect(tree).toHaveStyleRule('max-width', '200px', { modifier: '& > .next-form-item-control' })
    expect(tree).toHaveStyleRule('flex', '0 0 200px', { modifier: '& > .next-form-item-control' })
  })

  test('labelAlign:top labelWidth and wrapperWidth', () => {
    const styleResult = computeNextStyleBase({ labelAlign: 'top', labelWidth: '100px', wrapperWidth: '200px' })
    const Mega = styled.div`${styleResult.widthStyle}`
    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('display', 'flex')
    expect(tree).toHaveStyleRule('box-sizing', 'border-box')
    expect(tree).toHaveStyleRule('flex-direction', 'column')

    expect(tree).toHaveStyleRule('width', '100px', { modifier: '& > .next-form-item-label' })
    expect(tree).toHaveStyleRule('max-width', '100px', { modifier: '& > .next-form-item-label' })
    expect(tree).toHaveStyleRule('flex', 'initial', { modifier: '& > .next-form-item-label' })

    expect(tree).toHaveStyleRule('width', '200px', { modifier: '& > .next-form-item-control' })
    expect(tree).toHaveStyleRule('max-width', '200px', { modifier: '& > .next-form-item-control' })
    expect(tree).toHaveStyleRule('flex', 'initial', { modifier: '& > .next-form-item-control' })
  })
})

describe('layoutMarginStyle', () => {
  test('default layout', () => {
    const styleResult = computeNextStyleBase({ isLayout: true, })
    const Mega = styled.div`${styleResult.layoutMarginStyle}`
    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('margin-bottom', '0', { modifier: '> .next-form-item-control > .mega-layout-container-wrapper > .mega-layout-container-content > .mega-layout-item:last-child' })
    expect(tree).toHaveStyleRule('margin-bottom', '0', { modifier: '> .next-form-item-control > .mega-layout-container-wrapper > .mega-layout-container-content > .mega-layout-container:last-child' })
  })

  test('inline layout', () => {
    const styleResult = computeNextStyleBase({ isLayout: true, inline: true })
    const Mega = styled.div`${styleResult.layoutMarginStyle}`
    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()

    expect(tree).toHaveStyleRule('margin-bottom', '0', { modifier: '> .next-form-item-control > .mega-layout-container-wrapper > .mega-layout-container-content > .mega-layout-item-col > .mega-layout-item' })
    expect(tree).toHaveStyleRule('margin-bottom', '0', { modifier: '> .next-form-item-control > .mega-layout-container-wrapper > .mega-layout-container-content > .mega-layout-item' })
    expect(tree).toHaveStyleRule('margin-bottom', '0', { modifier: '> .next-form-item-control > .mega-layout-container-wrapper > .mega-layout-container-content > .mega-layout-container:last-child' })
  })

  test('grid layout', () => {
    const styleResult = computeNextStyleBase({ isLayout: true, inline: true })
    const Mega = styled.div`${styleResult.layoutMarginStyle}`
    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()

    expect(tree).toHaveStyleRule('margin-bottom', '0', { modifier: '> .next-form-item-control > .mega-layout-container-wrapper > .mega-layout-container-content > .mega-layout-item-col > .mega-layout-item' })
    expect(tree).toHaveStyleRule('margin-bottom', '0', { modifier: '> .next-form-item-control > .mega-layout-container-wrapper > .mega-layout-container-content > .mega-layout-item' })
    expect(tree).toHaveStyleRule('margin-bottom', '0', { modifier: '> .next-form-item-control > .mega-layout-container-wrapper > .mega-layout-container-content > .mega-layout-container:last-child' })
  })

  test('medium size', () => {
    const styleResult = computeNextStyleBase({
      size: "medium"
    });
    const Mega = styled.div`${styleResult.addonStyle}`
    const tree = renderer.create(<Mega />).toJSON()

    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('line-height', '28px', { modifier: `${itemCls} > .formily-mega-item-before` })
    expect(tree).toHaveStyleRule('font-size', '14px', { modifier: `${itemCls} > .formily-mega-item-before` })
    expect(tree).toHaveStyleRule('line-height', '28px', { modifier: `${containerCls} > .mega-layout-container-after` })
    expect(tree).toHaveStyleRule('font-size', '14px', { modifier: `${containerCls} > .mega-layout-container-after` })

  })

  test('middle size', () => {
    const styleResult = computeNextStyleBase({
      size: "middle"
    });
    const Mega = styled.div`${styleResult.addonStyle}`
    const tree = renderer.create(<Mega />).toJSON()

    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('line-height', '28px', { modifier: `${itemCls} > .formily-mega-item-before` })
    expect(tree).toHaveStyleRule('font-size', '14px', { modifier: `${itemCls} > .formily-mega-item-before` })
    expect(tree).toHaveStyleRule('line-height', '28px', { modifier: `${containerCls} > .mega-layout-container-after` })
    expect(tree).toHaveStyleRule('font-size', '14px', { modifier: `${containerCls} > .mega-layout-container-after` })

  })

  test('small size', () => {
    const styleResult = computeNextStyleBase({
      size: "small"
    });
    const Mega = styled.div`${styleResult.addonStyle}`
    const tree = renderer.create(<Mega />).toJSON()

    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('line-height', '20px', { modifier: `${itemCls} > .formily-mega-item-before` })
    expect(tree).toHaveStyleRule('font-size', '12px', { modifier: `${itemCls} > .formily-mega-item-before` })
    expect(tree).toHaveStyleRule('line-height', '20px', { modifier: `${containerCls} > .mega-layout-container-after` })
    expect(tree).toHaveStyleRule('font-size', '12px', { modifier: `${containerCls} > .mega-layout-container-after` })

  })

  test('large size', () => {
    const styleResult = computeNextStyleBase({
      size: "large"
    });
    const Mega = styled.div`${styleResult.addonStyle}`
    const tree = renderer.create(<Mega />).toJSON()

    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('line-height', '40px', { modifier: `${itemCls} > .formily-mega-item-before` })
    expect(tree).toHaveStyleRule('font-size', '16px', { modifier: `${itemCls} > .formily-mega-item-before` })
    expect(tree).toHaveStyleRule('line-height', '40px', { modifier: `${containerCls} > .mega-layout-container-after` })
    expect(tree).toHaveStyleRule('font-size', '16px', { modifier: `${containerCls} > .mega-layout-container-after` })
  })

})

describe('inset mode', () => {
  test('inset style', () => {
    const styleResult = computeNextStyleBase({
      inset: true,
      isLayout: true
    });
    const Mega = styled.div`${styleResult.insetStyle}`
    const tree = renderer.create(<Mega />).toJSON()

    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('flex-direction', 'column', { modifier: `.mega-layout-item-inset` })
    expect(tree).toHaveStyleRule('flex-direction', 'column', { modifier: `.mega-layout-item-inset` })
    expect(tree).toHaveStyleRule('border-color', 'red', { modifier: `.mega-layout-item-inset-has-error .next-form-item` })
    expect(tree).toHaveStyleRule('border-color', '#FF6A00', { modifier: `.mega-layout-item-inset-has-warning .next-form-item` })
    expect(tree).toHaveStyleRule('color', 'red', { modifier: `.mega-layout-item-inset-has-error .mega-layout-item-inset-help` })
    expect(tree).toHaveStyleRule('color', '#FF6A00', { modifier: `.mega-layout-item-inset-has-warning .mega-layout-item-inset-help` })
    expect(tree).toHaveStyleRule('display', 'none', { modifier: `.next-form-item-help` })
    expect(tree).toHaveStyleRule('padding-left', '0', { modifier: `&.mega-layout-item .next-form-item` })
    expect(tree).toHaveStyleRule('border', 'none', { modifier: `&.mega-layout-item .next-form-item` })
  })

  test('inset style(hasBorder)', () => {
    const styleResult = computeNextStyleBase({
      inset: true,
      isLayout: true,
      hasBorder: true,
    });
    const Mega = styled.div`${styleResult.insetStyle}`
    const tree = renderer.create(<Mega />).toJSON()

    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('padding-left', '12px', { modifier: `.next-form-item` })
    expect(tree).toHaveStyleRule('border', '1px solid #D8D8D8', { modifier: `.next-form-item` })
    expect(tree).toHaveStyleRule('border-radius', '4px', { modifier: `.next-form-item` })
  })

  test('inset style of component', () => {
    const styleResult = computeNextStyleBase({
      inset: true,
      isLayout: true,
      hasBorder: true,
    });
    const Mega = styled.div`${styleResult.insetStyle}`
    const tree = renderer.create(<Mega />).toJSON()

    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('border', 'none', { modifier: `.next-range-picker-trigger` })
    expect(tree).toHaveStyleRule('border', 'none', { modifier: `.next-input` })
  })

  test('item inset style(hasBorder)', () => {
    const styleResult = computeNextStyleBase({
      inset: true,
      isLayout: false,
      hasBorder: false,
    });
    const Mega = styled.div`${styleResult.insetStyle}`
    const tree = renderer.create(<Mega />).toJSON()

    expect(tree).toMatchSnapshot()    
    expect(tree).toHaveStyleRule('padding-left', '0', { modifier: `&.mega-layout-item .next-form-item` })
    expect(tree).toHaveStyleRule('border', 'none', { modifier: `&.mega-layout-item .next-form-item` })
    expect(tree).not.toHaveStyleRule('display', 'none', { modifier: `.next-form-item-help` })
    expect(tree).not.toHaveStyleRule('flex-direction', 'column', { modifier: `.mega-layout-item-inset` })
    expect(tree).not.toHaveStyleRule('flex-direction', 'column', { modifier: `.mega-layout-item-inset` })
    expect(tree).not.toHaveStyleRule('border-color', 'red', { modifier: `.mega-layout-item-inset-has-error .next-form-item` })
    expect(tree).not.toHaveStyleRule('border-color', '#FF6A00', { modifier: `.mega-layout-item-inset-has-warning .next-form-item` })
    expect(tree).not.toHaveStyleRule('color', 'red', { modifier: `.mega-layout-item-inset-has-error .mega-layout-item-inset-help` })
    expect(tree).not.toHaveStyleRule('color', '#FF6A00', { modifier: `.mega-layout-item-inset-has-warning .mega-layout-item-inset-help` })
    expect(tree).not.toHaveStyleRule('display', 'none', { modifier: `.next-form-item-help` })
  })
})
