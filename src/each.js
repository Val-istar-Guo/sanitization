import array from './array'
import keys from './keys'
import { type, combine, typeError, drive, genString } from './utils'


export default validator => {
  if (type(validator) === 'object') {
    validator = drive(keys(validator), { name: 'keys', args: [genString(validator)] })
  } else if (type(validator) !== 'function') {
    throw typeError(`each expect rules should be function or object, but get ${type(validator)}`)
  }

  const each = (ctx, next) => {
    return () => {
      const result = []

      // NOTE: .every can stop at anytime
      ctx.value.every((item, index) => {
        try {
          const value = validator(item)
          result.push(value)
          return true
        } catch (err) {
          err.path = `[${index}]${err.path}`
          ctx.self.args = err.name
          ctx.error = err
          return false
        }
      })

      ctx.value = result
      next()
    }
  }

  return combine(array, each)
}
