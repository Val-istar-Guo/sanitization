import number from './number'
import string from './string'
import array from './array'
import { type, typeError, warn, isRequired, unSetDefaulted, combine } from './utils'


const minNumber = min => (ctx, next) => {
  const valid = value => type(value) === 'number' && value >= min

  return () => {
    const { value } = ctx

    if (type(value) !== 'number') {
      if (isRequired(ctx)) ctx.error = { expect: 'number', actual: type(value) }
      else if (unSetDefaulted(ctx, valid)) ctx.value = min
    } else if (value < min) {
      if (isRequired(ctx)) ctx.error = { expect: `greater than ${min}`, actual: value }
      else if (unSetDefaulted(ctx, valid)) ctx.value = min
    }

    if (!ctx.error) next()
  }
}

const minArray = min => (ctx, next) => {
  const valid = value => value.length >= min

  return () => {
    const { value } = ctx

    if (type(value) !== 'array') {
      if (isRequired(ctx)) ctx.error = { expect: 'array', actual: type(value) }
      else if (unSetDefaulted(ctx, valid)) ctx.value = new Array(min).fill(null)
    } else if (value.length < min) {
      if (isRequired(ctx, valid)) ctx.error = { expect: `length greater than ${min}`, actual: `length is ${value.length}`}
      else ctx.value = ctx.value.concat(new Array(min - ctx.value.length).fill(null))
    }

    if (!ctx.error) next()
  }
}

const minString = min => (ctx, next) => {
  const valid = value => value.length >= min

  return () => {
    const { value } = ctx

    if (type(value) !== 'string') {
      if (isRequired(ctx)) ctx.error = { expect: 'string', actual: type(value) }
      else if (unSetDefaulted(ctx, valid)) ctx.value = new Array(min).fill(' ').join('')
    } else if (value.length < min) {
      if (isRequired(ctx)) ctx.error = { expect: `length greater than ${min}`, actual: `length is ${value.length}` }
      else if (unSetDefaulted(ctx, valid)) {
        const arr = new Array(min - ctx.value.length)
        ctx.value = `${ctx.value}${arr.fill(' ').join('')}`
      }
    }

    if (!ctx.error) next()
  }
}

export default (min) => {
  if (type(min) !== 'number') throw typeError(`min(value) value must be a number, but get ${type(min)}`)

  return (ctx, next) => () => {
    if (!('type' in ctx)) combine(number, minNumber(min))(ctx, next)()
    else if (ctx.type === 'number') combine(number, minNumber(min))(ctx, next)()
    else if (ctx.type === 'array') combine(array, minArray(min))(ctx, next)()
    else if (ctx.type === 'string') combine(string, minString(min))(ctx, next)()
    else {
      warn('min should be call when type is array, string or number')
      if (!ctx.error) next()
    }
  }
}
