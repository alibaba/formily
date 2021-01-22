import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import baseConfig from '../../scripts/rollup.base'
import path from 'path'

export default [
  ...baseConfig('formily.vue', 'Formily.Vue'),
  {
    input: 'src/index.ts',
    output: {
      format: 'esm',
      file: 'esm/index.js',
      name: 'Formily.Vue',
    },
    external: ['vue', '@vue/composition-api', 'mobx', '@formily/core'],
    plugins: [
      typescript({
        tsconfig: path.resolve(__dirname, 'tsconfig.json'),
      }),
      vue(),
      resolve(),
      commonjs(),
    ],
  },
  // Browser build.
  {
    input: 'src/index.ts',
    output: {
      format: 'cjs',
      file: 'lib/index.js',
      name: 'Formily.Vue',
    },
    external: ['vue', '@vue/composition-api', 'mobx', '@formily/core'],
    plugins: [
      typescript({
        tsconfig: path.resolve(__dirname, 'tsconfig.json'),
      }),
      vue(),
      resolve(),
      commonjs(),
    ],
  },
]
