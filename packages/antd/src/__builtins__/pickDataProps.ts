export const pickDataProps = (props: any = {}) => {
  return Object.keys(props).reduce((buf, key) => {
    if (key.includes('data-')) {
      buf[key] = props[key]
    }
    return buf
  }, {})
}
