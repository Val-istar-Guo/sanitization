import test from 'ava'
import sa from '../src'


test('# sa.any', t => {
  t.is(sa.any(1), 1)
  t.is(sa.any(null), null)
  t.is(sa.any('1123'), '1123')
  t.is(sa.any(undefined), undefined)
  const o = {}
  t.is(sa.any(o), o)
})
