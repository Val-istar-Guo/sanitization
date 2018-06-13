import test from 'ava'
import sa from '../src'


test('# sa.oneOf', t => {
  t.is(sa.oneOf([1, 2, 3])(2), 2)
  t.is(sa.oneOf(['a', 'b', 'c'])('d'), 'a')
  t.is(sa.oneOf(['a', 'b', 'c'])(true), 'a')
  t.is(sa.oneOf(['a', 'b', 'c'])(null), 'a')
})

test('# sa.oneOf must pass in an non-null array type argument', t => {
  t.throws(() => sa.oneOf())
  t.throws(() => sa.oneOf([]))
})
