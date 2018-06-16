import test from 'ava'
import sa from '../src'


test('# sa.func', t => {
  const f = value => value
  t.is(sa.func(f), f)
  t.is(sa.func(null)(), undefined)
  t.throws(() => sa.func.required(null))
})
