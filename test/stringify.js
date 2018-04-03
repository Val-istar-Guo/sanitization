import test from 'ava'
import sa from '../src'


test('# sa.stringify', t => {
  t.is(sa.number.stringify(123), '123')
  t.is(sa.number.stringify(null), '')
  t.is(sa.number.stringify([]), '')
  t.is(sa.number.stringify({}), '')
  t.is(sa.number.stringify(true), '1')
  t.is(sa.number.stringify(false), '0')
})
