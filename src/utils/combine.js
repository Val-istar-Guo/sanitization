export default (before, after) => (ctx, next) => {
  return before(ctx, after(ctx, next))
}
