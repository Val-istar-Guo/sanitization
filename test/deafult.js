import test from 'ava'
import sa from '../src'


test('# sa.default should return origin value when input is expected', t => {
  t.is(sa.number.default()(1), 1)
  t.is(sa.string.default()('string'), 'string')

  t.true(sa.bool.default()(true))

  const arr = []
  t.is(sa.array.default()(arr), arr)
  const obj = {}
  t.is(sa.object.default()(obj), obj)
})

test('# sa.default should return default value when input is not expected', t => {
  t.is(sa.number.default(10)(''), 10)
  t.true(sa.bool.default(true)(''))

  const arr = [1, 2, 3]
  t.is(sa.array.default(arr)(''), arr)

  const obj = { a: 'a' }
  t.is(sa.object.default(obj)(''), obj)
  t.is(sa.string.default('string')(1), 'string')
})


test('# sa.default should throw error when called individually', t => {
  t.throws(() => sa.default()(), '[Sanitization Error] default should not be called individually')
})
