import { warn, type, appError, typeError } from './utils';


export default (...arg) => (next, context) => {
  if (!arg.length) throw typeError('defaulted expect a argument')
  context.defaultValue =  arg[0];

  () => next()
}
