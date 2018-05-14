import { type, typeError, warn } from './utils'


const number = (min, context) => {
  if (type(context.value) !== 'number' || context.value <= min) {
    context.unexpect = true
    context.value = min
  }
}

const array = (min, context) => {
  if (type(context.value) !== 'array') {
    context.unexpect = true
    context.value = new Array(min)
  }
  else if (context.value.length <= min) {
    context.unexpect = true
    context.value = context.value.concat(new Array(min - context.value.length))
  }
}

const string = (min, context) => {
  if (type(context.value) !== 'string') {
    context.unexpect = true
    const arr = new Array(min)
    context.value = arr.fill(' ').join('')
  } else if (context.value.length <= min) {
    context.unexpect = true
    const arr = new Array(min - context.value.length)
    context.value = `${context.value}${arr.fill(' ').join('')}`
  }
}

export default (min) => {
  if (type(min) !== 'number') throw typeError(`min(value) value must be a number, but get ${type(min)}`)

  return (next, context) => () => {
    if (!('type' in context)) context.type = 'number'

    if (context.type === 'number') number(min, context)
    else if (context.type === 'array') array(min, context)
    else if (context.type === 'string') string(min, context)
    else warn('min should be call when type is array, string or number')

    next()
  }
}
