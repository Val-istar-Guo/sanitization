import test from 'ava'
import sa from '../src'


test('# sa.string should output original string when input string', t => {
  t.is(sa.string('string'), 'string')
})

test('# sa.string should output \'\'(empty string) when input is undefined, null, array, object or function', t => {
  t.is(sa.string(null), '')
  t.is(sa.string(undefined), '')
  t.is(sa.string([]), '')
  t.is(sa.string({}), '')
  t.is(sa.string(() => {}), '')
})

test('# sa.number should output string when input number', t => {
  t.is(sa.string(1), '1')
  t.is(sa.string(123456789), '123456789')
})

test('# sa.string should output \'true\'/\'false\' when input true/false', t => {
  t.is(sa.string(true), 'true')
  t.is(sa.string(false), 'false')
})
