# defineObservableComponent

## 描述

defineObservableComponent 是基于[mobx-vue](https://github.com/mobxjs/mobx-vue)及[社区的vue3 mobx接入方案](https://github.com/umijs/neeko/blob/master/src/vue/observer.ts)封装而成，使用 defineObservableComponent 主要是将组件支持响应式更新能力。

它的语法类似 Composition API 中的 defineComponent，其中的 observableSetup 相比 setup 多出一个收集依赖的 collect 参数。collect 传入上下文中的 form/field 即可响应更新。

## 用例


::: demo
<template>
  <FormProvider :form="form">
    <Space>
      <Field
        name="name"
        title="Name"
        required
        :component="[Input, { placeholder: 'Please Input' }]"
      />
      <Submit @submit="onSubmit">Submit</Submit>
    </Space>
  </FormProvider>
</template>

<script>
import { createForm, setValidateLanguage } from '@formily/core'
import { FormProvider, Field, defineObservableComponent, useForm, h } from '@formily/vue';
import { Input, Button, Space } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

setValidateLanguage('en')

const Submit = defineObservableComponent({
  props: ['size', 'type', 'ghost', 'shape', 'loading', 'disabled', 'icon', 'block'],
  observableSetup (collect, props, context) {
    const form = useForm();
    collect({ form });
    const { listeners, slots } = context;
    return () => h(Button, {
      props: {
        ...props,
        htmlType: listeners.submit ? 'button' : 'submit',
        type: props.type !== undefined ? props.type : 'primary',
        loading: props.loading !== undefined ? props.loading : form?.submitting
      },
      attrs: context.attrs,
      on: {
        ...listeners,
        click: (e) => {
          if (listeners.click) {
            if (Array.isArray(listeners.click)) {
              listeners.click.forEach(fn => fn(e));
            } else {
              listeners.click(e);
            }
          }
          if (listeners.submit) {
            form?.submit(listeners.submit);
          }
        }
      }
    }, slots);
  },
});

export default {
  components: {
    FormProvider,
    Field,
    Submit,
    Space
  },
  data() {
    const form = createForm({ validateFirst: true })
    return {
      Input,
      form
    }
  },
  methods: {
    onSubmit (data) {
      console.log(data)
    }
  }
}
</script>
:::
