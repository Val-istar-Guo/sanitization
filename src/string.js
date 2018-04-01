export default next => context => {
  const { value } = context

  if (typeof value === 'boolean' || typeof value === 'number') context.value = `${value}`
  else if (typeof value !== 'string') context.value = ''

  context.expect = 'string'
  context.pass = true

  return next(context);
}
