import test from 'ava'
import sa from '../src'


test('# sa.require should throw error when origin value is not expected', t => {
  t.throws(() => sa.number.require()(''))
  t.throws(() => sa.bool.require()(''))
  t.throws(() => sa.array.require()(''))
  t.throws(() => sa.object.require()(''))
  t.throws(() => sa.string.require()(1))
})

test('# sa.require should throw error when called individually', t => {
  t.throws(() => sa.require()(), '[Sanitization Error] require should not be called individually')
})

test('# sa.require should return origin value when origin value is expected', t => {
  t.is(sa.number.require()(1), 1)
  t.is(sa.string.require()('string'), 'string')

  t.true(sa.bool.require()(true))

  const arr = []
  t.is(sa.array.require()(arr), arr)
  const obj = {}
  t.is(sa.object.require()(obj), obj)
})
