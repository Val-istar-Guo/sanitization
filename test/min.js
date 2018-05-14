import test from 'ava'
import sa from '../src'


test('# sa.min', t => {
  t.is(sa.min(3)(2), 3)
  t.deepEqual(sa.array.min(3)([1, 2]), [1, 2, undefined])
  t.deepEqual(sa.string.min(3)('12'), '12 ')
  t.deepEqual(sa.string.min(3)(null), '   ')

  t.is(sa.min(1).defaulted(5)(0), 5)
  t.throws(() => sa.min(1).required()(0))
})
