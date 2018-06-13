import { warn, type, appError, typeError } from './utils';


const _ = {}
export default (defaultValue = _) => (next, context) => {
  if (defaultValue === _) throw typeError('defaulted expect a argument')
  context.defaultValue =  defaultValue;

  () => next()
}
