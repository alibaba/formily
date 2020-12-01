import { camelCase } from 'camel-case'
import { pascalCase } from 'pascal-case'

export const lowerCase = (str: string) => String(str).toLocaleLowerCase()

export const upperCase = (str: string) => String(str).toLocaleUpperCase()

export { camelCase, pascalCase }
