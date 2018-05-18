import { type, isRequired, unSetDefaulted } from './utils'


export default (next, context) => {
  context.type = 'number'

  return () => {
    let { value, origin } = context

    if (type(value) !== 'number') {
      if (isRequired(context)) context.error = { expect: 'number', actual: type(value) }
      else if (unSetDefaulted(context)) {
        if (type(value) === 'string' && /^\d+(\.\d+)?$/) context.value = Number(value)
        else context.value = NaN
      }
    }

    if (!context.error) next()
  }
}
