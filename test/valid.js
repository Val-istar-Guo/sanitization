import test from 'ava'
import sa from '../src'


test('# sa.valid(array_param)', t => {
  t.is(sa.valid([1, 2, 3])(2), 2)
  t.is(sa.valid(['a', 'b', 'c'])('d'), 'a')
  t.is(sa.valid(['a', 'b', 'c'])(true), 'a')
  t.is(sa.valid(['a', 'b', 'c'])(null), 'a')
})

test('# sa.valid(defferent_types)', t => {
  t.is(sa.valid([1, '2', '3'])(1), 1)
  t.is(sa.valid([1, '2', '3'])(2), 1)
})

test('# sa.valid(object_param)', t => {
  t.is(sa.valid({ GROUP_A: 1, GROUP_B: 2, GROUP_C: 3 })(2), 2)
  t.is(sa.valid({ GROUP_A: 'a', GROUP_B: 'b', GROUP_C: 'c' })('d'), 'a')
  t.is(sa.valid({ GROUP_A: 'a', GROUP_B: 'b', GROUP_C: 'c' })(true), 'a')
  t.is(sa.valid({ GROUP_A: 'a', GROUP_B: 'b', GROUP_C: 'c' })(null), 'a')
})

test('# sa.valid must pass in an non-null array type argument', t => {
  t.throws(() => sa.valid())
  t.throws(() => sa.valid([]))
})
