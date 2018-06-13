import { type, isRequired, unSetDefaulted } from './utils'


const valid = value => type(value) === 'number'
export default (next, context) => {
  context.type = 'number'

  return () => {
    let { value } = context

    if (!valid(value)) {
      if (isRequired(context)) context.error = { expect: 'number', actual: type(value) }
      else if (unSetDefaulted(context, valid)) {
        if (type(value) === 'string' && /^\d+(\.\d+)?$/) context.value = Number(value)
        else context.value = NaN
      }
    }

    if (!context.error) next()
  }
}
