import object from './object'
import { type, typeError, once, serialize, identify } from './utils'


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

      if (!ctx.pass) {
        context.pass = false;
        return
      }

      result[key] = ctx.value;
    }

    context.value = result;
    context.pass = true;
    next()
  })
}

export default keys;
