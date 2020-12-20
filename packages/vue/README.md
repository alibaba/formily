## Usage

### Preparation

``` js
import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)
```

### Quick Start

``` html
<template>
  <FormProvider :form="form" class="demo">
      <Field
        name="bb"
        initialValue="123"
        required
        description="122333"
        title="BB"
        validator="url"
        :decorator="[FormItem,{tooltips:'xxx',labelCol:{span:3}}]"
        :component="[Input,{placeholder:'xxx'}]"
      />
      <Field name="kk" title="KK" required :decorator="[FormItem,{tooltips:'xxx',labelCol:{span:3}}]" :component="[Input]" />
      <Field name="aa" title="AA" :decorator="[FormItem,{tooltips:'xxx',labelCol:{span:3}}]">
        <ArrayField title="Array" :decorator="[FormItem,{tooltips:'xxx',labelCol:{span:3}}]" name="cc">
          <template #default="{ field }">
            <div>
              <div v-for="(item, index) in field.value || []" :key="item.id">
                <Field
                  :name="`${index}.dd`"
                  required
                  :component="[Input]"
                />
                <Field :name="`${index}.ee`" :component="[Input]" />
                <Button
                  @click="() => {
                    field.moveUp(index)
                  }"
                >
                  上移
                </Button>
                <Button
                  @click="() => {
                    field.moveDown(index)
                  }"
                >
                  下移
                </Button>
                <Button
                  @click="e => {
                    e.preventDefault()
                    field.remove(index)
                  }"
                >
                  移除
                </Button>
              </div>
              <Button
                  @click="e => {
                    e.preventDefault()
                    field.push({ id: new Date().getTime() })
                  }"
                >
                  添加
                </Button>
            </div>
          </template>
        </ArrayField>
        <ObjectField title="Object" :decorator="[FormItem,{tooltips:'xxx',labelCol:{span:3}}]" name="xx">
          <template #default="{ field }">
            <div>
              <div v-for="(value, key) in field.value || []" :key="key">
                <Field
                  :name="`${key}.yy`"
                  required
                  :component="[Input]"
                />
                <Field :name="`${key}.zz`" :component="[Input]" />
                <Button
                  @click="e => {
                    e.preventDefault()
                    field.removeProperty(key)
                  }"
                >
                  移除
                </Button>
              </div>
              <Button
                  @click="e => {
                    e.preventDefault()
                    field.addProperty(new Date().getTime(), {})
                  }"
                >
                  添加
                </Button>
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
      <Button
        @click="() => {
          form.submit(log)
        }"
      >
        提交
      </Button>
      <Button
        @click="() => {
          form.setPattern('editable')
        }"
      >
        编辑
      </Button>
      <Button
        @click="() => {
          form.setPattern('disabled')
        }"
      >
        禁用
      </Button>
    </FormProvider>
</template>

<script>
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
  isVoidField
} from '@formily/vue'
import { Form, Input, Select, Card, Button } from 'ant-design-vue';

const FormItem = connect(
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
          )
        }
      } else {
        return {
          help: field.description
        }
      }
    }
  )
)(Form.Item)

export default {
  components: { 
    FormProvider,
    FormConsumer,
    Field,
    ArrayField,
    ObjectField,
    Button
  },
  data() {
    const form = createForm({
      pattern: 'disabled',
      initialValues: {
        bb: '123'
      },
      effects: () => {
        onFieldReact('kk', (field, form) => {
          field.setDisplay(form.values.bb === '321' ? 'visibility' : 'none')
        })
        onFieldReact('aa.cc.*.dd', field => {
          const value = field.query('.ee').get(field => field.value)
          field.setPattern(value === '123' ? 'disabled' : 'editable')
        })
      }
    })
    return {
      form,
      FormItem,
      Input,
      Select,
      Card
    }
  },
  methods: {
    log (v) {
      console.log(v)
    }
  }
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