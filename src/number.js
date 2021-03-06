import { type, isRequired, unSetDefaulted } from './utils'


const valid = value => type(value) === 'number'
export default (ctx, next) => {
  ctx.type = 'number'

  return () => {
    ctx.rules.push('shoule be number')
    let { value } = ctx

    if (!valid(value)) {
      if (isRequired(ctx)) ctx.error = { expect: 'number', actual: type(value) }
      else if (unSetDefaulted(ctx, valid)) {
        if (type(value) === 'string' && /^\d+(\.\d+)?$/.test(value)) ctx.value = Number(value)
        else ctx.value = NaN
      }
    }

    if (!ctx.error) next()
  }
}
