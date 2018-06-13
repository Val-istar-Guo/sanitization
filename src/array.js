import { type, isRequired, unSetDefaulted } from './utils'


const valid = value => type(value) === 'array'
export default (next, context) => {
  context.type = 'array'

  return () => {
    const { value } = context

    if (!valid(value)) {
      if (isRequired(context)) context.error = { expect: 'array', actual: type(value) }
      else if (unSetDefaulted(context, valid)) context.value = []
    }

    if (!context.error) next()
  }
}
