import { type, isRequired, unSetDefaulted } from './utils'


const valid = value => type(value) === 'object'
export default (ctx, next) => {
  ctx.type = 'object'

  return () => {
    const { value } = ctx

    if (!valid(value)) {
      if (isRequired(ctx, { expect: 'object', actual: type(value) })) return
      else if (unSetDefaulted(ctx, valid)) ctx.value = {}
    }

    if (!ctx.error) next()
  }
}
