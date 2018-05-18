import { type, typeError, warn, isRequired, unSetDefaulted } from './utils'


const number = (max, context) => {
  const { value } = context

  if (type(value) !== 'number') {
    if (isRequired(context)) context.error = { expect: 'number', actual: type(value) }
    else if (unSetDefaulted(context)) context.value = max
  } else if (context.value > max) {
    if (isRequired(context)) context.error = { expect: `less than ${max}`, actual: value }
    else if (unSetDefaulted(context)) context.value = max
  }
}

const array = (max, context) => {
  const { value } = context

  if (type(value) !== 'array') {
    if (isRequired(context)) context.error = { expect: 'array', actual: type(value) }
    else if (unSetDefaulted(context)) context.value = []
  } else if (context.value.length > max) {
    if (isRequired(context)) context.error = { expect: `length less than ${max}`, actual: `length is ${value.length}`}
    else context.value = context.value.slice(0, max)
  }
}

const string = (max, context) => {
  const { value } = context

  if (type(context.value) !== 'string') {
    if (isRequired(context)) context.error = { expect: 'string', actual: type(value) }
    else if (unSetDefaulted(context)) context.value = ''
  } else if (context.value.length > max) {
    if (isRequired(context)) context.error = { expect: 'length less than ${max}', actual: `length is ${value.length}` }
    else if (unSetDefaulted(context)) context.value = context.value.substr(0, max)
  }
}

export default (max) => {
  if (type(max) !== 'number') throw typeError(`max(value) value must be a number, but get ${type(max)}`)

  return (next, context) => () => {
    if (!('type' in context) || context.type === 'number') number(max, context)
    else if (context.type === 'array') array(max, context)
    else if (context.type === 'string') string(max, context)
    else warn('max should be call when type is array, string or number')

    if (!context.value) next()
  }
}
