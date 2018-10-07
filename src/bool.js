import { type, isRequired, unSetDefaulted } from './utils'


const valid = value => type(value) === 'boolean'
export default (ctx, next) => {
  ctx.type = 'boolean'

  return () => {
    ctx.rules.push('should be expect')
    const { value } = ctx

    if (!valid(value)) {
      if (isRequired(ctx)) ctx.error = true
      else if (unSetDefaulted(ctx, valid)) ctx.value = !!value
    }

    if (!ctx.error) next()
  }
}
