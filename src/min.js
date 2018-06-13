import number from './number'
import string from './string'
import array from './array'
import { type, typeError, warn, isRequired, unSetDefaulted, serialize } from './utils'


const minNumber = min => (next, context) => {
  const valid = value => type(value) === 'number' && value >= min

  return () => {
    const { value } = context

    if (type(value) !== 'number') {
      if (isRequired(context)) context.error = { expect: 'number', actual: type(value) }
      else if (unSetDefaulted(context, valid)) context.value = min
    } else if (value < min) {
      if (isRequired(context)) context.error = { expect: `greater than ${min}`, actual: value }
      else if (unSetDefaulted(context, valid)) context.value = min
    }

    if (!context.error) next()
  }
}

const minArray = min => (next, context) => {
  const valid = value => value.length >= min

  return () => {
    const { value } = context

    if (type(value) !== 'array') {
      if (isRequired(context)) context.error = { expect: 'array', actual: type(value) }
      else if (unSetDefaulted(context, valid)) context.value = new Array(min).fill(null)
    } else if (value.length < min) {
      if (isRequired(context, valid)) context.error = { expect: `length greater than ${min}`, actual: `length is ${value.length}`}
      else context.value = context.value.concat(new Array(min - context.value.length).fill(null))
    }

    if (!context.error) next()
  }
}

const minString = min => (next, context) => {
  const valid = value => value.length >= min

  return () => {
    const { value } = context

    if (type(value) !== 'string') {
      if (isRequired(context)) context.error = { expect: 'string', actual: type(value) }
      else if (unSetDefaulted(context, valid)) context.value = new Array(min).fill(' ').join('')
    } else if (value.length < min) {
      if (isRequired(context)) context.error = { expect: `length greater than ${min}`, actual: `length is ${value.length}` }
      else if (unSetDefaulted(context, valid)) {
        const arr = new Array(min - context.value.length)
        context.value = `${context.value}${arr.fill(' ').join('')}`
      }
    }

    if (!context.error) next()
  }
}

export default (min) => {
  if (type(min) !== 'number') throw typeError(`min(value) value must be a number, but get ${type(min)}`)

  return (next, context) => () => {
    if (!('type' in context)) serialize(number, minNumber(min))(next, context)()
    else if (context.type === 'number') serialize(number, minNumber(min))(next, context)()
    else if (context.type === 'array') serialize(array, minArray(min))(next, context)()
    else if (context.type === 'string') serialize(string, minString(min))(next, context)()
    else {
      warn('min should be call when type is array, string or number')
      if (!context.error) next()
    }
  }
}
