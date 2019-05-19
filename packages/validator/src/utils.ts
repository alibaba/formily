export * from '@uform/utils'

const formatRegExp = /%[sdj%]/g

export function format(...args: any[]) {
  let i = 1
  const f = args[0]
  const len = args.length
  if (typeof f === 'function') {
    return f.apply(null, args.slice(1))
  }
  if (typeof f === 'string') {
    const str = String(f).replace(formatRegExp, (x: string) => {
      if (x === '%%') {
        return '%'
      }
      if (i >= len) {
        return x
      }
      switch (x) {
        case '%s':
          return String(args[i++])
        case '%d':
          return Number(args[i++]) + ''
        case '%j':
          try {
            return JSON.stringify(args[i++])
          } catch (_) {
            return '[Circular]'
          }
        default:
          return x
      }
    })
    return str
  }
  return f
}
