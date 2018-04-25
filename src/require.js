import { appError, type } from './utils';

export default (validator) => next => context => {
  const { expect, value, origin } = context

  if (!expect && type(validator) !== 'function') {
    throw appError('require should not be called individually')
  }

  if (type(validator) === 'function' && !validator(origin)) {
    context.pass = false
    return context
  }

  if (expect && type(origin) !== expect) {
    context.pass = false
    return context
  }

  return next(context)
}
