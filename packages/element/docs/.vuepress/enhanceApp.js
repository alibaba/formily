import pageComponents from '@internal/page-components'
import Element from 'element-ui'
import 'element-ui/packages/theme-chalk/src/index.scss'
import '@formily/element/index.scss'

export default ({ Vue }) => {
  for (const [name, component] of Object.entries(pageComponents)) {
    Vue.component(name, component)
  }
  Vue.use(Element, { size: 'small' })
}
