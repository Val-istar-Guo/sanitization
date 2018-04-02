import test from 'ava'
import sa from '../src'


test('# sa.len(min, max) should output array that length between min and max', t => {
  const minArr = []
  const longArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

  t.deepEqual(sa.len(4)(minArr), [null, null, null, null])
  t.deepEqual(sa.len(4, 6)(null), [null, null, null, null])
  t.deepEqual(sa.len(0, 8)(longArr), [1, 2, 3, 4, 5, 6, 7, 8])
})
