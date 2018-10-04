import test from 'ava'
import sa from '../src'


test.only('# sa.len', t => {
  // t.is(sa.len(3)('123'), '123')
  t.is(sa.len(3)([1, 2, 3]), '   ')
  // t.is(sa.len(3)('12'), '12 ')
  // t.is(sa.len(3)('1234'), '123')

  // t.throws(() => sa.len.required(3)('12'))
  // t.throws(() => sa.len.required(3)('1234'))
  // t.throws(() => sa.len.required(3)([1,2, 4]))
  // t.throws(() => sa.len.required(3)({}))
})

test('# sa.array.len', t => {
  t.deepEqual(sa.array.len(3)([1, 2, 3]), [1, 2, 3])
  t.deepEqual(sa.array.len(3)([1, 2, 3, 4]), [1, 2, 3])
  t.deepEqual(sa.array.len(3)([1, 2]), [1, 2, null])

  t.throws(() => sa.array.len(3).required(3)([1, 2]))
  t.throws(() => sa.array.len(3).required(3)([1, 2, 3, 4]))
  t.throws(() => sa.array.len(3).required(3)({}))
  t.throws(() => sa.array.len(3).required(3)('123'))
})
