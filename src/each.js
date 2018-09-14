import array from './array'
import keys from './keys'
import { type, combine, typeError, drive } from './utils'


export default validator => {
  if (type(validator) === 'object') validator = drive(keys(validator))
  if (type(validator) !== 'function') {
    throw typeError(`each expect rules should be function or object, but get ${type(validator)}`)
  }

  const each = (ctx, next) => {
    return () => {
      const result = []

      for (let item of ctx.value) {
        try {
          const value = validator(item)
          result.push(value)
        } catch (err) {
          ctx.error = err
          return
        }
      }

      ctx.value = result
      next()
    }
  }

  return combine(array, each)
}
