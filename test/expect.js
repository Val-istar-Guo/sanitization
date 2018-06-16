import test from 'ava'
import sa from '../src'


test('# sa.expect', t => {
  t.is(sa.expect(value => !!value)(1), 1)
  t.is(sa.expect(value => !!value)('123'), '123')
  t.is(sa.expect(value => !!value)(''), null)
  t.is(sa.expect(value => !!value)(0), null)
  t.is(sa.expect(value => !!value)(null), null)
  t.is(sa.expect(value => !!value)(undefined), null)
})
