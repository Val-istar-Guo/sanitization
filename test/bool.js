import test from 'ava'
import sa from '../src'


test('# sa.bool should output bool when input bool', t => {
  t.true(sa.bool(true))
  t.false(sa.bool(false))
})

test("# sa.bool should output false when input null, undefined, zero or ''(empty string)", t => {
  t.false(sa.bool(null))
  t.false(sa.bool(undefined))
  t.false(sa.bool(0))
  t.false(sa.bool(''))
})

test('# sa.bool should output true when input array, object or number(exclude zero)', t => {
  t.true(sa.bool([]))
  t.true(sa.bool({}))
  t.true(sa.bool(1234567890))
})
