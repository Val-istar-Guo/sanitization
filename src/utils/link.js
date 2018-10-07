import genString from './genString'
const noop = () => {};


const getInitialCtx = () => ({
  value: null,
  whiteList: [],
  stack: [],
  rules: [],
  error: null,
  index: 0,

  get name() {
    // return `sa.${[...this.stack].reverse().join('.')}`
    const stack = [...this.stack]
      .reverse()
      .map(item => !item.args ? item.name : `${item.name}(${item.args})`)
      .join('.')

    return `sa.${stack}`
  }
})

export default (before, after, info) => (value, ctx = getInitialCtx(), next = noop) => {
  const index = ctx.stack.push(info)
  const then = after(ctx, next)
  return before(value, ctx, (...args) => {
    ctx.self = ctx.stack[index - 1]
    const rules = ctx.rules;

    if (ctx.error) rules[rules.length - 1] = `${rules[ctx.rules.length - 1]}(violate)`
    else then(...args)
  });
}
