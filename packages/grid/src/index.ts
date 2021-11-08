import { define, observable, batch } from '@formily/reactive'

export interface IGridOptions {
  maxColumns?: number | number[]
  minColumns?: number | number[]
  maxWidth?: number | number[]
  minWidth?: number | number[]
  breakpoints?: number[]
  columnGap?: number
  rowGap?: number
  colWrap?: boolean
  strictAutoFit?: boolean
  onDigest?: (grid: Grid<HTMLElement>) => void
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
  let index = 0
  return Array.from(elements).map((element) => {
    const style = getComputedStyle(element)
    const origin = element.getAttribute('data-origin-span')
    const span = parseSpan(style.gridColumnStart) ?? 1
    const originSpan = Number(origin ?? span)
    if (!origin) {
      element.setAttribute('data-origin-span', String(span))
    }
    const start = index
    const end = (index += span) - 1
    return {
      start,
      end,
      span,
      originSpan,
      element,
    }
  })
}

const calcChildTotalColumns = (nodes: GridNode[]) =>
  nodes.reduce((buf, node) => buf + node.span, 0)

const calcChildOriginTotalColumns = (nodes: GridNode[]) =>
  nodes.reduce((buf, node) => buf + node.originSpan, 0)

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

export type GridNode = {
  start?: number
  end?: number
  span?: number
  originSpan?: number
  element?: Element
}
export class Grid<Container extends HTMLElement> {
  options: IGridOptions
  width = 0
  height = 0
  container: Container
  children: GridNode[] = []
  childTotalColumns = 0
  childOriginTotalColumns = 0
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
      width: observable.ref,
      height: observable.ref,
      ready: observable.ref,
      children: observable.ref,
      childTotalColumns: observable.ref,
      columns: observable.computed,
      templateColumns: observable.computed,
      gap: observable.computed,
    })
  }

  get breakpoint() {
    return calcBreakpointIndex(this.options.breakpoints, this.width)
  }

  get maxWidth() {
    return factor(this.options.maxWidth, this) ?? Infinity
  }

  get minWidth() {
    return factor(this.options.minWidth, this) ?? 100
  }

  get maxColumns() {
    return factor(this.options.maxColumns, this) ?? Infinity
  }

  get minColumns() {
    return factor(this.options.minColumns, this) ?? 1
  }

  get rowGap() {
    return factor(this.options.rowGap, this) ?? 5
  }

  get columnGap() {
    return factor(this.options.columnGap, this) ?? 10
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

    const maxWidthColumns = Math.min(
      originTotalColumns,
      Math.round(this.width / (this.maxWidth + this.columnGap))
    )

    const minWidthColumns = Math.min(
      originTotalColumns,
      Math.round(this.width / (this.minWidth + this.columnGap))
    )

    const minCalculatedColumns = Math.min(
      baseColumns,
      maxWidthColumns,
      minWidthColumns
    )

    const maxCalculatedColumns = Math.max(
      baseColumns,
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

  get templateColumns() {
    if (!this.width) return ''
    if (this.maxWidth === Infinity) {
      return `repeat(${this.columns},1fr)`
    }
    if (this.options.strictAutoFit !== true) {
      const columnWidth =
        (this.width - (this.columns - 1) * this.columnGap) / this.columns
      if (columnWidth < this.minWidth || columnWidth > this.maxWidth) {
        return `repeat(${this.columns},1fr)`
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

  connect = (container: Container) => {
    if (container) {
      this.container = container
      const initialize = batch.bound(() => {
        digest()
        this.ready = true
      })
      const digest = batch.bound(() => {
        this.children = parseGridNode(this.container.children)
        this.childTotalColumns = calcChildOriginTotalColumns(this.children)
        this.childOriginTotalColumns = calcChildTotalColumns(this.children)
        const rect = this.container.getBoundingClientRect()
        if (rect.width && rect.height) {
          this.width = rect.width
          this.height = rect.height
        }
        this.options?.onDigest?.(this)
      })
      const mutationObserver = new MutationObserver(digest)
      const resizeObserver = new ResizeObserver(digest)
      resizeObserver.observe(this.container)
      mutationObserver.observe(this.container, {
        attributeFilter: ['style'],
        attributes: true,
        childList: true,
      })
      initialize()
      return () => {
        resizeObserver.unobserve(this.container)
        resizeObserver.disconnect()
        mutationObserver.disconnect()
        this.children = []
      }
    }

    return () => {}
  }

  calcGridSpan = (span: number) => {
    if (!this.ready) {
      return span
    }
    if (span === -1) {
      const prevOriginTotalColumns = this.childOriginTotalColumns - 1
      const prevTotalColumns = this.childTotalColumns - 1
      const remainTotalColumns = this.columns - prevOriginTotalColumns
      const remainOriginTotalColumns = this.columns - prevTotalColumns
      const minRemainTotalColumns = Math.max(
        remainTotalColumns,
        remainOriginTotalColumns
      )
      if (minRemainTotalColumns < 0) return 1
      return minRemainTotalColumns > 0 ? minRemainTotalColumns : this.columns
    }
    return this.columns < span ? this.columns : span
  }

  static id = (options: IGridOptions = {}) =>
    JSON.stringify(
      Object.keys(options)
        .sort()
        .map((key) => options[key])
    )
}
