import test from 'ava'
import sa from '../src'


test('# sa.float', t => {
  t.is(sa.float(123), 123)
  t.is(sa.float(123.123), 123.123)
  t.is(sa.float(123.567), 123.567)
  t.is(sa.float('123'), 123)
  t.is(sa.float('123.123'), 123.123)
  t.is(sa.float('123.567'), 123.567)

  t.is(sa.float('abc'), NaN)
  t.is(sa.float({}), NaN)

  t.throws(() => sa.float.required('123'))
  t.throws(() => sa.float.required({}))
})

test('# sa.string.float', t => {
  t.is(sa.string.float('123'), '123')
  t.is(sa.string.float('123.123'), '123.123')
  t.is(sa.string.float('123.567'), '123.567')
  t.is(sa.string.float('abc'), '')
  t.is(sa.string.float({}), '')
  t.is(sa.string.float(123), '123')
  t.is(sa.string.float(123.123), '123.123')
  t.is(sa.string.float(123.567), '123.567')

  t.throws(() => sa.string.float.required(123))
  t.throws(() => sa.string.float.required({}))
})
