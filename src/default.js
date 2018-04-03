import { warn, type, appError } from './utils';


export default defaultValue => next => context => {
  const { value, expect, origin } = context;

  if (!expect) throw appError('default should not be called individually')
  if (type(origin) === expect) return next(context)

  if (expect && type(defaultValue) !== expect) {
    warn(`default value should be typeof ${expect} but get ${type(defaultValue)}`)
  }

  if (defaultValue !== undefined) context.value = defaultValue;

  context.pass = true;
  return next(context)
}
