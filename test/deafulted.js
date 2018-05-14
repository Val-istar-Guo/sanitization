import test from 'ava'
import sa from '../src'


test('# sa.defaulted should return origin value when input is expected', t => {
  t.is(sa.number.defaulted()(1), 1)
  t.is(sa.string.defaulted()('string'), 'string')

  t.true(sa.bool.defaulted()(true))

  const arr = []
  t.is(sa.array.defaulted()(arr), arr)
  const obj = {}
  t.is(sa.object.defaulted()(obj), obj)
})

test('# sa.defaulted should return defaulted value when input is not expected', t => {
  t.is(sa.number.defaulted(10)(NaN), 10)
  t.true(sa.bool.defaulted(true)(''))

  const arr = [1, 2, 3]
  t.is(sa.array.defaulted(arr)(''), arr)

  const obj = { a: 'a' }
  t.is(sa.object.defaulted(obj)(''), obj)
  t.is(sa.string.defaulted('string')(1), 'string')
})


test('# sa.defaulted should throw error when called individually', t => {
  t.throws(() => sa.defaulted()(), '[Sanitization Error] defaulted should not be called individually')
})
