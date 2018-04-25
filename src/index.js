import { identify } from './utils'
import array from './array'
import string from './string';
import number from './number'
import object from './object'
import bool from './bool'

import filter from './filter'
import each from './each'
import keys from './keys'

import req from './require'
import def from './default'
import len from './length'


const serialize = (func, wrap) => (value, error = true, next = identify) => {
  // console.log('serialize: ', func, value, func(value))
  return func(value, error, wrap(next))
}

const descorator = func => {
  Object.defineProperty(func, 'string', { get: () =>  descorator(serialize(func, string)) })
  Object.defineProperty(func, 'stringify', { get: () =>  descorator(serialize(func, string)) })
  Object.defineProperty(func, 'number', { get: () => descorator(serialize(func, number)) })
  Object.defineProperty(func, 'array', { get: () => descorator(serialize(func, array)) })
  Object.defineProperty(func, 'object', { get: () => descorator(serialize(func, object)) })
  Object.defineProperty(func, 'bool', { get: () => descorator(serialize(func, bool)) })

  func.keys = (...arg) => descorator(serialize(func, keys(...arg)))
  func.filter = (...arg) => descorator(serialize(func, filter(...arg)))
  func.each = (...arg) => descorator(serialize(func, each(...arg)))

  func.default = (...arg) => descorator(serialize(func, def(...arg)))
  func.require = (...arg) => descorator(serialize(func, req(...arg)))
  func.len = (...arg) => descorator(serialize(func, len(...arg)))

  return func;
}

export default descorator((value, error = true, next = identify) => {
  let context = { value, origin: value, pass: true }
  context = next(context)

  if (error) {
    if (context.pass) return context.value;
    else throw new Error('')
  }

  return context;
})
