import { type, isRequired, unSetDefaulted } from './utils'


const valid = value => type(value) === 'boolean'
export default (next, context) => {
  context.type = 'boolean'

  return () => {
    const { value } = context

    if (type(value) !== 'boolean') {
      if (isRequired(context)) context.error = { expect: 'boolean', actual: type(value) }
      else if (unSetDefaulted(context, valid)) context.value = !!value
    }

    if (!context.error) next()
  }
}
