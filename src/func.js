import { type, isRequired, unSetDefaulted } from './utils'


const valid = value => type(value) === 'function'
export default (ctx, next) => {
  ctx.type = 'function'

  return () => {
    ctx.rules.push('should be a function')
    const { value } = ctx

    if (!valid(value)) {
      if (isRequired(ctx)) ctx.error = { expect: 'function', actual: type(value) }
      else if (unSetDefaulted(ctx, valid)) ctx.value = () => {}
    }

    if (!ctx.error) next()
  }
}
