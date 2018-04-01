import test from 'ava'
import sa from '../src'


test('# sa.object should output object when input is object', t => {
  const emptyObject = {}
  const complexObject = { title: '时间捡屎' }
  t.is(sa.object(emptyObject), emptyObject)
  t.is(sa.object(complexObject), complexObject)
})

test("# sa.object should output {} when input isn't object", t => {
  t.deepEqual(sa.object(undefined), {})
  t.deepEqual(sa.object(null), {})
  t.deepEqual(sa.object([{ title: '时间捡屎' }]), {})
  t.deepEqual(sa.object(true), {})
  t.deepEqual(sa.object(false), {})
  t.deepEqual(sa.object(() => {}), {})
  t.deepEqual(sa.object('string'), {})
  t.deepEqual(sa.object(123456789), {})
})
