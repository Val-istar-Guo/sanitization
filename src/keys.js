import object from './object'
import { _, type, typeError, drive, combine } from './utils'

const keys = rules => {
  rules = Object.entries(rules)
    .map(([key, validator]) => {
      if (type(validator) === 'object') validator = drive(keys(validator))
      if (type(validator) !== 'function')
        throw typeError(`keys expect rules should be function or object, but ${key} is ${type(validator)}`)
      return [key, validator]
    })

  const handler = (ctx, next) => () => {
    const result = {};

    for (let [key, validator] of rules) {
      try {
        const value = validator(ctx.value[key]);
        if (value !== undefined) result[key] = value;
      } catch (err) {
        console.log('key err: ', err)
        ctx.error = err
        return
      }
    }

    ctx.value = result;
    next()
  }

  return combine(object, handler)
}

export default keys
