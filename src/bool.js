import { type, isRequired, unSetDefaulted } from './utils'


export default (next, context) => {
  context.type = 'boolean'

  return () => {
    const { value } = context

    if (type(value) !== 'boolean') {
      if (isRequired(context)) context.error = { expect: 'boolean', actual: type(value) }
      else if (unSetDefaulted(context)) context.value = !!value
    }

    if (!context.error) next()
  }
}
