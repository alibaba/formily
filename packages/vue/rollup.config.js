import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import path from 'path'

export default [
  // ESM build to be used with webpack/rollup.
  {
    input: 'src/index.ts',
    output: {
      format: 'esm',
      file: 'esm/index.js',
      name: 'formily'
    },
    external: ['vue', '@vue/composition-api', 'mobx'],
    plugins: [
      typescript({
        tsconfig: path.resolve(__dirname, 'tsconfig.json')
      }),
      vue(),
      resolve(),
      commonjs()
    ]
  },
  // Browser build.
  {
    input: 'src/index.ts',
    output: {
      format: 'cjs',
      file: 'lib/index.js',
      name: 'formily'
    },
    external: ['vue', '@vue/composition-api', 'mobx'],
    plugins: [
      typescript({
        tsconfig: path.resolve(__dirname, 'tsconfig.json')
      }),
      vue(),
      resolve(),
      commonjs()
    ]
  }
]