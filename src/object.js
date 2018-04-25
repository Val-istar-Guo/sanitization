import { type } from './utils'


export default next => context => {
  const { value } = context

  if (
    type(value) !== 'object' ||
    value === null ||
    Array.isArray(value)
  ) context.value = {}

  context.expect = 'object'
  context.pass = true
  return next(context)
}
