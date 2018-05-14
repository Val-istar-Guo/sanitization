import test from 'ava'
import sa from '../src'


test('# sa.stringify', t => {
  t.is(sa.number.stringify(null), '')
  t.is(sa.number.stringify([]), '')
  t.is(sa.number.stringify({}), '')
  t.is(sa.number.stringify(true), '')
  t.is(sa.number.stringify(false), '')
})
