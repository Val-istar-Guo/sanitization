import { type } from './utils'


export default (next, context) => {
  context.type = 'object'

  return () => {
    const { value } = context

    if (type(value) !== 'object') context.value = {}

    context.pass = true

    next()
  }
}
