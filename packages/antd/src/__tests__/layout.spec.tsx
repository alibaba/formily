import React from 'react'
import styled from 'styled-components'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { computeAntdStyleBase } from '../../src/components/FormMegaLayout/style'

describe('test label-align style',() => {
  test('top', () => {
    const styleResult = computeAntdStyleBase({ labelAlign: 'top' });
    const Mega = styled.div`
      ${styleResult.labelAlignStyle}
    `
    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('text-align', 'left', {
      modifier: '& > .ant-form-item-label'
    })
  })

  test('top and inline', () => {
    const styleResult = computeAntdStyleBase({ labelAlign: 'top', inline: true });
    const Mega = styled.div`
      ${styleResult.labelAlignStyle}
    `
    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('text-align', 'left', {
      modifier: '& > .ant-form-item-label'
    })

    expect(tree).toHaveStyleRule('display', 'inline-block', {
      modifier: '&.mega-layout-item'
    })
  })

  test('left', () => {
    const styleResult = computeAntdStyleBase({ labelAlign: 'left' });
    const Mega = styled.div`
      ${styleResult.labelAlignStyle}
    `

    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('text-align', 'left', {
      modifier: '& > .ant-form-item-label'
    })
    expect(tree).not.toHaveStyleRule('display', 'inline-block', { modifier: '&.mega-layout-item' })
    expect(tree).not.toHaveStyleRule('display', 'block', { modifier: '&.mega-layout-item' })
  })

  test('right', () => {
    const styleResult = computeAntdStyleBase({ labelAlign: 'right' });
    const Mega = styled.div`${styleResult.labelAlignStyle}`

    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('text-align', 'right', {
      modifier: '& > .ant-form-item-label'
    })
    expect(tree).not.toHaveStyleRule('display', 'inline-block', { modifier: '&.mega-layout-item' })
    expect(tree).not.toHaveStyleRule('display', 'block', { modifier: '&.mega-layout-item' })
  })
})

