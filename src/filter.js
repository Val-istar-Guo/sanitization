import keys from './keys'
import array from './array'
import { identify, isObject, once } from './utils'



export default validator => {
  if (isObject(validator)) validator = once(keys(validator))
  if (typeof validator !== 'function') throw new Error()

  return next => context => {
    context = array(identify)(context)
    const { value } = context

    context.value = value.map(item => validator(item, false))
      .filter(({ pass }) => pass)
      .map(({ value }) => value)

    return next(context)
  }
}
