import path from 'path'
import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import externalGlobals from 'rollup-plugin-external-globals'
import injectProcessEnv from 'rollup-plugin-inject-process-env'
import dts from 'rollup-plugin-dts'
import { terser } from 'rollup-plugin-terser'

const presets = () => {
  const externals = {
    antd: 'antd',
    vue: 'Vue',
    react: 'React',
    moment: 'moment',
    'react-is': 'ReactIs',
    '@alifd/next': 'Next',
    'mobx-react-lite': 'mobxReactLite',
    'react-dom': 'ReactDOM',
    'element-ui': 'Element',
    '@ant-design/icons': 'icons',
    '@vue/composition-api': 'VueCompositionAPI',
    '@formily/reactive-react': 'Formily.ReactiveReact',
    '@formily/reactive-vue': 'Formily.ReactiveVue',
    '@formily/reactive': 'Formily.Reactive',
    '@formily/path': 'Formily.Path',
    '@formily/shared': 'Formily.Shared',
    '@formily/validator': 'Formily.Validator',
    '@formily/core': 'Formily.Core',
    '@formily/json-schema': 'Formily.JSONSchema',
    '@formily/react': 'Formily.React',
    '@formily/vue': 'Formily.Vue',
    'vue-demi': 'VueDemi'
  }
  return [
    typescript({
      tsconfig: './tsconfig.build.json',
      tsconfigOverride: {
        compilerOptions: {
          module: 'ESNext',
          declaration: false,
        },
      },
    }),
    resolve(),
    commonjs(),
    externalGlobals(externals, {
      exclude: ['**/*.{less,sass,scss}'],
    }),
  ]
}

const createEnvPlugin = (env) => {
  return injectProcessEnv(
    {
      NODE_ENV: env,
    },
    {
      exclude: '**/*.{css,less,sass,scss}',
      verbose: false,
    }
  )
}

const inputFilePath = path.join(process.cwd(), 'src/index.ts')

const noUIDtsPackages = [
  'formily.core',
  'formily.validator',
  'formily.shared',
  'formily.path',
  'formily.json-schema',
  'formily.reactive',
]

export const removeImportStyleFromInputFilePlugin = () => ({
  name: 'remove-import-style-from-input-file',
  transform(code, id) {
    // 样式由 build:style 进行打包，所以要删除入口文件上的 `import './style'`
    if (inputFilePath === id) {
      return code.replace(`import './style';`, '')
    }

    return code
  },
})

export default (filename, targetName, ...plugins) => {
  const base = [
    {
      input: 'src/index.ts',
      output: {
        format: 'umd',
        file: `dist/${filename}.umd.development.js`,
        name: targetName,
        sourcemap: true,
        amd: {
          id: filename,
        },
        globals: {
          '@formily/json-schema': 'Formily.JSONSchema',
        },
      },
      external: ['react', 'react-dom', 'react-is', '@formily/json-schema'],
      plugins: [...presets(), ...plugins, createEnvPlugin('development')],
    },
    {
      input: 'src/index.ts',
      output: {
        format: 'umd',
        file: `dist/${filename}.umd.production.js`,
        name: targetName,
        sourcemap: true,
        amd: {
          id: filename,
        },
        globals: {
          '@formily/json-schema': 'Formily.JSONSchema',
        },
      },
      external: ['react', 'react-dom', 'react-is', '@formily/json-schema'],
      plugins: [
        ...presets(),
        terser(),
        ...plugins,
        createEnvPlugin('production'),
      ],
    },
  ]

  if (noUIDtsPackages.includes(filename)) {
    base.push({
      input: 'esm/index.d.ts',
      output: {
        format: 'es',
        file: `dist/${filename}.d.ts`,
      },
      plugins: [dts(), ...plugins],
    })
    base.push({
      input: 'esm/index.d.ts',
      output: {
        format: 'es',
        file: `dist/${filename}.all.d.ts`,
      },
      plugins: [
        dts({
          respectExternal: true,
        }),
        ...plugins,
      ],
    })
  }

  return base
}
