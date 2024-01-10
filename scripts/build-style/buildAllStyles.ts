import typescript from 'rollup-plugin-typescript2'
import { build, getRollupBasePlugin } from './helper'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const buildAllStyles = async (outputFile: string) => {
  await build({
    input: 'src/style.ts',
    output: {
      file: outputFile,
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
        tsconfigOverride: {
          compilerOptions: {
            module: 'ESNext',
            declaration: false,
          },
        },
      }),
      ...getRollupBasePlugin(),
    ],
  })
}
