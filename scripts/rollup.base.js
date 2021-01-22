import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import path from 'path'
import commonjs from '@rollup/plugin-commonjs'
import externalGlobals from 'rollup-plugin-external-globals'
import vue from 'rollup-plugin-vue'
import { uglify } from 'rollup-plugin-uglify'

const plugins = [
  typescript({
    tsconfig: './tsconfig.json',
    tsconfigOverride: {
      module: 'ESNext',
      compilerOptions: { declaration: false },
    },
  }),
  vue(),
  resolve(),
  commonjs(),
  externalGlobals({
    vue: 'Vue',
    react: 'React',
    mobx: 'mobx',
    'mobx-react-lite': 'mobxReactLite',
    'react-dom': 'ReactDOM',
    '@vue/composition-api': 'VueCompositionAPI',
    '@formily/shared': 'Formily.Shared',
    '@formily/validator': 'Formily.Validator',
    '@formily/core': 'Formily.Core',
    '@formily/json-schema': 'Formily.JSONSchema',
    '@formily/react': 'Formily.React',
    '@formily/react-schema-field': 'Formily.React.SchemaField',
    '@formily/react-shared-components': 'Formily.React.SharedComponents',
  }),
]

export default (filename, targetName) => [
  {
    input: 'src/index.ts',
    output: {
      format: 'umd',
      file: `dist/${filename}.umd.development.js`,
      name: targetName,
    },
    plugins,
  },
  {
    input: 'src/index.ts',
    output: {
      format: 'umd',
      file: `dist/${filename}.umd.production.js`,
      name: targetName,
    },
    plugins: [...plugins, uglify({ sourcemap: true })],
  },
]
