import { observer } from '../'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import { observable } from '@formily/reactive'
import { CreateElement } from 'vue'
import CompositionAPI, { defineComponent, h } from '@vue/composition-api'

test('observer: component', async () => {
  const model = observable<any>({
    age: 10,
    setAge() {
      model.age++
    },
  })
  const Component = observer({
    data() {
      return {
        model,
      }
    },
    render(this: any, h: CreateElement) {
      return h('button', {
        on: { click: this.model.setAge },
        domProps: { textContent: this.model.age },
      })
    },
  })
  const wrapper = shallowMount(Component)
  expect(wrapper.find('button').text()).toBe('10')
  wrapper.find('button').trigger('click')
  expect(wrapper.find('button').text()).toBe('11')
  wrapper.destroy()
})

test('observer: component with setup', async () => {
  const Vue = createLocalVue()
  Vue.use(CompositionAPI)
  const model = observable<any>({
    age: 30,
    get sub10() {
      return model.age - 10
    },
    get sub20() {
      return model.sub10 - 10
    },
    setAge() {
      model.age++
    },
  })
  const Component = observer(
    defineComponent({
      setup() {
        return () => {
          return h('button', {
            on: { click: model.setAge },
            domProps: { textContent: model.sub20 },
          })
        }
      },
      // to fix 'Maximum call stack size exceeded' error of @vue/test-utils
      render() {
        return null
      },
    })
  )
  const wrapper = shallowMount(Component)
  expect(wrapper.find('button').text()).toBe('10')
  wrapper.find('button').trigger('click')
  expect(wrapper.find('button').text()).toBe('11')
  model.age++
  expect(wrapper.find('button').text()).toBe('12')
  wrapper.destroy()
})

test('observer: component scheduler', async () => {
  let schedulerRequest = null

  const model = observable<any>({
    age: 10,
    setAge() {
      model.age++
    },
  })
  const Component = observer(
    {
      data() {
        return {
          model,
        }
      },
      render(this: any, h: CreateElement) {
        return h('button', {
          on: { click: this.model.setAge },
          domProps: { textContent: this.model.age },
        })
      },
    },
    {
      scheduler: (update) => {
        clearTimeout(schedulerRequest)
        schedulerRequest = setTimeout(() => {
          update()
        }, 100)
      },
    }
  )
  const wrapper = shallowMount(Component)

  expect(wrapper.find('button').text()).toBe('10')

  wrapper.find('button').trigger('click')
  await new Promise((r) => setTimeout(r, 150))
  expect(wrapper.find('button').text()).toBe('11')

  // test second render
  wrapper.find('button').trigger('click')
  await new Promise((r) => setTimeout(r, 150))
  expect(wrapper.find('button').text()).toBe('12')

  wrapper.destroy()
})
