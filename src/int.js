import { unSetDefaulted, isRequired, combine } from './utils'
import number from './number'
import string from './string'


const stringIntHandler = (ctx, next) => {
  const valid = value => /^\d+$/.test(value)

  return () => {
    const { value } = ctx

    if (!valid(value)) {
      if (isRequired(ctx)) ctx.error = { expect: 'integer string', actual: value }
      else if (unSetDefaulted(ctx, valid)) {
        // float
        if (/^((\d+(\.\d*)?)|(\.\d+))$/.test(value)) ctx.value = `${Math.round(Number(value))}`
        // other
        else ctx.value = ''
      }
    }

    if (!ctx.error) next()
  }
}

const numberIntHandler = (ctx, next) => {
  const valid = value => value % 1 === 0

  return () => {
    const { value } = ctx

    if (!valid(value)) {
      if (isRequired(ctx)) ctx.error = { expect: 'integer', actual: value }
      else if (unSetDefaulted(ctx, valid)) ctx.value = Math.round(value)
    }

    if (!ctx.error) next()
  }
}


export default (ctx, next) => () => {
  if (!('type' in ctx)) {
    ctx.type === 'number'
    combine(number, numberIntHandler)(ctx, next)()
  } else if (ctx.type === 'number') combine(number, numberIntHandler)(ctx, next)()
  else if (ctx.type === 'string') combine(string, stringIntHandler)(ctx, next)()
  else {
    warn('int should be call when type is string or number')
    if (!ctx.error) next()
  }
}
