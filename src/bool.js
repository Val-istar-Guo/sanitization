import { type } from './utils'


export default next => context => {
  const { value } = context

  if (type(value) !== 'boolean') context.value = !!value

  context.expect = 'boolean'
  return next(context)
}
