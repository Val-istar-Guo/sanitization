const noop = () => {};


const getInitialCtx = () => ({
  value: null,
  whiteList: [],
  stack: [],
  error: null,
})

export default (before, after) => (value, ctx = getInitialCtx(), next = noop) => {
  return before(value, ctx, after(ctx, next));
}
