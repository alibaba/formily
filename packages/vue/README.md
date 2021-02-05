## Usage

### Requirement

vue^2.6.0 + @vue/composition-api^1.0.0-beta.1

Or

vue>=3.0.0-rc.0

### Quick Start

```html
<template>
  <FormProvider :form="form" class="demo">
    <Field
      name="bb"
      required
      description="122333"
      title="BB"
      validator="url"
      :decorator="[FormItem,{tooltips:'xxx',labelCol:{span:3}}]"
      :component="[Input,{placeholder:'xxx'}]"
    />
    <Field
      name="kk"
      title="KK"
      required
      :decorator="[FormItem,{tooltips:'xxx',labelCol:{span:3}}]"
      :component="[Input]"
    />
    <Field
      name="aa"
      title="AA"
      :decorator="[FormItem,{tooltips:'xxx',labelCol:{span:3}}]"
    >
      <ArrayField
        name="cc"
        title="CC"
        :decorator="[FormItem,{tooltips:'xxx',labelCol:{span:3}}]"
      >
        <template #default="{ field }">
          <div>
            <div v-for="(item, index) in field.value || []" :key="item.id">
              <Field :name="`${index}.dd`" required :component="[Input]" />
              <Field :name="`${index}.ee`" :component="[Input]" />
              <button
                @click="() => {
                  field.moveUp(index)
                }"
              >
                上移
              </button>
              <button
                @click="() => {
                  field.moveDown(index)
                }"
              >
                下移
              </button>
              <button
                @click="e => {
                  e.preventDefault()
                  field.remove(index)
                }"
              >
                移除
              </button>
            </div>
            <button
              @click="e => {
                e.preventDefault()
                field.push({ id: new Date().getTime() })
              }"
            >
              添加
            </button>
          </div>
        </template>
      </ArrayField>
      <ObjectField
        title="XX"
        :decorator="[FormItem,{tooltips:'xxx',labelCol:{span:3}}]"
        name="xx"
      >
        <template #default="{ field }">
          <div>
            <div v-for="(value, key) in field.value || []" :key="key">
              <Field :name="`${key}.yy`" required :component="[Input]" />
              <Field :name="`${key}.zz`" :component="[Input]" />
              <button
                @click="e => {
                  e.preventDefault()
                  field.removeProperty(key)
                }"
              >
                移除
              </button>
            </div>
            <button
              @click="e => {
                e.preventDefault()
                field.addProperty(new Date().getTime(), {})
              }"
            >
              添加
            </button>
          </div>
        </template>
      </ObjectField>
    </Field>
    <FormConsumer>
      <template #default="{ form }">
        {{ JSON.stringify(form.query('aa').get().value) }}
      </template>
    </FormConsumer>
    <FormConsumer>
      <template #default="{ form }">
        {{ form.errors.length > 0 ? JSON.stringify(form.errors) : '' }}
      </template>
    </FormConsumer>
    <button
      @click="() => {
        form.submit(log)
      }"
    >
      提交
    </button>
    <button
      @click="() => {
        form.setPattern('editable')
      }"
    >
      编辑
    </button>
    <button
      @click="() => {
        form.setPattern('disabled')
      }"
    >
      禁用
    </button>
  </FormProvider>
</template>

<script>
  import { Form, Input, Select, Card, Button } from 'ant-design-vue'
  import {
    createForm,
    FormProvider,
    FormConsumer,
    Field,
    ArrayField,
    ObjectField,
    onFieldReact,
    connect,
    mapProps,
    isVoidField,
  } from '@formily/vue'

  const FormItem = connect(
    Form.Item,
    mapProps(
      { extract: 'validateStatus' },
      { extract: 'title', to: 'label' },
      (props, field) => {
        if (isVoidField(field)) return props
        if (field.invalid) {
          return {
            help: field.errors.reduce(
              (msg, info) => msg.concat(info.messages),
              []
            ),
          }
        } else {
          return {
            help: field.description,
          }
        }
      }
    )
  )

  export default {
    name: 'demo',
    components: {
      FormProvider,
      FormConsumer,
      Field,
      ArrayField,
      ObjectField,
      Button,
    },
    data() {
      const form = createForm({
        pattern: 'disabled',
        values: {
          bb: '123',
          aa: {
            cc: [
              {
                ee: '12',
              },
            ],
          },
        },
        effects: () => {
          onFieldReact('kk', (field, form) => {
            field.setDisplay(form.values.bb === '321' ? 'visible' : 'none')
          })
          onFieldReact('aa.cc.*.dd', (field) => {
            const value = field.query('.ee').get((field) => field.value)
            field.setPattern(value === '123' ? 'disabled' : 'editable')
          })
        },
      })
      return {
        form,
        FormItem,
        Input,
        Select,
        Card,
      }
    },
    methods: {
      log(...v) {
        console.log(...v)
      },
    },
  }
</script>

<style>
  .demo {
    width: 600px;
    padding: 16px;
    margin: 200px auto;
    border: 1px solid #ccc;
    word-break: break-all;
    border-radius: 3px;
  }

  .ant-btn + .ant-btn {
    margin-left: 8px;
  }
</style>
```
