import { type, typeError, warn, isRequired, unSetDefaulted } from './utils'


const number = (min, context) => {
  const { value } = context

  if (type(value) !== 'number') {
    if (isRequired(context)) context.error = { expect: 'number', actual: type(value) }
    else if (unSetDefaulted(context)) context.value = max
  } else if (value < min) {
    if (isRequired(context)) context.error = { expect: `greater than ${min}`, actual: value }
    else if (unSetDefaulted(context)) context.value = min
  }
}

const array = (min, context) => {
  const { value } = context

  if (type(value) !== 'array') {
    if (isRequired(context)) context.error = { expect: 'array', actual: type(value)}
    else if (unSetDefaulted(context)) context.value = new Array(min).fill(null)
  } else if (value.length < min) {
    if (isRequired(context)) context.error = { expect: `length greater than ${min}`, actual: `length is ${value.length}` }
    else context.value = context.value.concat(new Array(min - context.value.length).fill(null))
  }
}

const string = (min, context) => {
  const { value } = context

  if (type(value) !== 'string') {
    if (isRequired(context)) context.error = { expect: 'string', actual: type(value) }
    else if (unSetDefaulted(context)) context.value = new Array(min).fill(' ').join('')
  } else if (context.value.length < min) {
    if (isRequired(context)) context.error = { expect: `length greater than ${min}`, actual: `length is ${value.length}` }
    else if (unSetDefaulted(context)){
      const arr = new Array(min - context.value.length)
      context.value = `${context.value}${arr.fill(' ').join('')}`
    }
  }
}

export default (min) => {
  if (type(min) !== 'number') throw typeError(`min(value) value must be a number, but get ${type(min)}`)

  return (next, context) => () => {
    if (!('type' in context) || context.type === 'number') number(min, context)
    else if (context.type === 'array') array(min, context)
    else if (context.type === 'string') string(min, context)
    else warn('min should be call when type is array, string or number')

    if (!context.error) next()
  }
}
