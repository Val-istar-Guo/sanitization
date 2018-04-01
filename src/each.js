import array from './array'
import props from './props'
import { identify, isObject, typeError, once } from './utils'


export default validator => {
  if (isObject(validator)) validator = once(props(validator))
  if (typeof validator !== 'function')
    throw typeError(`each expect rules should be function or object, but get ${typeof validator}`)

  return next => context => {
    context = array(identify)(context)
    const { value } = context

    const result = []

    for (let item of value) {
      const ctx = validator(item, false)

      if (!ctx.pass) {
        context.pass = false
        return context
      }

      result.push(ctx.value)
    }

    context.pass = true
    context.value = result
    return next(context)
  }
}

