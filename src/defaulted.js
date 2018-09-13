import { warn, type, appError, typeError } from './utils';


export default (...arg) => (ctx, next) => {
  if (!arg.length) throw typeError('defaulted expect a argument')
  ctx.defaultValue =  arg[0];

  return () => next()
}
