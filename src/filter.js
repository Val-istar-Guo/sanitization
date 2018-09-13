import keys from './keys'
import array from './array'
import { type, typeError, combine, drive } from './utils'


export default validator => {
  if (type(validator) === 'object') validator = drive(keys(validator))
  if (type(validator) !== 'function') throw typeError(`filter expect rules should be function or object, but get ${type(validator)}`)

  return combine(array, (ctx, next) => () => {
    ctx.value = ctx.value
      .map(item => {
        try {
          const value = validator(item)
          return { value }
        } catch (error) {
          return { error }
        }
      })
      .filter(({ error }) => !error)
      .map(({ value }) => value)

    next()
  })
}
