import { identify, appError } from './utils'
import array from './array'
import string from './string';
import number from './number'
import object from './object'
import bool from './bool'

import filter from './filter'
import each from './each'
import keys from './keys'

import required from './required'
import defaulted from './defaulted'

import min from './min'
import max from './max'


const serialize = (func, wrap, context) => (value, error = true, next = identify) => {
  return func(value, error, wrap(next, context), context)
}

const createGetter = (deep, context, func, next) => {
  if (!deep) context = {}
  return descorator(serialize(func, next, context), deep + 1, context)
}

const descorator = (func, deep = 0, context) => {
  Object.defineProperty(func, 'string', { get: () =>  createGetter(deep, context, func, string) })
  Object.defineProperty(func, 'stringify', { get: () =>  createGetter(deep, context, func, string) })
  Object.defineProperty(func, 'number', { get: () => createGetter(deep, context, func, number) })
  Object.defineProperty(func, 'array', { get: () => createGetter(deep, context, func, array) })
  Object.defineProperty(func, 'object', { get: () => createGetter(deep, context, func, object) })
  Object.defineProperty(func, 'bool', { get: () => createGetter(deep, context, func, bool) })

  func.keys = (...arg) => createGetter(deep, context, func, keys(...arg))
  func.filter = (...arg) => createGetter(deep, context, func, filter(...arg))
  func.each = (...arg) => createGetter(deep, context, func, each(...arg))

  func.defaulted = (...arg) => createGetter(deep, context, func, defaulted(...arg))
  func.required = (...arg) => createGetter(deep, context, func, required(...arg))

  func.min = (...arg) => createGetter(deep, context, func, min(...arg))
  func.max = (...arg) => createGetter(deep, context, func, max(...arg))

  return func;
}

export default descorator((value, error = true, next = identify, context) => {
  context.value = value
  context.origin = value
  context.pass = true

  next()

  if (error) {
    if (context.pass) return context.value;
    else throw appError(`unexpect value: ${value}`)
  }

  return context;
})
