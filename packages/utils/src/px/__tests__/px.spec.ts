import _px, {px} from 'src/px'

describe('px', function test() {
  it('should export default also', function test() {
    expect(_px).toBe(px)
  })
  it('should add px with', function test() {
    expect(px(5)).toBe('5px')
    expect(px([5, 10])).toEqual(['5px', '10px'])
    expect(px({bar: 10, foo: 5, john: 15})).toEqual({bar: '10px', foo: '5px', john: '15px'})
  })
})
