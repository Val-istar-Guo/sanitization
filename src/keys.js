import object from './object'
import { type, typeError, once, serialize } from './utils'


const keys = rules => {
  rules = Object.entries(rules)
    .map(([key, validator]) => {
      if (type(validator) === 'object') validator = once(keys(validator))
      if (type(validator) !== 'function')
        throw typeError(`keys expect rules should be function or object, but ${key} is ${type(validator)}`)
      return [key, validator]
    })

  return serialize(object, (next, context) => () => {
    const { value } = context;

    const result = {};

    for (let [key, validator] of rules) {
      const ctx = validator(value[key], false);

      if (ctx.error) {
        context.error = ctx.error
        return
      }

      result[key] = ctx.value;
    }

    context.value = result;

    next()
  })
}

export default keys;
