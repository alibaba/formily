import { runCopy, CopyBaseOptions } from './copy'
import { buildAllStyles } from './buildAllStyles'
import { buildStyle, BuildStyleOptions } from './buildStyle'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function build({
  allStylesOutputFile,
  ...opts
}: CopyBaseOptions &
  Omit<BuildStyleOptions, 'filename'> & { allStylesOutputFile: string }) {
  return Promise.all([
    buildAllStyles(allStylesOutputFile),
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
