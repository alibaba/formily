import { MonacoInput } from '@designable/react-settings-form'

export interface IDependency {
  name: string
  path: string
}

const loadDependencies = async (deps: IDependency[]) => {
  return Promise.all(
    deps.map(async ({ name, path }) => ({
      name,
      path,
      library: await fetch(`//cdn.jsdelivr.net/npm/${name}/${path}`).then(
        (res) => res.text()
      ),
    }))
  )
}

MonacoInput.loader.init().then(async (monaco) => {
  const deps = await loadDependencies([
    { name: '@formily/core', path: 'dist/formily.core.all.d.ts' },
  ])
  deps?.forEach(({ name, library }) => {
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      `declare module '${name}'{ ${library} }`,
      `file:///node_modules/${name}/index.d.ts`
    )
  })
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    `
    import { Form, Field } from '@formily/core'
    declare global {
      /*
       * Form Model
       **/
      declare var $form: Form
      /*
       * Field Model
       **/
      declare var $self: Field
      /*
       * create an persistent observable state object
       **/
      declare var $observable: <T>(target: T, deps?: any[]) => T
      /*
       * create a persistent data
       **/
      declare var $memo: <T>(callback: () => T, deps?: any[]) => T
      /*
       * handle side-effect logic
       **/
      declare var $effect: (callback: () => void | (() => void), deps?: any[]) => void
      /*
       * set initial component props to current field
       **/
      declare var $props: (props: any) => void
    }
    `,
    `file:///node_modules/formily_global.d.ts`
  )
})
