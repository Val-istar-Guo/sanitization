import { type } from './utils'


export default (next, context) => {
  context.type = 'array'

  return () => {
    const { value } = context

    if (type(value) !== 'array') context.value = []

    context.pass = true

    next()
  }
}
