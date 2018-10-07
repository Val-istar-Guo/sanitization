import number from './number'
import string from './string'
import array from './array'


import { type, typeError, warn, isRequired, unSetDefaulted, combine } from './utils'


const maxNumber = max => (ctx, next) => {
  const valid = value => type(value) === 'number' && value <= max

  return () => {
    ctx.rules.push(`number should not more than ${max}`)
    const { value } = ctx

    if (type(value) !== 'number') {
      if (isRequired(ctx)) ctx.error = { expect: 'number', actual: type(value) }
      else if (unSetDefaulted(ctx, valid)) ctx.value = max
    } else if (value > max) {
      if (isRequired(ctx)) ctx.error = { expect: `less than ${max}`, actual: value }
      else if (unSetDefaulted(ctx, valid)) ctx.value = max
    }

    if (!ctx.error) next()
  }
}

const maxArray = max => (ctx, next) => {
  const valid = value => value.length <= max

  return () => {
    ctx.rules.push(`array.length should not more than ${max}`)
    const { value } = ctx

    if (type(value) !== 'array') {
      if (isRequired(ctx)) ctx.error = { expect: 'array', actual: type(value) }
      else if (unSetDefaulted(ctx, valid)) ctx.value = []
    } else if (value.length > max) {
      if (isRequired(ctx, valid)) ctx.error = { expect: `length less than ${max}`, actual: `length is ${value.length}`}
      else ctx.value = ctx.value.slice(0, max)
    }

    if (!ctx.error) next()
  }
}

const maxString = max => (ctx, next) => {
  const valid = value => value.length <= max

  return () => {
    ctx.rules.push(`string.length should not more than ${max}`)
    const { value } = ctx

    if (type(value) !== 'string') {
      if (isRequired(ctx)) ctx.error = { expect: 'string', actual: type(value) }
      else if (unSetDefaulted(ctx, valid)) ctx.value = ''
    } else if (value.length > max) {
      if (isRequired(ctx)) ctx.error = { expect: `length less than ${max}`, actual: `length is ${value.length}` }
      else if (unSetDefaulted(ctx, valid)) ctx.value = ctx.value.substr(0, max)
    }

    if (!ctx.error) next()
  }
}

export default (max) => {
  if (type(max) !== 'number') throw typeError(`max(value) value must be a number, but get ${type(max)}`)

  return (ctx, next) => () => {
    if (!('type' in ctx)) combine(number, maxNumber(max))(ctx, next)()
    else if (ctx.type === 'number') combine(number, maxNumber(max))(ctx, next)()
    else if (ctx.type === 'array') combine(array, maxArray(max))(ctx, next)()
    else if (ctx.type === 'string') combine(string, maxString(max))(ctx, next)()
    else {
      warn('max should be call when type is array, string or number')
      if (!ctx.error) next()
    }
  }
}
