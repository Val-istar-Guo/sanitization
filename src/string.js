import { type, isRequired, unSetDefaulted } from './utils'


const valid = value => type(value) === 'string'
export default (next, context) => {
  context.type = 'string'

  return () => {
    const { value } = context

    if (!valid(value)) {
      if (isRequired(context)) context.error = { expect: 'string', actual: type(value) }
      else if (unSetDefaulted(context, valid)) {
        if (type(value) === 'number') context.value = `${value}`
        else context.value = ''
      }
    }

    if (!context.error) next();
  }
}
