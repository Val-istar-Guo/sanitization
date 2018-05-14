import { appError, type } from './utils';

export default (validator) => (next, context) => {
  return () => {
    const { value, origin, unexpect } = context

    if (!('type' in context) && type(validator) !== 'function') {
      throw appError('required should not be called individually')
    }

    if (type(validator) === 'function' && !validator(origin)) {
      context.pass = false
      return
    }

    if (type(origin) !== context.type || unexpect) context.pass = false
    else next()
  }
}
