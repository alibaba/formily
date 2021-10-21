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

const isHTMLElement = (node: Node): node is HTMLElement => node?.nodeType === 1

const calcFactor = <T>(value: T | T[], breakpointIndex: number): T => {
  if (Array.isArray(value)) {
    if (breakpointIndex === -1) return value[0]
    return value[breakpointIndex] ?? value[value.length - 1]
  } else {
    return value
  }
}

const calcChildSpans = (nodes: HTMLElement[]) =>
  nodes.reduce((buf, node) => {
    const style = getComputedStyle(node)
    return buf + parseSpan(style.gridColumnStart)
  }, 0)

const calcChildOriginSpans = (nodes: HTMLElement[]) =>
  nodes.reduce((buf, node) => {
    const style = getComputedStyle(node)
    const origin = node.getAttribute('data-origin-span')
    const current = parseSpan(style.gridColumnStart)
    const span = Number(node.getAttribute('data-origin-span') ?? current)
    if (!origin) {
      node.setAttribute('data-origin-span', current as any)
    }
    return buf + span
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
      results.push(Math.floor(innerWidth / minWidth))
    } else if (columnWidth > maxWidth) {
      results.push(Math.floor(innerWidth / maxWidth))
    }
  }
  return Math.max(...results)
}

const parseSpan = (gridColumnStart: string) => {
  return Number(String(gridColumnStart).match(SpanRegExp)?.[1] ?? 1)
}

const factor = <T>(value: T | T[], grid: Grid<HTMLElement>): T =>
  isValid(value) ? calcFactor(value as any, grid.breakpoint) : value

export class Grid<Container extends HTMLElement> {
  options: IGridOptions
  width = 0
  height = 0
  container: Container
  childCount = 0
  childSpans = 0
  childOriginSpans = 0
  ready = false
  constructor(options?: IGridOptions) {
    this.options = {
      breakpoints: [720, 1280, 1920],
      columnGap: 8,
      rowGap: 4,
      minWidth: 100,
      colWrap: true,
      ...options,
    }
    define(this, {
      width: observable.ref,
      height: observable.ref,
      ready: observable.ref,
      childCount: observable.ref,
      childSpans: observable.ref,
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

    const spanColumns = this.childOriginSpans

    if (this.colWrap === false) {
      return spanColumns
    }

    const baseColumns = this.childCount

    const maxWidthColumns = Math.min(
      spanColumns,
      Math.round(this.width / (this.maxWidth + this.columnGap))
    )

    const minWidthColumns = Math.min(
      spanColumns,
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

  get templateColumns() {
    if (!this.width) return ''
    if (this.maxWidth === Infinity) {
      return `repeat(${this.columns},1fr)`
    }
    const columnWidth =
      (this.width - (this.columns - 1) * this.columnGap) / this.columns
    if (columnWidth < this.minWidth || columnWidth > this.maxWidth)
      return `repeat(${this.columns},1fr)`
    return `repeat(${this.columns},minmax(${this.minWidth}px,${this.maxWidth}px))`
  }

  get gap() {
    return `${this.rowGap}px ${this.columnGap}px`
  }

  connect = (container: Container) => {
    if (container) {
      this.container = container
      const initialize = batch.bound(() => {
        digestChild()
        digestSize()
        this.ready = true
      })
      const digestChild = batch.bound(() => {
        const children = Array.from(this.container.children) as HTMLElement[]
        const childCount = children.length
        const childOriginSpans = calcChildOriginSpans(children)
        const childSpans = calcChildSpans(children)
        if (this.childCount !== childCount) {
          this.childCount = childCount
        }
        if (this.childSpans !== childSpans) {
          this.childSpans = childSpans
        }
        if (this.childOriginSpans !== childOriginSpans) {
          this.childOriginSpans = childOriginSpans
        }
      })
      const digestSize = batch.bound(() => {
        const rect = this.container.getBoundingClientRect()
        if (this.width !== rect.width) {
          this.width = rect.width
        }
        if (this.height !== rect.height) {
          this.height = rect.height
        }
      })
      const mutationObserver = new MutationObserver(() => {
        requestAnimationFrame(digestChild)
      })
      const resizeObserver = new ResizeObserver(() => {
        requestAnimationFrame(digestSize)
      })
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
      }
    }

    return () => {}
  }

  calcGridSpan = (span: number) => {
    if (!this.ready) {
      return span
    }
    if (span === -1) {
      const prevOriginSpans = this.childOriginSpans - 1
      const prevSpans = this.childSpans - 1
      const remainSpans = this.columns - prevOriginSpans
      const remainOriginSpans = this.columns - prevSpans
      const minRemainSpans = Math.max(remainSpans, remainOriginSpans)
      if (minRemainSpans < 0) return 1
      return minRemainSpans > 0 ? minRemainSpans : this.columns
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
