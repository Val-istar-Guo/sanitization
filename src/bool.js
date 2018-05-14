import { type } from './utils'


export default (next, context) => {
  context.type = 'boolean'

  return () => {
    const { value } = context

    if (type(value) !== 'boolean') context.value = !!value

    next()
  }
}
