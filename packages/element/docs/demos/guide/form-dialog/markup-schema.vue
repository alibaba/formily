<template>
  <FormDialogPortal :id="portalId">
    <Button @click="handleOpen">点击打开表单</Button>
  </FormDialogPortal>
</template>

<script>
import { FormDialog, FormLayout, FormItem, Input } from '@formily/element'
import { Button } from 'element-ui'
import { createSchemaField } from '@formily/vue'

const { SchemaField, SchemaStringField } = createSchemaField({
  components: {
    FormItem,
    Input,
  },
})

// 弹框表单组件
const DialogForm = {
  props: ['form'],
  inject: ['foo'],
  render() {
    const form = this.form
    console.log(this.foo)
    return (
      <FormLayout labelCol={6} wrapperCol={10}>
        <SchemaField>
          <SchemaStringField
            name="aaa"
            required
            title="输入框1"
            x-decorator="FormItem"
            x-component="Input"
          />
          <SchemaStringField
            name="bbb"
            required
            title="输入框2"
            x-decorator="FormItem"
            x-component="Input"
          />
          <SchemaStringField
            name="ccc"
            required
            title="输入框3"
            x-decorator="FormItem"
            x-component="Input"
          />
          <SchemaStringField
            name="ddd"
            required
            title="输入框4"
            x-decorator="FormItem"
            x-component="Input"
          />
        </SchemaField>
        <FormDialog.Footer>
          <span style={{ marginLeft: '4px' }}>扩展文案: {form.values.aaa}</span>
        </FormDialog.Footer>
      </FormLayout>
    )
  },
}

export default {
  components: { Button, FormDialogPortal: FormDialog.Portal },
  data() {
    return {
      portalId: '可以传，也可以不传的ID，默认是form-dialog',
    }
  },
  provide: {
    foo: '自定义上下文可以直接传到弹窗内部，只需要ID一致即可',
  },
  methods: {
    handleOpen() {
      FormDialog('弹框表单', this.portalId, DialogForm)
        .forOpen((payload, next) => {
          setTimeout(() => {
            next({
              initialValues: {
                aaa: '123',
              },
            })
          }, 1000)
        })
        .forConfirm((payload, next) => {
          setTimeout(() => {
            console.log(payload)
            next(payload)
          }, 1000)
        })
        .forCancel((payload, next) => {
          setTimeout(() => {
            console.log(payload)
            next(payload)
          }, 1000)
        })
        .open()
        .then(console.log)
        .catch(console.error)
    },
  },
}
</script>
