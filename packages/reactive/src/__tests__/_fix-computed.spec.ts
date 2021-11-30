import { autorun, model } from '..'

describe('fix computed', () => {
  test('1', () => {
    const obs = model({
      a: 0,
      get b() {
        return this.a
      },
      get c() {
        void this.a
        return 0
      },
    })
    autorun(() => obs.b)
    autorun(() => obs.c)
    expect(obs.b).toBe(0)
    expect(obs.c).toBe(0)
    obs.a++
    expect(obs.b).toBe(1)
    expect(obs.c).toBe(0)
    obs.a++
    obs.a++
    obs.a++
    expect(obs.b).toBe(4)
    expect(obs.c).toBe(0)
  })
})
