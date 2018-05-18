import { type, isRequired, unSetDefaulted } from './utils'


export default (next, context) => {
  context.type = 'string'

  return () => {
    const { value } = context

    if (type(value) !== 'string') {
      if (isRequired(context)) context.error = { expect: 'string', actual: type(value) }
      else if (unSetDefaulted(context)) {
        if (type(value) === 'number') context.value = `${value}`
        else context.value = ''
      }
    }

    if (!context.error) next();
  }
}
