import {
  asyncPipe,
  createAsyncPipe,
  createDeliverArg,
  createPipe,
  deliverArgWrap,
  pipe,
} from 'src/pipe'

describe('deliverArg', function test() {
  const countPipe = (value: string) => (value.length < 4)
  const startPipe = (value: string) => (value.startsWith('f'))
  const asyncStartPipe = (value: string) => (Promise.resolve(value.startsWith('f')))

  it('should deliver an arg', function test() {
    const deliverArg = createDeliverArg()
    const result = pipe(
      deliverArg(countPipe),
      deliverArg(startPipe),
    )('foo')

    expect(result).toBe(true)
  })

  it('should deliver an arg with a wrap', function test() {
    const result = createPipe({wrap: deliverArgWrap})(
      countPipe,
      startPipe,
    )('foo')

    expect(result).toBe(true)

    const result1 = createPipe({wrap: deliverArgWrap})(
      countPipe,
      startPipe,
    )('bar')

    expect(result1).toBe(false)
  })

  it('should deliver an async arg', async function test() {
    const deliverArg = createDeliverArg()
    const result = await asyncPipe(
      deliverArg(countPipe),
      deliverArg(asyncStartPipe),
    )('foo')

    expect(result).toBe(true)
  })

  it('should deliver without pipe', async function test() {
    const result = await createAsyncPipe({wrap: deliverArgWrap})(
    )('foo')

    expect(result).toBe('foo')
  })

  it('should deliver an async arg with a wrap', async function test() {
    const result = await createAsyncPipe({wrap: deliverArgWrap})(
      countPipe,
      asyncStartPipe,
    )('foo')

    expect(result).toBe(true)

    const result1 = await createAsyncPipe({wrap: deliverArgWrap})(
      countPipe,
      asyncStartPipe,
    )('bar')

    expect(result1).toBe(false)
  })
})
