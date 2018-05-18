import keys from './keys'
import array from './array'
import { type, typeError, serialize, once } from './utils'


export default validator => {
  if (type(validator) === 'object') validator = once(keys(validator))
  if (type(validator) !== 'function') throw typeError(`filter expect rules should be function or object, but ${key} is ${type(validator)}`)

  return serialize(array, (next, context) => () => {
    context.value = context.value.map(item => validator(item, false))
      .filter(({ error }) => !error)
      .map(({ value }) => value)

    next()
  })
}
