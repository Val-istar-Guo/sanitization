export default next => context => {
  const { value } = context

  if (
    typeof value !== 'object' ||
    value === null ||
    Array.isArray(value)
  ) context.value = {}

  context.expect = 'object'
  context.pass = true
  return next(context)
}
