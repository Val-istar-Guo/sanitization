import { type, isRequired, unSetDefaulted } from './utils'


const valid = value => type(value) === 'object'
export default (next, context) => {
  context.type = 'object'

  return () => {
    const { value } = context

    if (!valid(value)) {
      if (isRequired(context, { expect: 'object', actual: type(value) })) return
      else if (unSetDefaulted(context, valid)) context.value = {}
    }

    if (!context.error) next()
  }
}
