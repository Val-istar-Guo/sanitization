import array from './array'
import keys from './keys'
import { type, serialize, typeError, once } from './utils'


export default validator => {
  if (type(validator) === 'object') validator = once(keys(validator))
  if (type(validator) !== 'function')
    throw typeError(`each expect rules should be function or object, but get ${type(validator)}`)

  return serialize(array, (next, context) => {
    return () => {
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
      next()
    }
  })
}
