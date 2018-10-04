import func from './func'
import any from './any'

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

import valid from './valid'
import expect from './expect'

import int from './int'


import { link } from './utils'



const descorator = handler => {
  const connect = next => descorator(link(handler, next))

  Object.defineProperties(handler, {
    string: { get: () => connect(string) },
    stringify: { get: () => connect(string) },
    number: { get: () => connect(number) },
    array: { get: () => connect(array) },
    object: { get: () => connect(object) },
    bool: { get: () => connect(bool) },
    func: { get: () => connect(func) },
    function: { get: () => connect(func) },
    required: { get: () => connect(required) },
    any: { get: () => connect(any) },
    int: { get: () => connect(int) },
  })

  handler.keys = (...arg) => connect(keys(...arg))
  handler.filter = (...arg) => connect(filter(...arg))
  handler.each = (...arg) => connect(each(...arg))

  handler.defaulted = (...arg) => connect(defaulted(...arg))

  handler.regexp = (...arg) => connect(regexp(...arg))

  handler.min = (...arg) => connect(min(...arg))
  handler.max = (...arg) => connect(max(...arg))
  handler.valid = (...arg) => connect(valid(...arg))
  // handler.oneOf = (...arg) => connect(valid(...arg))
  handler.oneOf = handler.valid
  handler.expect = (...arg) => connect(expect(...arg))

  return handler;
}

export default descorator
