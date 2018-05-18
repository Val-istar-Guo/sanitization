import test from 'ava'
import sa from '../src'


test('# regexp', t => {
  t.is(sa.regexp(/\d+/)(1), '1')
  t.is(sa.regexp(/\d+/)('abc'), 'abc')
  t.is(sa.regexp(/\d+/).defaulted('2')('asd'), '2')
  t.throws(() => sa.regexp(/\d+/).required('abc'))
})
