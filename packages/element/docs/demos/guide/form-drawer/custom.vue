<template>
  <Button @click="handleOpen">点击打开表单</Button>
</template>

<script>
import {
  FormDrawer,
  FormDrawerFooter,
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

// 抽屉表单组件
const DrawerForm = {
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
        <FormDrawerFooter>
          <Submit onClick={this.resolve}>提交</Submit>
          <Reset>重置</Reset>
        </FormDrawerFooter>
      </FormLayout>
    )
  },
}

export default {
  components: { Button },
  data() {
    return {
      drawerProps: {
        footer: null,
        title: '抽屉表单',
      },
    }
  },
  methods: {
    handleOpen() {
      FormDrawer(this.drawerProps, DrawerForm)
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
