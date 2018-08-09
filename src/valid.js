import number from './number'
import bool from './bool'
import string from './string'
import object from './object'
import array from './array'
import { serialize, isRequired, type, typeError, warn, unSetDefaulted } from './utils'


// OPTIMIZE: object, array need deep equal
export default enums => {
  if (type(enums) === 'object') enums = Object.values(enums)
  else if (type(enums) !== 'array' || !enums.length) {
    throw typeError('enum expect a non-null array or object as a parameter')
}

  const types = enums.map(type)
  const perdictType = types[0]
  const canPredict = types.every(item => item === perdictType)
  const valid = value => enums.includes(value)

  if (!canPredict) {
    warn('The types of enumerated values in enmu are inconsistent.')
  }

  const func = (next, context) => {
    if (canPredict && !('type' in context)) context.type = perdictType
    if (!('defaultValue' in context)) context.defaultValue = enums[0]
    context.whiteList = context.whiteList.concat(enums);

    return () => {
      const { value } = context

      if (!valid(value)) {
        if (isRequired(context)) context.error = { expect: `one of [${enums.join(',')}]`, actual: value }
        else if (unSetDefaulted(context, valid)) context.value = context.defaultValue
      }

      if (!context.error) next()
    }
  }

  if (canPredict) {
    if (perdictType === 'number') return serialize(number, func)
    else if (perdictType === 'boolean') return serialize(bool, func)
    else if (perdictType === 'string') return serialize(string, func)
    else if (perdictType === 'object') return serialize(object, func)
    else if (perdictType === 'array') return serialize(array, func)
    else return func
  } else return func
}
