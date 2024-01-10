import { shallowMount, createLocalVue } from '@vue/test-utils'
import { observable, autorun } from '@formily/reactive'
import { CreateElement } from 'vue'
import CompositionAPI, { defineComponent, h } from '@vue/composition-api'
import { observer } from '../'
import collectData from '../observer/collectData'
import { observer as observerInVue2 } from '../observer/observerInVue2'
import expect from 'expect'

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

test('observer: stop tracking if watcher is destroyed', async () => {
  let count = 0
  const model = observable<any>({
    age: 10,
    name: 'test',
  })

  const Component = observer({
    name: 'test',
    data() {
      return {
        model: model,
      }
    },
    render() {
      count++
      return h('div', [this.model.name, this.model.age])
    },
  })

  const wrapper = shallowMount(Component)

  const childInst = wrapper.find({ name: 'test' })

  expect(childInst.exists()).toBe(true)
  ;(childInst.vm as any)._isDestroyed = true
  model.age++
  wrapper.destroy()
  expect(count).toEqual(1) // 不触发 reactiveRender
})

test('collectData', async () => {
  const model = observable<any>({
    age: 10,
    name: 'test',
  })

  const target = {
    value: 1,
  }

  const data = collectData(
    {},
    {
      model,
      target,
    }
  )

  const fn1 = jest.fn()
  const fn2 = jest.fn()

  autorun(() => fn1(model.age))
  autorun(() => fn2(data.target.value))

  model.age++
  expect(fn1).toBeCalledTimes(2)

  target.value++
  expect(fn2).toBeCalledTimes(1)
})

test('observerInVue2', () => {
  const componentObj = Object.create(null)

  componentObj.data = () => {
    return {}
  }

  const ExtendedComponent1 = observerInVue2(componentObj)
  expect(ExtendedComponent1.name).toEqual('<component>')

  function Component() {}
  Component.options = {
    data: () => {
      return {}
    },
  }

  const ExtendedComponent2 = observerInVue2(Component, { name: 'abc' })
  expect(ExtendedComponent2.name).toEqual('abc')
})
