import { runCopy, CopyBaseOptions } from './copy'
import { buildAllStyles } from './buildAllStyles'
import { buildStyle, BuildStyleOptions } from './buildStyle'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function build(
  opts: CopyBaseOptions & Omit<BuildStyleOptions, 'filename'>
) {
  return Promise.all([
    buildAllStyles(),
    runCopy({
      ...opts,
      resolveForItem: (filename) => {
        if (/\/style\.ts$/.test(filename)) {
          buildStyle({ ...opts, filename })
        }
      },
    }),
  ])
}
