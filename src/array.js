import { type, isRequired, unSetDefaulted } from './utils'


const valid = value => type(value) === 'array'
export default (ctx, next) => {
  ctx.type = 'array'

  return () => {
    const { value } = ctx

    if (!valid(value)) {
      if (isRequired(ctx)) ctx.error = { expect: 'array', actual: type(value) }
      else if (unSetDefaulted(ctx, valid)) ctx.value = []
    }

    if (!ctx.error) next()
  }
}
