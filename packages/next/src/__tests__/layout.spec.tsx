import React from 'react'
import styled from 'styled-components'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { computeNextStyleBase } from '../../src/components/FormMegaLayout/style'

describe('test label-align style',() => {
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

describe('test addon style',() => {
  test('normal', () => {
    const styleResult = computeNextStyleBase({});
    const Mega = styled.div`${styleResult.addonStyle}`
    const tree = renderer.create(<Mega />).toJSON()

    const containerCls = '& > .next-form-item-control > .mega-layout-container-wrapper'
    const itemCls = '& > .next-form-item-control > .mega-layout-item-content'

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


describe('test grid layout style',() => {
  test('normal', () => {
    let layoutProps = {
      gutter: 20,
      grid: true
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

  test('gridStyle autoRow', () => {
    let layoutProps = {
      gutter: 20,
      autoRow: true,
      responsive: { s: 1, m: 2, lg: 3 },
      context: {},
      grid: true
    }
    const styleResult = computeNextStyleBase(layoutProps)
    const Mega = styled.div`${styleResult.gridStyle}`
    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('grid-template-columns', `repeat(${layoutProps.responsive.s},minmax(100px,1fr))`, 
    { modifier: `& > .next-form-item-control > .mega-layout-container-wrapper > .mega-layout-container-content.grid`,
      media: '(max-width:720px)'
    })
    expect(tree).toHaveStyleRule('grid-template-columns', `repeat(${layoutProps.responsive.m},minmax(100px,1fr))`, 
    { modifier: `& > .next-form-item-control > .mega-layout-container-wrapper > .mega-layout-container-content.grid`,
      media: '(min-width:720px ) and (max-width:1200px )'
    })
    expect(tree).toHaveStyleRule('grid-template-columns', `repeat(${layoutProps.responsive.lg},minmax(100px,1fr))`, 
    { modifier: `& > .next-form-item-control > .mega-layout-container-wrapper > .mega-layout-container-content.grid`,
      media: '(min-width:1200px )'
    })
  })

  test('gridStyle autoRow', () => {
    let layoutProps = {
      gutter: 20,
      autoRow: false,
      responsive: { s: 1, m: 2, lg: 3 },
      context: {},
      grid: true
    }
    const styleResult = computeNextStyleBase(layoutProps)
    const Mega = styled.div`${styleResult.gridStyle}`
    const tree = renderer.create(<Mega />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('grid-template-columns', `repeat(auto-fit,minmax(100px,1fr))`, 
    { modifier: `& > .next-form-item-control > .mega-layout-container-wrapper > .mega-layout-container-content.grid`,
      media: '(max-width:720px)'
    })
    expect(tree).toHaveStyleRule('grid-template-columns', `repeat(auto-fit,minmax(100px,1fr))`, 
    { modifier: `& > .next-form-item-control > .mega-layout-container-wrapper > .mega-layout-container-content.grid`,
      media: '(min-width:720px ) and (max-width:1200px )'
    })
    expect(tree).toHaveStyleRule('grid-template-columns', `repeat(auto-fit,minmax(100px,1fr))`, 
    { modifier: `& > .next-form-item-control > .mega-layout-container-wrapper > .mega-layout-container-content.grid`,
      media: '(min-width:1200px )'
    })
  })
})
