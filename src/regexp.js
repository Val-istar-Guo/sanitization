import { type, serialize, typeError } from './utils'
import string from './string'


export default pattern => {
  if (!pattern || !(pattern instanceof RegExp)) typeError('regexp expect a param which instanceof RegExp')

  return serialize(string, (next, context) => () => {
    const { value } = context

    if (!pattern.test(value)) context.unexpect = true

    context.pass = true

    next();
  })
}
