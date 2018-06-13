import test from 'ava'
import sa from '../src'


test('# sa.valid', t => {
  t.is(sa.valid([1, 2, 3])(2), 2)
  t.is(sa.valid(['a', 'b', 'c'])('d'), 'a')
  t.is(sa.valid(['a', 'b', 'c'])(true), 'a')
  t.is(sa.valid(['a', 'b', 'c'])(null), 'a')
})

test('# sa.valid must pass in an non-null array type argument', t => {
  t.throws(() => sa.valid())
  t.throws(() => sa.valid([]))
})
