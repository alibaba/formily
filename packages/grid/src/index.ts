import { define, observable, batch, reaction } from '@formily/reactive'
import { ChildListMutationObserver } from './observer'
import { ResizeObserver } from '@juggle/resize-observer'
export interface IGridOptions {
  maxRows?: number
  maxColumns?: number | number[]
  minColumns?: number | number[]
  maxWidth?: number | number[]
  minWidth?: number | number[]
  breakpoints?: number[]
  columnGap?: number
  rowGap?: number
  colWrap?: boolean
  strictAutoFit?: boolean
  shouldVisible?: (node: GridNode, grid: Grid<HTMLElement>) => boolean
  onDigest?: (grid: Grid<HTMLElement>) => void
  onInitialized?: (grid: Grid<HTMLElement>) => void
}

const SpanRegExp = /span\s*(\d+)/

const isValid = (value: any) => value !== undefined && value !== null

const calcBreakpointIndex = (breakpoints: number[], width: number) => {
  if (Array.isArray(breakpoints)) {
    for (let i = 0; i < breakpoints.length; i++) {
      if (width <= breakpoints[i]) {
        return i
      }
    }
  }
  return -1
}

const calcFactor = <T>(value: T | T[], breakpointIndex: number): T => {
  if (Array.isArray(value)) {
    if (breakpointIndex === -1) return value[0]
    return value[breakpointIndex] ?? value[value.length - 1]
  } else {
    return value
  }
}

const parseGridNode = (elements: HTMLCollection): GridNode[] => {
  return Array.from(elements).reduce((buf, element: HTMLElement, index) => {
    const style = getComputedStyle(element)
    const visible = !(style.display === 'none')
    const origin = element.getAttribute('data-grid-span')
    const span = parseSpan(style.gridColumnStart) ?? 1
    const originSpan = Number(origin ?? span)
    const node: GridNode = {
      index,
      span,
      visible,
      originSpan,
      element,
    }
    if (!origin) {
      element.setAttribute('data-grid-span', String(span))
    }
    return buf.concat(node)
  }, [])
}

const calcChildTotalColumns = (nodes: GridNode[], shadow = false) =>
  nodes.reduce((buf, node) => {
    if (!shadow) {
      if (!node.visible) return buf
    }
    if (node.originSpan === -1) return buf + (node.span ?? 1)
    return buf + node.span
  }, 0)

const calcChildOriginTotalColumns = (nodes: GridNode[], shadow = false) =>
  nodes.reduce((buf, node) => {
    if (!shadow) {
      if (!node.visible) return buf
    }
    if (node.originSpan === -1) return buf + (node.span ?? 1)
    return buf + node.originSpan
  }, 0)

const calcSatisfyColumns = (
  width: number,
  maxColumns: number,
  minColumns: number,
  maxWidth: number,
  minWidth: number,
  gap: number
) => {
  const results = []
  for (let columns = minColumns; columns <= maxColumns; columns++) {
    const innerWidth = width - (columns - 1) * gap
    const columnWidth = innerWidth / columns
    if (columnWidth >= minWidth && columnWidth <= maxWidth) {
      results.push(columns)
    } else if (columnWidth < minWidth) {
      results.push(Math.min(Math.floor(innerWidth / minWidth), maxColumns))
    } else if (columnWidth > maxWidth) {
      results.push(Math.min(Math.floor(innerWidth / maxWidth), maxColumns))
    }
  }
  return Math.max(...results)
}

const parseSpan = (gridColumnStart: string) => {
  return Number(String(gridColumnStart).match(SpanRegExp)?.[1] ?? 1)
}

const factor = <T>(value: T | T[], grid: Grid<HTMLElement>): T =>
  isValid(value) ? calcFactor(value as any, grid.breakpoint) : value

