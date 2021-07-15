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
})
