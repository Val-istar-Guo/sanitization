import { isRequired, unSetDefaulted } from './utils'


export default valid => (ctx, next) => () => {
  const { value } = ctx
  ctx.rules.push('conform to the validation function passed in by sa.expect')

  if (!valid(value)) {
    if (isRequired(ctx)) ctx.error = { expect: 'custom expect', actual: value }
    else if (unSetDefaulted(ctx, valid)) ctx.value = null
  }

  if (!ctx.error) next()
}
