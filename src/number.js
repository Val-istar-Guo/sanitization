export default next => context => {
  let { value } = context

  if (typeof value !== 'number') {
    value = Number(value)
    if (isNaN(value)) value = 0
  }

  context.expect = 'number'
  context.value = value
  context.pass = true
  return next(context)
}
