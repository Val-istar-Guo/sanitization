import object from './object'
import { identify, isObject, typeError, once } from './utils'


const props = rules => {
  rules = Object.entries(rules)
    .map(([key, validator]) => {
      if (isObject(validator)) validator = once(props(validator))
      if (typeof validator !== 'function')
        throw typeError(`props expect rules should be function or object, but ${key} is ${typeof validator}`)
      return [key, validator]
    })

  return next => context => {
    context = object(identify)(context);
    const { value } = context;

    const result = {};

    for (let [key, validator] of rules) {
      const ctx = validator(value[key], false);

      if (!ctx.pass) {
        context.pass = false;
        return context;
      }

      result[key] = ctx.value;
    }

    context.value = result;
    context.pass = true;
    return next(context)
  }
}

export default props;
