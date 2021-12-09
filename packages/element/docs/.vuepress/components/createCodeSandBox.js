import { getParameters } from 'codesandbox/lib/api/define'

const CodeSandBoxHTML = '<div id="app"></div>'
const CodeSandBoxJS = `
import Vue from 'vue'
import App from './App.vue'
import Element  from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(Element, { size: 'small' });

new Vue({
  render: h => h(App),
}).$mount('#app')`

const createForm = ({ method, action, data }) => {
  const form = document.createElement('form') // 构造 form
  form.style.display = 'none' // 设置为不显示
  form.target = '_blank' // 指向 iframe

  // 构造 formdata
  Object.keys(data).forEach((key) => {
    const input = document.createElement('input') // 创建 input

    input.name = key // 设置 name
    input.value = data[key] // 设置 value

    form.appendChild(input)
  })

  form.method = method // 设置方法
  form.action = action // 设置地址

  document.body.appendChild(form)

  // 对该 form 执行提交
  form.submit()

  document.body.removeChild(form)
}

export function createCodeSandBox(codeStr) {
  const parameters = getParameters({
    files: {
      'sandbox.config.json': {
        content: {
          template: 'node',
          infiniteLoopProtection: true,
          hardReloadOnChange: false,
          view: 'browser',
          container: {
            port: 8080,
            node: '14',
          },
        },
      },
      'package.json': {
        content: {
          scripts: {
            serve: 'vue-cli-service serve',
            build: 'vue-cli-service build',
            lint: 'vue-cli-service lint',
          },
          dependencies: {
            '@formily/core': 'latest',
            '@formily/vue': 'latest',
            '@formily/element': 'latest',
            axios: '^0.21.1',
            'core-js': '^3.6.5',
            'element-ui': 'latest',
            'vue-demi': 'latest',
            vue: '^2.6.11',
          },
          devDependencies: {
            '@vue/cli-plugin-babel': '~4.5.0',
            '@vue/cli-service': '~4.5.0',
            '@vue/composition-api': 'latest',
            'vue-template-compiler': '^2.6.11',
            sass: '^1.34.1',
            'sass-loader': '^8.0.2',
          },
          babel: {
            presets: [
              [
                '@vue/babel-preset-jsx',
                {
                  vModel: false,
                  compositionAPI: true,
                },
              ],
            ],
          },
          vue: {
            devServer: {
              host: '0.0.0.0',
              disableHostCheck: true, // 必须
            },
          },
        },
      },
      'src/App.vue': {
        content: codeStr,
      },
      'src/main.js': {
        content: CodeSandBoxJS,
      },
      'public/index.html': {
        content: CodeSandBoxHTML,
      },
    },
  })

  createForm({
    method: 'post',
    action: 'https://codesandbox.io/api/v1/sandboxes/define',
    data: {
      parameters,
      query: 'file=/src/App.vue',
    },
  })
}
