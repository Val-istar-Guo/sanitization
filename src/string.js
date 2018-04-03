export default next => context => {
  const { value } = context

  if (typeof value === 'number' && !isNaN(value)) context.value = `${value}`
  else if (typeof value !== 'string') context.value = ''

  context.expect = 'string'
  context.pass = true

  return next(context);
}
