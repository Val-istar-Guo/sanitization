import test from 'ava'
import sa from '../src'


test('# sa.max', t => {
  t.is(sa.max(3)(4), 3)
  t.deepEqual(sa.array.max(3)([1, 2, 3, 4, 5]), [1, 2, 3])
  t.deepEqual(sa.string.max(3)('12345'), '123')
  t.deepEqual(sa.string.max(3)(null), '')
})
