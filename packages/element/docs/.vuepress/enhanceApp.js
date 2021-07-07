import pageComponents from '@internal/page-components'
import Element from 'element-ui'
import '@formily/element/style.ts'

export default ({ Vue }) => {
  for (const [name, component] of Object.entries(pageComponents)) {
    Vue.component(name, component)
  }
  Vue.use(Element, { size: 'small' })
}
