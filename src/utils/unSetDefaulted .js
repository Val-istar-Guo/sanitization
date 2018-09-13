import type from './type'


export default (ctx, valid) => {
  if ('defaultValue' in ctx) {
    ctx.value = ctx.defaultValue
    if (!valid(ctx.defaultValue)) warn(`The default value(${ctx.defaultValue}) is illegal.`)
    return false
  } else if ('whiteList' in ctx && type(ctx.whiteList) === 'array') {
    ctx.whiteList = ctx.whiteList.filter(valid)
    if (ctx.whiteList.length) {
      ctx.value = ctx.whiteList[0]
      return false
    }
  }

  return true
}
