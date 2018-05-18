import { type, serialize, typeError, isRequired, unSetDefaulted } from './utils'
import string from './string'


export default pattern => {
  if (!pattern || !(pattern instanceof RegExp)) typeError('regexp expect a param which instanceof RegExp')

  return serialize(string, (next, context) => () => {
    const { value } = context

    if (!pattern.test(value)) {
      if (isRequired(context)) context.error = { expect: pattern, actual: value }
      // NOTE: cannot auto generate a string match pattern
      else if (unSetDefaulted(context)) context.value = value
    }

    if (!context.error) next();
  })
}
