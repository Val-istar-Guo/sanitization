export default (ctx, error) => {
  if (ctx.required) {
    ctx.error = error
    return true
  }

  return false
}
