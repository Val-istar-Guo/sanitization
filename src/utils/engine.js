import { appError } from './errors'

export default (value, ctx, next) => {
  ctx.value = value
  next()

  if (!ctx.error) return ctx.value
  else throw appError(`unexpect value: ${value}`)
}
