import test from 'ava'
import sa from '../src'



test('# sa.keys should output object and accept object as rules', t => {
  const data = {
    // 有效字符串
    productName: '123',
    // 无效字符串
    rate: null,
    // 有效数字
    type: 222,
    // 空数字
    id: null,
    // 有效数组
    photos: [],
    // 空数组
    products: null,
    // 多级验证
    rule: {
      max: 10,
      min: 0,
      canEdit: 1,
    },

    extra: 'extra prop should be throw',
  }

  const sanitize = sa.keys({
    productName: sa.string,
    rate: sa.string,
    type: sa.number,
    id: sa.number.defaulted(0),
    photos: sa.array,
    products: sa.array,
    rule: {
      max: sa.number,
      min: sa.number,
      canEdit: sa.bool,
    },
  })

  const result = {
    productName: '123',
    rate: '',
    type: 222,
    id: 0,
    photos: [],
    products: [],
    rule: {
      max: 10,
      min: 0,
      canEdit: true,
    },
  }

  t.deepEqual(sanitize(data), result)
});
