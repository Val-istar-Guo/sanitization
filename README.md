# Sanitization

[![version](https://img.shields.io/npm/v/sanitization.svg?style=flat-square)](https://www.npmjs.com/package/sanitization)
[![downloads](https://img.shields.io/npm/dm/sanitization.svg?style=flat-square)](https://www.npmjs.com/package/sanitization)
[![dependencies](https://img.shields.io/david/Val-istar-Guo/sanitization.svg)](https://www.npmjs.com/package/sanitization)


Used to sanitize dirty data. see more:

* [Why i write sanitization](http://miaooo.me/article/%E4%B8%BA%E8%84%8F%E6%95%B0%E6%8D%AE%E6%B6%88%E6%AF%92)
* [API Document](https://github.com/Val-istar-Guo/sanitization/wiki/API-Documnet)

## Install

```bash
npm install sanitization
```

## Usage

```javascript
const dirtyData = {
  name: '袋袋购超市5周年店庆满100换购活动',
  // 正常来说，我们请求这条数据往往是知道这个数据是换购活动，所以类型字段对我们没有意义，可以剔除掉
  type: 2,
  // 如果minPrice字段不存在，我们无从判断参与活动的的门槛，需要爆出错误，让数据提供方尽快解决
  minPrice: 100,

  products: [
    {
      // 这种有价格没商品的很可能是后端产生的脏数据，应该过滤掉
      units: null,
      promotionPrice: 10,
    },
    {
      units: [
        { id: undefined, name: '卫生纸', number: 1, price: 5, photos: [{ url: 'xxx'}] },
      ],
      /**
       * 这个字段的重要性就不必多言了
       * 但是接口返回的是个非数字的字符串
       * 我们不知道需要消费者支付多少
       * 因此这个数据也需要舍弃，避免用户误操作
       */
      promotionPrice: '',
    },
    {
      // 没有商品只有价格？这不科学，需要舍弃
      units: [],
      promotionPrice: '1',
    },
    {
      units: [
        /**
         * 由于没有id，我们不能单独过滤掉这一个商品，而是需要将整个项目不予以显示
         * 因为老板要求的是两个一起换购，其中一个商品的数据出现问题的时候，
         * 这个换购项目理应不能让消费者看到，避免错误操作
         * number 也是一个非常重要的数字，这涉及到用户最终拿到的数量
         */
        { id: undefined, name: '卫生纸', number: 1, price: 5, photos: [{ url: 'xxx'}] },
        { id: 2, name: '晾衣架', number: 1, price: 15, photos: [] },
      ],
      /**
       * 这个字段的重要性就不必多言了
       * 但是接口返回的是个字符串
       * 我们更期望是一个数字
       */
      promotionPrice: '10',
    },
    {
      units: [
        { id: 3, name: '拖把', number: 1, price: 75, photos: [{ url: 'xxx'}] },
      ],
      promotionPrice: 40,
    },
  ]
}

const santize = sa.props({
  name: sa.string,
  minPrice: sa.number.required,
  products: sa.filter({
    units: sa.min(1).each({
      id: sa.number.required,
      name: sa.string,
      number: sa.number.required,
      price: sa.number,
      photos: sa.array,
    }),
    promotionPrice: sa.number.required
  })
})

/**
 * 由于接口可能存在bug，我们仅把用户能够安全操作的数据渲染给用户使用
 * 保证项目的稳定性
 */
const dirtyResult = {
  name: '袋袋购超市5周年店庆满100换购活动',
  minPrice: 100,

  products: [
    {
      units: [
        { id: 3, name: '拖把', number: 1, price: 75, photos: [{ url: 'xxx'}] },
      ],
      promotionPrice: 40,
    },
  ]
}

deepEqual(santize(dirtyData), dirtyResult)
```
