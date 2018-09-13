export default (ctx, next) => {
  ctx.required = true

  return () => next()
}
