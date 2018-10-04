import test from 'ava'
import sa from '../src'


test('# sa.int', t => {
  t.is(sa.int(123), 123)
  t.is(sa.int(123.123), 123)
  t.is(sa.int(123.567), 124)
  t.is(sa.int('123'), 123)
  t.is(sa.int('123.123'), 123)
  t.is(sa.int('123.567'), 124)

  t.is(sa.int('abc'), NaN)
  t.is(sa.int({}), NaN)

  t.throws(() => sa.int.required('123'))
  t.throws(() => sa.int.required({}))
})

test('# sa.string.int', t => {
  t.is(sa.string.int('123'), '123')
  t.is(sa.string.int('123.123'), '123')
  t.is(sa.string.int('123.567'), '124')
  t.is(sa.string.int('abc'), '')
  t.is(sa.string.int({}), '')
  t.is(sa.string.int(123), '123')
  t.is(sa.string.int(123.123), '123')
  t.is(sa.string.int(123.567), '124')

  t.throws(() => sa.string.int.required(123))
  t.throws(() => sa.string.int.required({}))
})