const resolveChildren = (grid: Grid<HTMLElement>) => {
  let walked = 0,
    shadowWalked = 0,
    rowIndex = 0,
    shadowRowIndex = 0
  if (!grid.ready) return
  grid.children = grid.children.map((node) => {
    const columnIndex = walked % grid.columns
    const shadowColumnIndex = shadowWalked % grid.columns
    const remainColumns = grid.columns - columnIndex
    const originSpan = node.originSpan
    const targetSpan = originSpan > grid.columns ? grid.columns : originSpan
    const span = grid.options.strictAutoFit
      ? targetSpan
      : targetSpan > remainColumns
      ? remainColumns
      : targetSpan
    const gridColumn =
      originSpan === -1 ? `span ${remainColumns} / -1` : `span ${span} / auto`
    if (node.element.style.gridColumn !== gridColumn) {
      node.element.style.gridColumn = gridColumn
    }
    if (node.visible) {
      walked += span
    }
    shadowWalked += span
    if (columnIndex === 0) {
      rowIndex++
    }
    if (shadowColumnIndex == 0) {
      shadowRowIndex++
    }
    node.shadowRow = shadowRowIndex
    node.shadowColumn = shadowColumnIndex + 1
    if (node.visible) {
      node.row = rowIndex
      node.column = columnIndex + 1
    }
    if (grid.options?.shouldVisible) {
      if (!grid.options.shouldVisible(node, grid)) {
        if (node.visible) {
          node.element.style.display = 'none'
        }
        node.visible = false
      } else {
        if (!node.visible) {
          node.element.style.display = ''
        }
        node.visible = true
      }
    }
    return node
  })
}

const nextTick = (callback?: () => void) => Promise.resolve(0).then(callback)

export type GridNode = {
  index?: number
  visible?: boolean
  column?: number
  shadowColumn?: number
  row?: number
  shadowRow?: number
  span?: number
  originSpan?: number
  element?: HTMLElement
}
export class Grid<Container extends HTMLElement> {
  options: IGridOptions
  width = 0
  height = 0
  container: Container
  children: GridNode[] = []
  childTotalColumns = 0
  shadowChildTotalColumns = 0
  childOriginTotalColumns = 0
  shadowChildOriginTotalColumns = 0
  ready = false
  constructor(options?: IGridOptions) {
    this.options = {
      breakpoints: [720, 1280, 1920],
      columnGap: 8,
      rowGap: 4,
      minWidth: 100,
      colWrap: true,
      strictAutoFit: false,
      ...options,
    }
    define(this, {
      options: observable.shallow,
      width: observable.ref,
      height: observable.ref,
      ready: observable.ref,
      children: observable.ref,
      childOriginTotalColumns: observable.ref,
      shadowChildOriginTotalColumns: observable.ref,
      shadowChildTotalColumns: observable.ref,
      childTotalColumns: observable.ref,
      columns: observable.computed,
      templateColumns: observable.computed,
      gap: observable.computed,
      maxColumns: observable.computed,
      minColumns: observable.computed,
      maxWidth: observable.computed,
      minWidth: observable.computed,
      breakpoints: observable.computed,
      breakpoint: observable.computed,
      rowGap: observable.computed,
      columnGap: observable.computed,
      colWrap: observable.computed,
    })
  }

  set breakpoints(breakpoints) {
    this.options.breakpoints = breakpoints
  }

  get breakpoints() {
    return this.options.breakpoints
  }

  get breakpoint() {
    return calcBreakpointIndex(this.options.breakpoints, this.width)
  }

  set maxWidth(maxWidth) {
    this.options.maxWidth = maxWidth
  }

  get maxWidth() {
    return factor(this.options.maxWidth, this) ?? Infinity
  }

  set minWidth(minWidth) {
    this.options.minWidth = minWidth
  }

  get minWidth() {
    return factor(this.options.minWidth, this) ?? 100
  }

  set maxColumns(maxColumns) {
    this.options.maxColumns = maxColumns
  }

  get maxColumns() {
    return factor(this.options.maxColumns, this) ?? Infinity
  }

  set maxRows(maxRows) {
    this.options.maxRows = maxRows
  }

  get maxRows() {
    return this.options.maxRows ?? Infinity
  }

  set minColumns(minColumns) {
    this.options.minColumns = minColumns
  }

  get minColumns() {
    return factor(this.options.minColumns, this) ?? 1
  }

  set rowGap(rowGap) {
    this.options.rowGap = rowGap
  }

  get rowGap() {
    return factor(this.options.rowGap, this) ?? 5
  }

  set columnGap(columnGap) {
    this.options.columnGap = columnGap
  }

  get columnGap() {
    return factor(this.options.columnGap, this) ?? 10
  }

  set colWrap(colWrap) {
    this.options.colWrap = colWrap
  }

  get colWrap() {
    return factor(this.options.colWrap, this) ?? true
  }

