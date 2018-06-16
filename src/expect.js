import { isRequired, unSetDefaulted } from './utils'


export default valid => (next, context) => () => {
  const { value } = context

  if (!valid(value)) {
    if (isRequired(context)) context.error = { expect: 'custom expect', actual: value }
    else if (unSetDefaulted(context, valid)) context.value = null
  }

  if (!context.error) next()
}
