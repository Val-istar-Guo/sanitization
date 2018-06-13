import number from './number'
import string from './string'
import array from './array'


import { type, typeError, warn, isRequired, unSetDefaulted, serialize } from './utils'


const maxNumber = max => (next, context) => {
  const valid = value => type(value) === 'number' && value <= max

  return () => {
    const { value } = context

    if (type(value) !== 'number') {
      if (isRequired(context)) context.error = { expect: 'number', actual: type(value) }
      else if (unSetDefaulted(context, valid)) context.value = max
    } else if (value > max) {
      if (isRequired(context)) context.error = { expect: `less than ${max}`, actual: value }
      else if (unSetDefaulted(context, valid)) context.value = max
    }

    if (!context.error) next()
  }
}

const maxArray = max => (next, context) => {
  const valid = value => value.length <= max

  return () => {
    const { value } = context

    if (type(value) !== 'array') {
      if (isRequired(context)) context.error = { expect: 'array', actual: type(value) }
      else if (unSetDefaulted(context, valid)) context.value = []
    } else if (value.length > max) {
      if (isRequired(context, valid)) context.error = { expect: `length less than ${max}`, actual: `length is ${value.length}`}
      else context.value = context.value.slice(0, max)
    }

    if (!context.error) next()
  }
}

const maxString = max => (next, context) => {
  const valid = value => value.length <= max

  return () => {
    const { value } = context

    if (type(value) !== 'string') {
      if (isRequired(context)) context.error = { expect: 'string', actual: type(value) }
      else if (unSetDefaulted(context, valid)) context.value = ''
    } else if (value.length > max) {
      if (isRequired(context)) context.error = { expect: `length less than ${max}`, actual: `length is ${value.length}` }
      else if (unSetDefaulted(context, valid)) context.value = context.value.substr(0, max)
    }

    if (!context.error) next()
  }
}

export default (max) => {
  if (type(max) !== 'number') throw typeError(`max(value) value must be a number, but get ${type(max)}`)

  return (next, context) => () => {
    if (!('type' in context)) serialize(number, maxNumber(max))(next, context)()
    else if (context.type === 'number') serialize(number, maxNumber(max))(next, context)()
    else if (context.type === 'array') serialize(array, maxArray(max))(next, context)()
    else if (context.type === 'string') serialize(string, maxString(max))(next, context)()
    else {
      warn('max should be call when type is array, string or number')
      if (!context.error) next()
    }
  }
}