describe('test addon style',() => {
  test('normal', () => {
    const styleResult = computeAntdStyleBase({});
    const Mega = styled.div`${styleResult.addonStyle}`
    const tree = renderer.create(<Mega />).toJSON()

    const containerCls = '& > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .mega-layout-container-wrapper'
    const itemCls = '& > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .mega-layout-item-content'

    expect(tree).toMatchSnapshot()
    // container
    expect(tree).toHaveStyleRule('display', 'flex', { modifier: containerCls })
    expect(tree).toHaveStyleRule('flex', '1', { modifier: `${containerCls} > .mega-layout-container-content` })
    // container content
    expect(tree).toHaveStyleRule('margin-bottom', '0', { modifier: `${containerCls} > .mega-layout-container-content` })
    // content before
    expect(tree).toHaveStyleRule('height', '32px', { modifier: `${containerCls} > .mega-layout-container-before` })
    expect(tree).toHaveStyleRule('font-size', '14px', { modifier: `${containerCls} > .mega-layout-container-before` })
    expect(tree).toHaveStyleRule('margin-right', 'NaNpx', { modifier: `${containerCls} > .mega-layout-container-before` })
    expect(tree).toHaveStyleRule('flex', 'initial', { modifier: `${containerCls} > .mega-layout-container-before` })
    // content after
    expect(tree).toHaveStyleRule('height', '32px', { modifier: `${containerCls} > .mega-layout-container-after` })
    expect(tree).toHaveStyleRule('font-size', '14px', { modifier: `${containerCls} > .mega-layout-container-after` })
    expect(tree).toHaveStyleRule('margin-left', 'NaNpx', { modifier: `${containerCls} > .mega-layout-container-after` })
    expect(tree).toHaveStyleRule('flex', 'initial', { modifier: `${containerCls} > .mega-layout-container-after` })
    // item
    expect(tree).toHaveStyleRule('display', 'flex', { modifier: itemCls })
    // item before
    expect(tree).toHaveStyleRule('margin-right', 'NaNpx', { modifier: `${itemCls} > .formily-mega-item-before` })
    expect(tree).toHaveStyleRule('height', '32px', { modifier: `${itemCls} > .formily-mega-item-before` })
    expect(tree).toHaveStyleRule('font-size', '14px', { modifier: `${itemCls} > .formily-mega-item-before` })
    expect(tree).toHaveStyleRule('flex', 'initial', { modifier: `${itemCls} > .formily-mega-item-before` })
    // item after
    expect(tree).toHaveStyleRule('margin-left', 'NaNpx', { modifier: `${itemCls} > .formily-mega-item-after` })
    expect(tree).toHaveStyleRule('height', '32px', { modifier: `${itemCls} > .formily-mega-item-after` })
    expect(tree).toHaveStyleRule('font-size', '14px', { modifier: `${itemCls} > .formily-mega-item-after` })
    expect(tree).toHaveStyleRule('flex', 'initial', { modifier: `${itemCls} > .formily-mega-item-after` })
  })

  test('gutter', () => {
    const styleResult = computeAntdStyleBase({ gutter: 20 })
    const Mega = styled.div`${styleResult.addonStyle}`
    const tree = renderer.create(<Mega />).toJSON()

    const containerCls = '& > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .mega-layout-container-wrapper'
    const itemCls = '& > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .mega-layout-item-content'

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


describe('test grid layout style',() => {
  test('normal', () => {
    let layoutProps = {
      gutter: 20,
      grid: true,
      enableSafeWidth: true,
    }
    const styleResult = computeAntdStyleBase(layoutProps)
    const Mega = styled.div`${styleResult.gridStyle}`
    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('width', '100%', { modifier: '& > .ant-form-item' })
    expect(tree).toHaveStyleRule('display', 'flex', { modifier: '& > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .mega-layout-container-wrapper' })
    expect(tree).toHaveStyleRule('display', 'flex', { modifier: '& > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .mega-layout-container-wrapper' })

    expect(tree).toHaveStyleRule('display', 'grid', { modifier: '& > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .mega-layout-container-wrapper > .mega-layout-container-content.grid' })
    expect(tree).toHaveStyleRule('display', 'grid', { modifier: '& > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .mega-layout-item-content > .mega-layout-container-content.grid' })

    expect(tree).toHaveStyleRule('grid-column-gap', '20px', { modifier: '& > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .mega-layout-container-wrapper > .mega-layout-container-content.grid' })
    expect(tree).toHaveStyleRule('grid-column-gap', '20px', { modifier: '& > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .mega-layout-item-content > .mega-layout-container-content.grid' })

    expect(tree).toHaveStyleRule('grid-row-gap', '20px', { modifier: '& > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .mega-layout-container-wrapper > .mega-layout-container-content.grid' })
    expect(tree).toHaveStyleRule('grid-row-gap', '20px', { modifier: '& > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .mega-layout-item-content > .mega-layout-container-content.grid' })
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
    const styleResult = computeAntdStyleBase(layoutProps)
    const Mega = styled.div`${styleResult.gridStyle}`
    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('grid-template-columns', `repeat(3,minmax(100px,1fr))`, 
    { modifier: `& > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .mega-layout-container-wrapper > .mega-layout-container-content.grid`,
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
    const styleResult = computeAntdStyleBase(layoutProps)
    const Mega = styled.div`${styleResult.gridStyle}`
    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('grid-template-columns', `repeat(${layoutProps.responsive.s},minmax(100px,1fr))`, 
    { modifier: `& > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .mega-layout-container-wrapper > .mega-layout-container-content.grid`,
      media: '(max-width:720px)'
    })
    expect(tree).toHaveStyleRule('grid-template-columns', `repeat(${layoutProps.responsive.m},minmax(100px,1fr))`, 
    { modifier: `& > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .mega-layout-container-wrapper > .mega-layout-container-content.grid`,
      media: '(min-width:720px) and (max-width:1200px)'
    })
    expect(tree).toHaveStyleRule('grid-template-columns', `repeat(${layoutProps.responsive.lg},minmax(100px,1fr))`, 
    { modifier: `& > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .mega-layout-container-wrapper > .mega-layout-container-content.grid`,
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
    const styleResult = computeAntdStyleBase(layoutProps)
    const Mega = styled.div`${styleResult.gridStyle}`
    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('grid-template-columns', `repeat(auto-fit,minmax(100px,1fr))`, 
    { modifier: `& > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .mega-layout-container-wrapper > .mega-layout-container-content.grid`,
      media: '(max-width:720px)'
    })
    expect(tree).toHaveStyleRule('grid-template-columns', `repeat(auto-fit,minmax(100px,1fr))`, 
    { modifier: `& > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .mega-layout-container-wrapper > .mega-layout-container-content.grid`,
      media: '(min-width:720px) and (max-width:1200px)'
    })
    expect(tree).toHaveStyleRule('grid-template-columns', `repeat(auto-fit,minmax(100px,1fr))`, 
    { modifier: `& > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .mega-layout-container-wrapper > .mega-layout-container-content.grid`,
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
    const styleResult = computeAntdStyleBase(layoutProps)
    const Mega = styled.div`${styleResult.gridStyle}`
    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('grid-template-columns', `repeat(1,1fr)`, 
    { modifier: `& > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .mega-layout-container-wrapper > .mega-layout-container-content.grid`,
      media: '(max-width:720px)'
    })
    expect(tree).toHaveStyleRule('grid-template-columns', `repeat(2,1fr)`, 
    { modifier: `& > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .mega-layout-container-wrapper > .mega-layout-container-content.grid`,
      media: '(min-width:720px) and (max-width:1200px)'
    })
    expect(tree).toHaveStyleRule('grid-template-columns', `repeat(3,1fr)`, 
    { modifier: `& > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .mega-layout-container-wrapper > .mega-layout-container-content.grid`,
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
    const styleResult = computeAntdStyleBase(layoutProps)
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
    const styleResult = computeAntdStyleBase(layoutProps)
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
    const styleResult = computeAntdStyleBase(layoutProps)
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

    const styleResult = computeAntdStyleBase(layoutProps)
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

    const styleResult = computeAntdStyleBase(layoutProps)
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
    const styleResult = computeAntdStyleBase(layoutProps)
    const Mega = styled.div`${styleResult.gridStyle}`
    const tree = renderer.create(<Mega />).toJSON();
    const cls = `& > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .mega-layout-container-wrapper > .mega-layout-container-content.grid`
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
    const styleResult = computeAntdStyleBase(layoutProps)
    const Mega = styled.div`
      ${styleResult.gridStyle}
      ${styleResult.nestLayoutItemStyle}
    `
    const tree = renderer.create(<Mega className="mega-layout-nest-container" />).toJSON();
    const cls = `& > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .mega-layout-container-wrapper > .mega-layout-container-content.grid`
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('grid-template-columns', `repeat(3,1fr)`, {
      modifier: `${cls}`,
    })

    expect(tree).toHaveStyleRule('grid-column-start', `span 2`, {
      modifier: '&.mega-layout-nest-container',
    })
  })
})

describe('default style',() => {
  test('default style', () => {
    const styleResult = computeAntdStyleBase({})
    const Mega = styled.div`${styleResult.defaultStyle}`
    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('display', 'flex')
    expect(tree).toHaveStyleRule('box-sizing', 'border-box')
    expect(tree).toHaveStyleRule('flex', 'initial', { modifier: '& > .ant-form-item-label' })
    expect(tree).toHaveStyleRule('flex', '1', { modifier: '& > .ant-form-item-control' })
  })
})

describe('inline style',() => {
  test('item', () => {
    const styleResult = computeAntdStyleBase({ inline: true })
    const Mega = styled.div`${styleResult.inlineStyle}`
    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('display', 'inline-block')
    expect(tree).toHaveStyleRule('vertical-align', 'top')
    expect(tree).toHaveStyleRule('display', 'inline-block', { modifier: '& > .ant-form-item-label' })
    expect(tree).toHaveStyleRule('vertical-align', 'top', { modifier: '& > .ant-form-item-label' })

    expect(tree).toHaveStyleRule('display', 'inline-block', { modifier: '& > .ant-form-item-control' })

    expect(tree).toHaveStyleRule('margin-right', 'undefinedpx', { modifier: '&:not(:last-child)' })
  })

  test('layout', () => {
    const styleResult = computeAntdStyleBase({ inline: true, isLayout: true })
    const Mega = styled.div`${styleResult.inlineStyle}`
    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('display', 'inline-block')
    expect(tree).toHaveStyleRule('vertical-align', 'top')
    expect(tree).toHaveStyleRule('display', 'inline-block', { modifier: '& > .ant-form-item-label' })
    expect(tree).toHaveStyleRule('vertical-align', 'top', { modifier: '& > .ant-form-item-label' })

    expect(tree).toHaveStyleRule('display', 'inline-block', { modifier: '& > .ant-form-item-control' })

    expect(tree).not.toHaveStyleRule('margin-right', 'undefinedpx', { modifier: '&:not(:last-child)' })
  })

  test('labelAlign:top item', () => {
    const styleResult = computeAntdStyleBase({ inline: true, labelAlign: 'top' })
    const Mega = styled.div`${styleResult.inlineStyle}`
    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('display', 'block', { modifier: '& > .ant-form-item-control' })
  })

  test('labelAlign:top layout', () => {
    const styleResult = computeAntdStyleBase({ inline: true, isLayout: true, labelAlign: 'top' })
    const Mega = styled.div`${styleResult.inlineStyle}`
    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('display', 'block', { modifier: '& > .ant-form-item-control' })
  })


  test('gutter item', () => {
    const styleResult = computeAntdStyleBase({ inline: true, gutter: '20px' })
    const Mega = styled.div`${styleResult.inlineStyle}`
    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('margin-right', '20px', { modifier: '&:not(:last-child)' })
  })
})

describe('width style',() => {
  test('only labelWidth', () => {
    const styleResult = computeAntdStyleBase({ labelWidth: '200px' })
    const Mega = styled.div`${styleResult.widthStyle}`
    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('display', 'flex')
    expect(tree).toHaveStyleRule('box-sizing', 'border-box')
    expect(tree).toHaveStyleRule('flex-direction', 'row')
    
    expect(tree).toHaveStyleRule('width', '200px', { modifier: '& > .ant-form-item-label' })
    expect(tree).toHaveStyleRule('max-width', '200px', { modifier: '& > .ant-form-item-label' })
    expect(tree).toHaveStyleRule('flex', '0 0 200px', { modifier: '& > .ant-form-item-label' })

    expect(tree).toHaveStyleRule('flex', '1', { modifier: '& > .ant-form-item-control' })
  })

  test('only wrapperWidth', () => {
    const styleResult = computeAntdStyleBase({ wrapperWidth: '200px' })
    const Mega = styled.div`${styleResult.widthStyle}`
    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('display', 'flex')
    expect(tree).toHaveStyleRule('box-sizing', 'border-box')
    expect(tree).toHaveStyleRule('flex-direction', 'row')
    
    expect(tree).toHaveStyleRule('width', '200px', { modifier: '& > .ant-form-item-control' })
    expect(tree).toHaveStyleRule('max-width', '200px', { modifier: '& > .ant-form-item-control' })
    expect(tree).toHaveStyleRule('flex', '0 0 200px', { modifier: '& > .ant-form-item-control' })

    // label比较特殊，不需要撑满适配，遵循next和antd的col实现
    expect(tree).not.toHaveStyleRule('flex', '1', { modifier: '& > .ant-form-item-label' })
  })

  test('labelWidth and wrapperWidth', () => {
    const styleResult = computeAntdStyleBase({ labelWidth: '100px', wrapperWidth: '200px' })
    const Mega = styled.div`${styleResult.widthStyle}`
    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('display', 'flex')
    expect(tree).toHaveStyleRule('box-sizing', 'border-box')
    expect(tree).toHaveStyleRule('flex-direction', 'row')

    expect(tree).toHaveStyleRule('width', '100px', { modifier: '& > .ant-form-item-label' })
    expect(tree).toHaveStyleRule('max-width', '100px', { modifier: '& > .ant-form-item-label' })
    expect(tree).toHaveStyleRule('flex', '0 0 100px', { modifier: '& > .ant-form-item-label' })
    
    expect(tree).toHaveStyleRule('width', '200px', { modifier: '& > .ant-form-item-control' })
    expect(tree).toHaveStyleRule('max-width', '200px', { modifier: '& > .ant-form-item-control' })
    expect(tree).toHaveStyleRule('flex', '0 0 200px', { modifier: '& > .ant-form-item-control' })    
  })

  test('labelAlign:top labelWidth and wrapperWidth', () => {
    const styleResult = computeAntdStyleBase({ labelAlign: 'top', labelWidth: '100px', wrapperWidth: '200px' })
    const Mega = styled.div`${styleResult.widthStyle}`
    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('display', 'flex')
    expect(tree).toHaveStyleRule('box-sizing', 'border-box')
    expect(tree).toHaveStyleRule('flex-direction', 'column')

    expect(tree).toHaveStyleRule('width', '100px', { modifier: '& > .ant-form-item-label' })
    expect(tree).toHaveStyleRule('max-width', '100px', { modifier: '& > .ant-form-item-label' })
    expect(tree).toHaveStyleRule('flex', 'initial', { modifier: '& > .ant-form-item-label' })
    
    expect(tree).toHaveStyleRule('width', '200px', { modifier: '& > .ant-form-item-control' })
    expect(tree).toHaveStyleRule('max-width', '200px', { modifier: '& > .ant-form-item-control' })
    expect(tree).toHaveStyleRule('flex', 'initial', { modifier: '& > .ant-form-item-control' })    
  })
})

describe('layoutMarginStyle',() => {
  test('default layout', () => {
    const styleResult = computeAntdStyleBase({ isLayout: true, })
    const Mega = styled.div`${styleResult.layoutMarginStyle}`
    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('margin-bottom', '0', { modifier: '> .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .mega-layout-container-wrapper > .mega-layout-container-content > .mega-layout-item:last-child' })
    expect(tree).toHaveStyleRule('margin-bottom', '0', { modifier: '> .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .mega-layout-container-wrapper > .mega-layout-container-content > .mega-layout-container:last-child' })
  })

  test('inline layout', () => {
    const styleResult = computeAntdStyleBase({ isLayout: true, inline: true })
    const Mega = styled.div`${styleResult.layoutMarginStyle}`
    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    
    expect(tree).toHaveStyleRule('margin-bottom', '0', { modifier: '> .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .mega-layout-container-wrapper > .mega-layout-container-content > .mega-layout-item-col > .mega-layout-item' })
    expect(tree).toHaveStyleRule('margin-bottom', '0', { modifier: '> .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .mega-layout-container-wrapper > .mega-layout-container-content > .mega-layout-item' })
    expect(tree).toHaveStyleRule('margin-bottom', '0', { modifier: '> .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .mega-layout-container-wrapper > .mega-layout-container-content > .mega-layout-container:last-child' })
  })

  test('grid layout', () => {
    const styleResult = computeAntdStyleBase({ isLayout: true, inline: true })
    const Mega = styled.div`${styleResult.layoutMarginStyle}`
    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    
    expect(tree).toHaveStyleRule('margin-bottom', '0', { modifier: '> .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .mega-layout-container-wrapper > .mega-layout-container-content > .mega-layout-item-col > .mega-layout-item' })
    expect(tree).toHaveStyleRule('margin-bottom', '0', { modifier: '> .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .mega-layout-container-wrapper > .mega-layout-container-content > .mega-layout-item' })
    expect(tree).toHaveStyleRule('margin-bottom', '0', { modifier: '> .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .mega-layout-container-wrapper > .mega-layout-container-content > .mega-layout-container:last-child' })
  })
})

describe('inset mode', () => {
  test('inset style', () => {
    const styleResult = computeAntdStyleBase({
      inset: true,
      isLayout: true
    });
    const Mega = styled.div`${styleResult.insetStyle}`
    const tree = renderer.create(<Mega />).toJSON()

    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('flex-direction', 'column', { modifier: `.mega-layout-item-inset` })
    expect(tree).toHaveStyleRule('flex-direction', 'column', { modifier: `.mega-layout-item-inset` })
    expect(tree).toHaveStyleRule('border-color', 'red', { modifier: `.mega-layout-item-inset-has-error .ant-form-item` })
    expect(tree).toHaveStyleRule('border-color', '#FF6A00', { modifier: `.mega-layout-item-inset-has-warning .ant-form-item` })
    expect(tree).toHaveStyleRule('color', 'red', { modifier: `.mega-layout-item-inset-has-error .mega-layout-item-inset-help` })
    expect(tree).toHaveStyleRule('color', '#FF6A00', { modifier: `.mega-layout-item-inset-has-warning .mega-layout-item-inset-help` })
    expect(tree).toHaveStyleRule('display', 'none', { modifier: `.ant-form-item-explain` })
    expect(tree).toHaveStyleRule('padding-left', '0', { modifier: `&.mega-layout-item .ant-form-item.ant-row` })
    expect(tree).toHaveStyleRule('border', 'none', { modifier: `&.mega-layout-item .ant-form-item.ant-row` })
  })

  test('inset style(hasBorder)', () => {
    const styleResult = computeAntdStyleBase({
      inset: true,
      isLayout: true,
      hasBorder: true,
    });
    const Mega = styled.div`${styleResult.insetStyle}`
    const tree = renderer.create(<Mega />).toJSON()

    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('padding-left', '12px', { modifier: `.ant-form-item.ant-row` })
    expect(tree).toHaveStyleRule('border', '1px solid #D8D8D8', { modifier: `.ant-form-item.ant-row` })
    expect(tree).toHaveStyleRule('border-radius', '4px', { modifier: `.ant-form-item.ant-row` })
  })

  test('inset style of component', () => {
    const styleResult = computeAntdStyleBase({
      inset: true,
      isLayout: true,
      hasBorder: true,
    });
    const Mega = styled.div`${styleResult.insetStyle}`
    const tree = renderer.create(<Mega />).toJSON()

    expect(tree).toMatchSnapshot()
    const prefix = `.ant-form-item.ant-row .mega-layout-item-content `
    expect(tree).toHaveStyleRule('border', 'none', { modifier: prefix + '.ant-picker' })
    expect(tree).toHaveStyleRule('border', 'none', { modifier: prefix + '.ant-select-single:not(.ant-select-customize-input) .ant-select-selector' })
    expect(tree).toHaveStyleRule('border', 'none', { modifier: prefix + '.ant-select-selector' })
    expect(tree).toHaveStyleRule('border', 'none', { modifier: prefix + '.ant-picker-input input' })
    expect(tree).toHaveStyleRule('border', 'none', { modifier: prefix + '.ant-input-number' })
    expect(tree).toHaveStyleRule('border', 'none', { modifier: prefix + '.ant-time-picker-input' })
    expect(tree).toHaveStyleRule('border', 'none', { modifier: prefix + '.ant-select-selection' })
    expect(tree).toHaveStyleRule('border', 'none', { modifier: prefix + '.ant-input' })

    expect(tree).toHaveStyleRule('box-shadow', 'none', { modifier: prefix + '.ant-picker' })
    expect(tree).toHaveStyleRule('box-shadow', 'none', { modifier: prefix + '.ant-select-single:not(.ant-select-customize-input) .ant-select-selector' })
    expect(tree).toHaveStyleRule('box-shadow', 'none', { modifier: prefix + '.ant-select-selector' })
    expect(tree).toHaveStyleRule('box-shadow', 'none', { modifier: prefix + '.ant-picker-input input' })
    expect(tree).toHaveStyleRule('box-shadow', 'none', { modifier: prefix + '.ant-input-number' })
    expect(tree).toHaveStyleRule('box-shadow', 'none', { modifier: prefix + '.ant-time-picker-input' })
    expect(tree).toHaveStyleRule('box-shadow', 'none', { modifier: prefix + '.ant-select-selection' })
    expect(tree).toHaveStyleRule('box-shadow', 'none', { modifier: prefix + '.ant-input' })

    expect(tree).toHaveStyleRule('width', '100%', { modifier: prefix + '.ant-picker' })
    expect(tree).toHaveStyleRule('padding-right', '0', { modifier: prefix + '.ant-picker' })
    expect(tree).toHaveStyleRule('padding-left', '0', { modifier: prefix + '.ant-checkbox-group' })
    expect(tree).toHaveStyleRule('padding-right', '11px', { modifier: prefix + '.ant-picker-range' })
    expect(tree).toHaveStyleRule('padding', '0 11px', { modifier: prefix + '.ant-picker-input' })
    expect(tree).toHaveStyleRule('display', 'flex', { modifier: prefix + '.ant-picker-range' })
    expect(tree).toHaveStyleRule('display', 'flex', { modifier: prefix + '.ant-picker-input' })
    expect(tree).toHaveStyleRule('flex', '1', { modifier: prefix + '.ant-picker-range .ant-picker-input' })
    expect(tree).toHaveStyleRule('flex', 'initial', { modifier: prefix + '.ant-picker-input .ant-picker-suffix' })
    expect(tree).toHaveStyleRule('flex', '1', { modifier: prefix + '.ant-picker-input > input' })
  })

  test('item inset style(hasBorder)', () => {
    const styleResult = computeAntdStyleBase({
      inset: true,
      isLayout: false,
      hasBorder: false,
    });
    const Mega = styled.div`${styleResult.insetStyle}`
    const tree = renderer.create(<Mega />).toJSON()

    expect(tree).toMatchSnapshot()    
    expect(tree).toHaveStyleRule('padding-left', '0', { modifier: `&.mega-layout-item .ant-form-item.ant-row` })
    expect(tree).toHaveStyleRule('border', 'none', { modifier: `&.mega-layout-item .ant-form-item.ant-row` })
    expect(tree).not.toHaveStyleRule('display', 'none', { modifier: `.ant-form-item-explain` })
    expect(tree).not.toHaveStyleRule('flex-direction', 'column', { modifier: `.mega-layout-item-inset` })
    expect(tree).not.toHaveStyleRule('flex-direction', 'column', { modifier: `.mega-layout-item-inset` })
    expect(tree).not.toHaveStyleRule('border-color', 'red', { modifier: `.mega-layout-item-inset-has-error .ant-form-item` })
    expect(tree).not.toHaveStyleRule('border-color', '#FF6A00', { modifier: `.mega-layout-item-inset-has-warning .ant-form-item` })
    expect(tree).not.toHaveStyleRule('color', 'red', { modifier: `.mega-layout-item-inset-has-error .mega-layout-item-inset-help` })
    expect(tree).not.toHaveStyleRule('color', '#FF6A00', { modifier: `.mega-layout-item-inset-has-warning .mega-layout-item-inset-help` })
    expect(tree).not.toHaveStyleRule('display', 'none', { modifier: `.ant-form-item-explain` })
  })
})
