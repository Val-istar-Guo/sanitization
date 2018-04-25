import { type } from './utils'


export default next => context => {
  let { value, origin } = context

  if (type(value) === 'string' || type(value) === 'boolean') context.value = Number(value)
  else if (type(value) !== 'number') context.value = NaN

  if (value === origin && type(value) === 'string' && value.length && !isNaN(context.value)) {
    context.origin = context.value
  }

  context.expect = 'number'
  context.pass = true
  return next(context)
}
