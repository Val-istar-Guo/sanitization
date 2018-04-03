# Sanitization

[![version](https://img.shields.io/npm/v/sanitization.svg?style=flat-square)](https://www.npmjs.com/package/sanitization)
[![downloads](https://img.shields.io/npm/dm/sanitization.svg?style=flat-square)](https://www.npmjs.com/package/sanitization)


Used to sanitize dirty data

[Why i write sanitization](http://miaooo.me/article/%E4%B8%BA%E8%84%8F%E6%95%B0%E6%8D%AE%E6%B6%88%E6%AF%92)

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
      //
      promotionPrice: '40',
    },
  ]
}

const santize = sa.props({
  name: sa.string,
  minPrice: sa.number.require(),
  products: sa.filter({
    units: sa.len(1).each({
      id: sa.number.require(),
      name: sa.string,
      number: sa.number.require(),
      price: sa.number,
      photos: sa.array,
    }),
    promotionPrice: sa.number.require()
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


## API

### sa.string

字段如果是数字，则转化为对应的字符串，如果是其他非字符串的值，则返回空字符串。

### sa.number

字段如果是数字或类似数字的字符串（'123')，则返回字符串，否则返回NaN

### sa.number.stringify

`.stringify`是`.string`的语法糖，会把数字转化为字符串，NaN则转化为空字符串

### sa.array

字段如果不是数组，则设置为空数组

### sa.object

字段如果不是`Object`，则转化为空对象

### sa.bool

字段如果不是布尔类型，则通过`!!value`强制转化为布尔类型

### sa.require(validator)

validator输入是字段内容，输出`boolean`，如果返回`false`则向上层汇报字段错误

### sa.[string/number/array/object/bool].default([value])

以`sa.string.default(value)`举例，如果字段不是字符串，则设置为默认值`value`。
注意：`sa.number.default(value)`代表如果字段内容不是数字或者类似数字的字符串（'123')，则设定默认值`value`。

### sa.props(config)

根据配置验证并过滤对象的属性值，config结构与被验证对象基本一致，详见Usage中的使用

### sa.filter(func/object)

将数组中不符合要求的的内容过滤掉。
`sa.filter(sa.number.require())`将数组中的非数字过滤掉。
注意：如果参数是object，则自动转化为 sa.filter(sa.props(object))，用以验证数组每一项Object

### sa.each(func/object)

与sa.filter类似，不同之处要求数组中存在的每个数值必须都不能上报错误，
如果某一项上报错误，则认为该数组字段出错，并上报这个字段的验证错误。

`sa.each(sa.number.require())` 数组的每一项必须为数字
`sa.each(sa.string)` 因为只有`.require()`才会上报错误，其他的操作都会赋予默认值，
因此这个会将数组内非数字转化为NaN，而不会出现上报错误。

### sa.len(number)

数组的长度至少为number，如果少于number，则在数组结尾填充null补齐数量。
配合each使用，可以将数量不足的数组上报错误。

`sa.len(1).each(sa.number.require())`数组的每一项都必须为数字，并且长度大于一。
如果数组长度小于1，由于`len(1)`自动填充的null非数字，所以会导致上报错误。
