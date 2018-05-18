import { identify, appError } from './utils'

import string from './string';
import regexp from './regexp'

import array from './array'
import filter from './filter'
import each from './each'

import object from './object'
import keys from './keys'

import required from './required'
import defaulted from './defaulted'

import number from './number'
import bool from './bool'

import min from './min'
import max from './max'


const serialize = (func, wrap, context) => (value, error = true, next = identify) => {
  return func(value, error, wrap(next, context), context)
}

const createNext = (deep, context, func) => next => {
  if (!deep) context = {}
  return descorator(serialize(func, next, context), deep + 1, context)
}

const descorator = (func, deep = 0, context) => {
  const next = createNext(deep, context, func)
  Object.defineProperties(func, {
    string: { get: () => next(string) },
    stringify: { get: () => next(string) },
    number: { get: () => next(number) },
    array: { get: () => next(array) },
    object: { get: () => next(object) },
    bool: { get: () => next(bool) },
    required: { get: () => next(required) },
  })

  func.keys = (...arg) => next(keys(...arg))
  func.filter = (...arg) => next(filter(...arg))
  func.each = (...arg) => next(each(...arg))

  func.defaulted = (...arg) => next(defaulted(...arg))

  func.regexp = (...arg) => next(regexp(...arg))

  func.min = (...arg) => next(min(...arg))
  func.max = (...arg) => next(max(...arg))

  return func;
}

export default descorator((value, error = true, next = identify, context) => {
  context.value = value
  context.origin = value
  context.error = null

  next()

  if (error) {
    if (!context.error) return context.value;
    else throw appError(`unexpect value: ${value}`)
  }

  return context;
})
