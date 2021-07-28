<template>
  <Button @click="handleOpen">点击打开表单</Button>
</template>

<script>
import { FormDrawer, FormLayout, FormItem, Input } from '@formily/element'
import { Button } from 'element-ui'
import { createSchemaField } from '@formily/vue'
const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Input,
  },
})

// 抽屉表单组件
const DrawerForm = {
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
        <FormDrawer.Footer>
          <span style={{ marginLeft: '4px' }}>扩展文案</span>
        </FormDrawer.Footer>
      </FormLayout>
    )
  },
}

export default {
  components: { Button },
  data() {
    return {}
  },
  methods: {
    handleOpen() {
      FormDrawer('抽屉表单', DrawerForm)
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
