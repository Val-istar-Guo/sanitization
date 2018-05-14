import { type } from './utils'


export default (next, context) => {
  context.type = 'string'

  return () => {
    const { value } = context

    if (type(value) === 'number') context.value = `${value}`
    else if (type(value) !== 'string') context.value = ''

    context.pass = true

    next();
  }
}
