import { type } from './utils'


export default (next, context) => {
  context.type = 'number'

  return () => {
    let { value, origin } = context

    // if value is number-like string
    if (type(value) === 'string' && /^\d+(\.\d+)?$/) context.value = Number(value)
    else if (type(value) !== 'number') context.value = NaN

    context.pass = true
    next()
  }
}
