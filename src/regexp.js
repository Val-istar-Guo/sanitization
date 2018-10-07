import { combine, typeError, isRequired, unSetDefaulted } from './utils'
import string from './string'


export default pattern => {
  if (!pattern || !(pattern instanceof RegExp)) typeError('regexp expect a argument which instanceof RegExp')
  const valid = value => pattern.test(value)

  const regexp = (ctx, next) => () => {
    ctx.rules.push('conform to the regular expression passed in sa.regex')
    const { value } = ctx

    if (!valid(value)) {
      if (isRequired(ctx)) ctx.error = { expect: pattern, actual: value }
      // NOTE: cannot auto generate a string match pattern
      else if (unSetDefaulted(ctx, valid)) ctx.value = value
    }

    if (!ctx.error) next();
  }

  return combine(string, regexp)
}
