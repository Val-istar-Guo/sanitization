import { type, isRequired, unSetDefaulted } from './utils'


export default (next, context) => {
  context.type = 'array'

  return () => {
    const { value } = context

    if (type(value) !== 'array') {
      if (isRequired(context)) context.error = { expect: 'array', actual: type(value) }
      else if (unSetDefaulted(context)) context.value = []
    }

    if (!context.error) next()
  }
}
