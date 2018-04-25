import { type } from './utils'


export default next => context => {
  const { value } = context

  if (type(value) === 'number' && !isNaN(value)) context.value = `${value}`
  else if (type(value) !== 'string') context.value = ''

  context.expect = 'string'
  context.pass = true

  return next(context);
}
