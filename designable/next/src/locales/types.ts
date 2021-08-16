export interface ISettingsLocale {
  [key: string]:
    | string
    | {
        title?: string
        description?: string
        tooltip?: string
        placeholder?: string
        dataSource?: string[]
      }
    | ISettingsLocale
}
