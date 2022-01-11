const HEX = '0123456789abcdefghijklmnopqrstuvwxyz'

export const uid = (len = 11) =>
  new Array(len)
    .fill('')
    .map(() => HEX[Math.random() * 36 | 0])
    .join('')
