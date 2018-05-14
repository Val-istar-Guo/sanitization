import test from 'ava'
import sa from '../src'


test('# sa.filter should filter item that not pass', t => {
  const arr = [
    { title: '1', content: 'c1' },
    { title: '2', content: 'c2' },
    { title: '3', content: null },
    { title: 4, content: 'c4' },
    { title: 4, content: true },
    { title: '5', content: {} },
  ]

  const sanitize = sa.filter({
    title: sa.string.required(),
    content: sa.string,
  })

  const result = [
    { title: '1', content: 'c1' },
    { title: '2', content: 'c2' },
    { title: '3', content: '' },
    { title: '5', content: '' },
  ]

  t.deepEqual(sanitize(arr), result)
})
