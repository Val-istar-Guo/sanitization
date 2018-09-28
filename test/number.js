import test from 'ava'
import sa from '../src'


test('# sa.number should output original number when input number', t => {
  t.is(sa.number(1), 1)
})

test('# sa.number output number when input numeric string', t => {
  t.is(sa.number('1'), 1)
})

test('# sa.number should output NaN when input is undefined, null, array, object or function', t => {
  t.is(sa.number(null), NaN)
  t.is(sa.number(undefined), NaN)
  t.is(sa.number([]), NaN)
  t.is(sa.number({}), NaN)
  t.is(sa.number(() => {}), NaN)
  t.is(sa.number(false), NaN)
  t.is(sa.number(true), NaN)
})
