import genString from './utils/genString'
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
import len from './len'

import valid from './valid'
import expect from './expect'

import int from './int'
import float from './float'

import { link } from './utils'


const descorator = handler => {
  // const connect = (next, name) => descorator(link(handler, next, name))
  const connect = (next, name) => descorator(link(handler, next, { name }))

  Object.defineProperties(handler, {
    string: { get: () => connect(string, 'string') },
    stringify: { get: () => connect(string, 'stringify') },
    number: { get: () => connect(number, 'number') },
    array: { get: () => connect(array, 'array') },
    object: { get: () => connect(object, 'object') },
    bool: { get: () => connect(bool, 'bool') },
    func: { get: () => connect(func, 'func') },
    function: { get: () => connect(func, 'function') },
    required: { get: () => connect(required, 'required') },
    any: { get: () => connect(any, 'any') },
    int: { get: () => connect(int, 'int') },
    float: { get: () => connect(float, 'float') },
  })

  // const cconnect = (next, name) => (...arg) => connect(next(...arg), `${name}(${arg.join(', ')})`)
  const cconnect = (next, name) => (...args) => descorator(link(handler, next(...args), {
    name,
    args: args.map(genString).join(', '),
  }))

  handler.keys = cconnect(keys, 'keys')
  handler.filter = cconnect(filter, 'filter')
  handler.each = cconnect(each, 'each')
  handler.defaulted = cconnect(defaulted, 'defaulted')
  handler.regexp = cconnect(regexp, 'regexp')
  handler.min = cconnect(min, 'min')
  handler.max = cconnect(max, 'max')
  handler.len = cconnect(len, `len`)
  handler.valid = cconnect(valid, 'valid')
  handler.oneOf = cconnect(valid, 'oneOf')
  handler.expect = cconnect(expect, 'expect')

  return handler;
}

export default descorator
