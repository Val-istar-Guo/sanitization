export default next => context => {
  let { value, origin } = context

  if (typeof value === 'string' || typeof value === 'boolean') context.value = Number(value)
  else if (typeof value !== 'number') context.value = NaN

  if (value === origin && typeof value === 'string' && value.length && !isNaN(context.value)) {
    context.origin = context.value
  }

  context.expect = 'number'
  context.pass = true
  return next(context)
}
