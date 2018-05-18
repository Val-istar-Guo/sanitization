import { type, isRequired, unSetDefaulted } from './utils'


export default (next, context) => {
  context.type = 'object'

  return () => {
    const { value } = context

    if (type(value) !== 'object') {
      if (isRequired(context, { expect: 'object', actual: type(value) })) return
      else if (unSetDefaulted(context)) context.value = {}
    }

    if (!context.error) next()
  }
}
