import { type } from './utils'


const valid = value => type(value) === 'function'
export default (next, context) => {
  context.type = 'function'

  return () => {
    const { value } = context

    if (!valid(value)) {
      if (isRequired(context)) context.error = { expect: 'function', actual: type(value) }
      else if (unSetDefaulted(context, valid)) context.value = () => {}
    }

    if (!context.error) next()
  }
}
