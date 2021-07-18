<template>
  <Button @click="handleOpen">点击打开表单</Button>
</template>

<script>
import {
  FormDialog,
  FormDialogFooter,
  FormLayout,
  FormItem,
  Input,
  Submit,
  Reset,
} from '@formily/element'
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
        <FormDialogFooter>
          <Submit onClick={this.resolve}>提交</Submit>
          <Reset>重置</Reset>
        </FormDialogFooter>
      </FormLayout>
    )
  },
}

export default {
  components: { Button },
  data() {
    return {
      dialogProps: {
        footer: null,
        title: '弹框表单',
      },
    }
  },
  methods: {
    handleOpen() {
      FormDialog(this.dialogProps, DialogForm)
        .open({
          initialValues: {
            aaa: '123',
          },
        })
        .then((values) => {
          console.log('values', values)
        })
        .catch((e) => {
          console.log(e)
        })
    },
  },
}
</script>
