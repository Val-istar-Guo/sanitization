import test from 'ava'
import sa from '../src'


test('# sa.array should output array when input array', t => {
  const emptyArr = []
  const complexArr = [
    { title: '爱丽丝梦游仙境' },
    { title: '白雪公主和七个小矮人' },
    { title: '时间捡屎' },
  ];
  t.is(sa.array(emptyArr), emptyArr)
  t.is(sa.array(complexArr), complexArr)
})

test("# sa.array should output [] when input non-array", t => {
  t.deepEqual(sa.array(undefined), [])
  t.deepEqual(sa.array(null), [])
  t.deepEqual(sa.array({ title: '时间捡屎' }), [])
  t.deepEqual(sa.array(true), [])
  t.deepEqual(sa.array(false), [])
  t.deepEqual(sa.array(() => {}), [])
  t.deepEqual(sa.array('string'), [])
  t.deepEqual(sa.array(123456789), [])
})
