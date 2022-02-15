import pageComponents from '@internal/page-components'
import Vant from 'vant'
import '@formily/vant2/style.ts'

export default ({ Vue }) => {
  for (const [name, component] of Object.entries(pageComponents)) {
    Vue.component(name, component)
  }
  Vue.use(Vant, { size: 'small' })
}
