export default next => context => {
  let { value, origin } = context

  if (value === origin && typeof value === 'string' && value.length) {
    value = Number(value)

    // NOTE: if origin is number-like string, treat it as a number.
    if (isNaN(value)) value = 0
    else context.origin = value
  }
  if (typeof value !== 'number') {
    value = Number(value)
    if (isNaN(value)) value = 0
  }

  context.expect = 'number'
  context.value = value
  context.pass = true
  return next(context)
}
