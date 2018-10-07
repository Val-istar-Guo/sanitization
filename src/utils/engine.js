import { sanitizeError } from './errors'
import unique from './unique'


export default (value, ctx, next) => {
  ctx.value = value
  next()

  // ctx.rules = ctx.rules.map(rule => rule())
  ctx.rules = unique(ctx.rules)
    // .reverse()
    .map((rule, i) => `${i + 1}. ${rule}`)

  if (ctx.error) {
    if (ctx.error instanceof Error) throw sanitizeError(ctx.name, value, ctx.error.rules, ctx.error.path)
    else throw sanitizeError(ctx.name, value, ctx.rules)
  }

  return ctx.value
}
