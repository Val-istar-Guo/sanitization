import test from 'ava'
import sa from '../src'


test('# sa.max', t => {
  t.is(sa.max(3)(4), 3)
  t.deepEqual(sa.array.max(3)([1, 2, 3, 4, 5]), [1, 2, 3])
  t.deepEqual(sa.string.max(3)('12345'), '123')
  t.deepEqual(sa.string.max(3)(null), '')

  t.is(sa.max(3).defaulted(2)(4), 2)
  t.is(sa.max(3).defaulted(2)(null), 2)
  t.is(sa.string.max(2).defaulted('1')('123'), '1')
  t.is(sa.string.max(2).defaulted('1')(null), '1')
  t.deepEqual(sa.array.max(2).defaulted([1, 2])([4, 5, 6]), [4, 5])
  t.deepEqual(sa.array.max(2).defaulted([1, 2])(''), [1, 2])
})
