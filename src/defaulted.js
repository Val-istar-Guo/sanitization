import { warn, type, appError } from './utils';


const _ = {}
export default (defaultValue = _) => (next, context) => () => {
  const { value, origin, unexpect } = context;

  if (!('type' in context) && defaultValue === _) throw appError('defaulted should not be called individually')
  if (type(origin) === context.type && !unexpect) return next()

  if (type(defaultValue) !== context.type) {
    warn(`default value was expected to be typeof ${context.type} but get ${type(defaultValue)}`)
  }

  if (defaultValue !== _) context.value = defaultValue;

  context.pass = true;
  next()
}
