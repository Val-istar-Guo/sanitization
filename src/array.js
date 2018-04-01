export default next => context => {
  const { value } = context

  if (!Array.isArray(value)) context.value = []

  context.expect = 'array'
  context.pass = true
  return next(context)
}
