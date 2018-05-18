import { appError, type } from './utils';

export default (next, context) => {
  context.required = true

  return () => next()
}
