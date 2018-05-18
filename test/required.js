import test from 'ava'
import sa from '../src'


test('# sa.required should throw error when origin value is not expected', t => {
  t.throws(() => sa.number.required(NaN))
  t.throws(() => sa.bool.required(''))
  t.throws(() => sa.array.required(''))
  t.throws(() => sa.object.required(''))
  t.throws(() => sa.string.required(1))
})

test('# sa.required should return origin value when origin value is expected', t => {
  t.is(sa.number.required(1), 1)
  t.is(sa.string.required('string'), 'string')

  t.true(sa.bool.required(true))

  const arr = []
  t.is(sa.array.required(arr), arr)
  const obj = {}
  t.is(sa.object.required(obj), obj)
})
