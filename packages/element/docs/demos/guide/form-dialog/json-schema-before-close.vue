<template>
  <Button @click="handleOpen">点击打开表单</Button>
</template>

<script>
import { FormDialog, FormLayout, FormItem, Input } from '@formily/element'
import { Button } from 'element-ui'
import { createSchemaField } from '@formily/vue'

const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Input,
  },
})

// 弹框表单组件
const DialogForm = {
  props: ['resolve', 'reject'],
  data() {
    const schema = {
      type: 'object',
      properties: {
        aaa: {
          type: 'string',
          title: '输入框1',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        bbb: {
          type: 'string',
          title: '输入框2',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        ccc: {
          type: 'string',
          title: '输入框3',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        ddd: {
          type: 'string',
          title: '输入框4',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
      },
    }
    return {
      schema,
    }
  },
  render(h) {
    return (
      <FormLayout labelCol={6} wrapperCol={10}>
        <SchemaField schema={this.schema} />
      </FormLayout>
    )
  },
}

export default {
  components: { Button },
  data() {
    return {
      dialogProps: {
        title: '弹框表单',
        okButtonProps: {
          loading: false,
        },
        beforeClose: (done) => {
          if (!this.dialogProps.okButtonProps.loading) {
            done()
          }
        },
      },
    }
  },
  methods: {
    handleOpen() {
      const formDialogHandler = FormDialog(this.dialogProps, DialogForm)

      formDialogHandler
        .open({
          initialValues: {
            aaa: '123',
          },
        })
        .then((values) => {
          this.dialogProps.okButtonProps.loading = true

          setTimeout(() => {
            this.dialogProps.okButtonProps.loading = false
            formDialogHandler.close()
          }, 2000)
        })
        .catch((e) => {
          console.log(e)
        })
    },
  },
}
</script>
