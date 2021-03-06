import { type, unSetDefaulted, isRequired, combine, typeError } from './utils'
import array from './array'
import string from './string'


const arrayLength = len => (ctx, next) => {
  const valid = value => value.length === len

  return () => {
    const { value } = ctx
    ctx.rules.push(`array.length shoule be ${len}`)

    if (!valid(value)) {
      if (isRequired(ctx)) ctx.error = true
      else if (unSetDefaulted(ctx, valid)) {
        if (value.length > len) ctx.value = value.slice(0, len)
        else ctx.value = value.concat(new Array(len - value.length).fill(null))
      }
    }

    next()
  }
}

const stringLength = len => (ctx, next) => {
  const valid = value => value.length === len

  return () => {
    const { value } = ctx
    ctx.rules.push(`string length should be ${len}`)

    if (!valid(value)) {
      if (isRequired(ctx)) ctx.error = true
      else if (unSetDefaulted(ctx, valid)) {
        if (value.length > len) {
          ctx.value = value.substr(0, len)
        } else {
          const arr = new Array(len - value.length)
          ctx.value = `${value}${arr.fill(' ').join('')}`
        }
      }
    }

    next()
  }
}

export default len => {
  if (type(len) !== 'number') throw typeError(`sa.length(len) len must be number, but get ${type(len)}`)

  return (ctx, next) => {
    return () => {
      if (!('type' in ctx)) {
        ctx.type === 'string'
        combine(string, stringLength(len))(ctx, next)()
      } else if (ctx.type === 'string') combine(string, stringLength(len))(ctx, next)()
      else if (ctx.type === 'array') combine(array, arrayLength(len))(ctx, next)()
      else {
        warn('sa.length should be call when type is string or array')
        if (!ctx.error) next()
      }
    }
  }
}
