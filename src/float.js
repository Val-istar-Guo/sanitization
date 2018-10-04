import { type, unSetDefaulted, isRequired, combine } from './utils'
import number from './number'
import string from './string'


const stringFloatHandler = (ctx, next) => {
  const valid = value => /^((\d+(.\d*)?)|(.\d+))$/.test(value)

  return () => {
    const { value } = ctx

    if (!valid(value)) {
      if (isRequired(ctx)) ctx.error = { expect: 'integer string', actual: value }
      else if (unSetDefaulted(ctx, valid)) {
        // number
        if (type(value) === 'number') ctx.value = `${Number(value)}`
        // other
        else ctx.value = ''
      }
    }

    if (!ctx.error) next()
  }
}

const numberFloatHandler = (ctx, next) => () => {
  // NOTE: sa.number is equal sa.float
  next()
}

export default (ctx, next) => () => {
  if (!('type' in ctx)) {
    ctx.type = 'number'
    combine(number, numberFloatHandler)(ctx, next)()
  } else if (ctx.type === 'number') combine(number, numberFloatHandler)(ctx, next)()
  else if (ctx.type === 'string') combine(string, stringFloatHandler)(ctx, next)()
  else {
    warn('float should be call when type is string or number')
    if (!ctx.error) next()
  }
}
