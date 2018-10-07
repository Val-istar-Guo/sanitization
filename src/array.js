import { type, isRequired, unSetDefaulted } from './utils'


const valid = value => type(value) === 'array'
export default (ctx, next) => {
  ctx.type = 'array'

  return () => {
    ctx.rules.push('should be array')
    const { value } = ctx

    if (!valid(value)) {
      if (isRequired(ctx)) ctx.error = true
      else if (unSetDefaulted(ctx, valid)) ctx.value = []
    }

    next()
  }
}
