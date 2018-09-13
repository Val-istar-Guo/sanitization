import { type, isRequired, unSetDefaulted } from './utils'


const valid = value => type(value) === 'string'
export default (ctx, next) => {
  ctx.type = 'string'

  return () => {
    const { value } = ctx

    if (!valid(value)) {
      if (isRequired(ctx)) ctx.error = { expect: 'string', actual: type(value) }
      else if (unSetDefaulted(ctx, valid)) {
        if (type(value) === 'number') ctx.value = `${value}`
        else ctx.value = ''
      }
    }

    if (!ctx.error) next();
  }
}
