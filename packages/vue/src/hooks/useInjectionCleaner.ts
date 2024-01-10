import { InjectionKey, provide, Ref, ref } from 'vue-demi'

export const useInjectionCleaner = (
  injectionKeys: InjectionKey<Ref<unknown>>[]
) => {
  injectionKeys.forEach((key) => provide(key, ref()))
}
