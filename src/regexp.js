import { type, serialize, typeError, isRequired, unSetDefaulted } from './utils'
import string from './string'


export default pattern => {
  if (!pattern || !(pattern instanceof RegExp)) typeError('regexp expect a argument which instanceof RegExp')
  const valid = value => pattern.test(value)

  return serialize(string, (next, context) => () => {
    const { value } = context

    if (!valid(value)) {
      if (isRequired(context)) context.error = { expect: pattern, actual: value }
      // NOTE: cannot auto generate a string match pattern
      else if (unSetDefaulted(context, valid)) context.value = value
    }

    if (!context.error) next();
  })
}
