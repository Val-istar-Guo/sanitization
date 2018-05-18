import test from 'ava'
import sa from '../src'


test('# sa.min', t => {
  t.is(sa.min(3)(2), 3)
  t.deepEqual(sa.array.min(3)([1, 2]), [1, 2, null])
  t.deepEqual(sa.string.min(3)('12'), '12 ')
  t.deepEqual(sa.string.min(3)(null), '   ')

  t.is(sa.min(1).defaulted(5)(0), 5)
  t.throws(() => sa.min(1).required(0))

  t.is(sa.min(3).defaulted(2)(1), 2)
  t.is(sa.min(3).defaulted(2)(null), 2)
  t.is(sa.string.min(2).defaulted('1234')(''), '1234')
  t.is(sa.string.min(2).defaulted('12')(null), '12')
  t.deepEqual(sa.array.min(2).defaulted([1, 2])([4]), [4, null])
  t.deepEqual(sa.array.min(2).defaulted([1, 2])(''), [1, 2])
})
