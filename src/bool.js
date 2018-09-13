import { type, isRequired, unSetDefaulted } from './utils'


const valid = value => type(value) === 'boolean'
export default (ctx, next) => {
  ctx.type = 'boolean'

  return () => {
    const { value } = ctx

    if (!valid(value)) {
      if (isRequired(ctx)) ctx.error = { expect: 'boolean', actual: type(value) }
      else if (unSetDefaulted(ctx, valid)) ctx.value = !!value
    }

    if (!ctx.error) next()
  }
}
