export default next => context => {
  const { value } = context;

  if (typeof value !== 'boolean') context.value = !!value;

  context.expect = 'boolean'
  return next(context);
}
