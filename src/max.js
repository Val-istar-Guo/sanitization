import { type, typeError, warn } from './utils'


const number = (max, context) => {
  if (type(context.value) !== 'number' || context.value >= max) {
    context.unexpect = true
    context.value = max
  }
}

const array = (max, context) => {
  if (type(context.value) !== 'array') {
    context.unexpect = true
    context.value = []
  }
  else if (context.value.length >= max) {
    context.unexpect = true
    context.value = context.value.slice(0, max)
  }
}

const string = (max, context) => {
  if (type(context.value) !== 'string') {
    context.unexpect = true
    context.value = ''
  }
  else if (context.value.length >= max) {
    context.unexpect = true
    context.value = context.value.substr(0, max)
  }
}

export default (max) => {
  if (type(max) !== 'number') throw typeError(`max(value) value must be a number, but get ${type(max)}`)

  return (next, context) => () => {
    if (!('type in context')) context.type = 'number'

    if (!('type' in context) || context.type === 'number') number(max, context)
    else if (context.type === 'array') array(max, context)
    else if (context.type === 'string') string(max, context)
    else warn('max should be call when type is array, string or number')

    next()
  }
}
