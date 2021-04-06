import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import externalGlobals from 'rollup-plugin-external-globals'
import { terser } from 'rollup-plugin-terser'

const presets = () => [
  typescript({
    tsconfig: './tsconfig.json',
    tsconfigOverride: {
      compilerOptions: {
        module: 'ESNext',
        declaration: false,
      },
    },
  }),
  resolve(),
  commonjs(),
  externalGlobals(
    {
      antd: 'Antd',
      vue: 'Vue',
      react: 'React',
      mobx: 'mobx',
      moment: 'moment',
      '@alifd/next': 'Next',
      'mobx-react-lite': 'mobxReactLite',
      'react-dom': 'ReactDOM',
      '@vue/composition-api': 'VueCompositionAPI',
      '@formily/reactive-react': 'Formily.ReactiveReact',
      '@formily/reactive-vue': 'Formily.ReactiveVue',
      '@formily/reactive': 'Formily.Reactive',
      '@formily/shared': 'Formily.Shared',
      '@formily/validator': 'Formily.Validator',
      '@formily/core': 'Formily.Core',
      '@formily/json-schema': 'Formily.JSONSchema',
      '@formily/react': 'Formily.React',
    },
    {
      exclude: ['**/*.{less,sass,scss}'],
    }
  ),
]

export default (filename, targetName, ...plugins) => [
  {
    input: 'src/index.ts',
    output: {
      format: 'umd',
      file: `dist/${filename}.umd.development.js`,
      name: targetName,
    },
    plugins: [...presets(), ...plugins],
  },
  {
    input: 'src/index.ts',
    output: {
      format: 'umd',
      file: `dist/${filename}.umd.production.js`,
      name: targetName,
    },
    plugins: [...presets(), terser(), ...plugins],
  },
]