  get columns() {
    if (!this.ready) return 0

    const originTotalColumns = this.childOriginTotalColumns

    if (this.colWrap === false) {
      return originTotalColumns
    }

    const baseColumns = this.childSize

    const strictMaxWidthColumns = Math.round(
      this.width / (this.maxWidth + this.columnGap)
    )

    const looseMaxWidthColumns = Math.min(
      originTotalColumns,
      strictMaxWidthColumns
    )

    const maxWidthColumns = this.options.strictAutoFit
      ? strictMaxWidthColumns
      : looseMaxWidthColumns

    const strictMinWidthColumns = Math.round(
      this.width / (this.minWidth + this.columnGap)
    )

    const looseMinWidthColumns = Math.min(
      originTotalColumns,
      strictMinWidthColumns
    )

    const minWidthColumns = this.options.strictAutoFit
      ? strictMinWidthColumns
      : looseMinWidthColumns

    const minCalculatedColumns = Math.min(
      baseColumns,
      originTotalColumns,
      maxWidthColumns,
      minWidthColumns
    )

    const maxCalculatedColumns = Math.max(
      baseColumns,
      originTotalColumns,
      maxWidthColumns,
      minWidthColumns
    )

    const finalColumns = calcSatisfyColumns(
      this.width,
      maxCalculatedColumns,
      minCalculatedColumns,
      this.maxWidth,
      this.minWidth,
      this.columnGap
    )
    if (finalColumns >= this.maxColumns) {
      return this.maxColumns
    }
    if (finalColumns <= this.minColumns) {
      return this.minColumns
    }
    return finalColumns
  }

  get rows() {
    return Math.ceil(this.childTotalColumns / this.columns)
  }

  get shadowRows() {
    return Math.ceil(this.shadowChildTotalColumns / this.columns)
  }

  get templateColumns() {
    if (!this.width) return ''
    if (this.maxWidth === Infinity) {
      return `repeat(${this.columns},minmax(0,1fr))`
    }
    if (this.options.strictAutoFit !== true) {
      const columnWidth =
        (this.width - (this.columns - 1) * this.columnGap) / this.columns
      if (columnWidth < this.minWidth || columnWidth > this.maxWidth) {
        return `repeat(${this.columns},minmax(0,1fr))`
      }
    }
    return `repeat(${this.columns},minmax(${this.minWidth}px,${this.maxWidth}px))`
  }

  get gap() {
    return `${this.rowGap}px ${this.columnGap}px`
  }

  get childSize() {
    return this.children.length
  }

  get fullnessLastColumn() {
    return this.columns === this.children[this.childSize - 1]?.span
  }

  connect = (container: Container) => {
    if (container) {
      this.container = container
      const initialize = batch.bound(() => {
        digest()
        this.ready = true
      })
      const digest = batch.bound(() => {
        this.children = parseGridNode(this.container.children)
        this.childTotalColumns = calcChildTotalColumns(this.children)
        this.shadowChildTotalColumns = calcChildTotalColumns(
          this.children,
          true
        )
        this.childOriginTotalColumns = calcChildOriginTotalColumns(
          this.children
        )
        this.shadowChildOriginTotalColumns = calcChildOriginTotalColumns(
          this.children,
          true
        )
        const rect = this.container.getBoundingClientRect()
        if (rect.width && rect.height) {
          this.width = rect.width
          this.height = rect.height
        }
        resolveChildren(this)
        nextTick(() => {
          this.options?.onDigest?.(this)
        })
        if (!this.ready) {
          nextTick(() => {
            this.options?.onInitialized?.(this)
          })
        }
      })
      const mutationObserver = new ChildListMutationObserver(digest)
      const resizeObserver = new ResizeObserver(digest)
      const dispose = reaction(() => ({ ...this.options }), digest)
      resizeObserver.observe(this.container)
      mutationObserver.observe(this.container, {
        attributeFilter: ['data-grid-span'],
        attributes: true,
      })
      initialize()
      return () => {
        resizeObserver.unobserve(this.container)
        resizeObserver.disconnect()
        mutationObserver.disconnect()
        dispose()
        this.children = []
      }
    }

    return () => {}
  }

  static id = (options: IGridOptions = {}) =>
    JSON.stringify(
      [
        'maxRows',
        'maxColumns',
        'minColumns',
        'maxWidth',
        'minWidth',
        'breakpoints',
        'columnGap',
        'rowGap',
        'colWrap',
        'strictAutoFit',
      ].map((key) => options[key])
    )
}
