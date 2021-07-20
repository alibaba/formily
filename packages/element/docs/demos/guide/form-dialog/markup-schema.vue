<template>
  <Button @click="handleOpen">点击打开表单</Button>
</template>

<script>
import {
  FormDialog,
  FormLayout,
  FormItem,
  Input,
  FormDialogFooter,
} from '@formily/element'
import { Button } from 'element-ui'
import { createSchemaField } from '@formily/vue'

const { SchemaField, SchemaStringField } = createSchemaField({
  components: {
    FormItem,
    Input,
  },
})

export default {
  components: { Button },
  data() {
    return {}
  },
  methods: {
    handleOpen() {
      FormDialog('弹框表单', () => (
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
          <FormDialogFooter>
            <span style={{ marginLeft: '4px' }}>扩展文案</span>
          </FormDialogFooter>
        </FormLayout>
      ))
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
