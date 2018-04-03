import test from 'ava'
import sa from '../src'


test('# sa.number should output original number when input number', t => {
  t.is(sa.number(1), 1)
})

test('# sa.number should output NaN when input is undefined, null, array, object or function', t => {
  t.is(sa.number(null), NaN)
  t.is(sa.number(undefined), NaN)
  t.is(sa.number([]), NaN)
  t.is(sa.number({}), NaN)
  t.is(sa.number(() => {}), NaN)
})

test('# sa.number should output 0/1 when input is false/true', t => {
  t.is(sa.number(false), 0)
  t.is(sa.number(true), 1)
})

test("# sa.number.require() should output 12345(number) when input '12345'(string)", t => {
  t.is(sa.number.require()('12345'), 12345)
})
