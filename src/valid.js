import number from './number'
import bool from './bool'
import string from './string'
import object from './object'
import array from './array'
import { combine, isRequired, type, typeError, warn, unSetDefaulted } from './utils'


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

  const handler = (ctx, next) => {
    if (canPredict && !('type' in ctx)) ctx.type = perdictType
    if (!('defaultValue' in ctx)) ctx.defaultValue = enums[0]
    ctx.whiteList = ctx.whiteList.concat(enums);

    return () => {
      const { value } = ctx

      if (!valid(value)) {
        if (isRequired(ctx)) ctx.error = { expect: `one of [${enums.join(',')}]`, actual: value }
        else if (unSetDefaulted(ctx, valid)) ctx.value = ctx.defaultValue
      }

      if (!ctx.error) next()
    }
  }

  if (canPredict) {
    if (perdictType === 'number') return combine(number, handler)
    else if (perdictType === 'boolean') return combine(bool, handler)
    else if (perdictType === 'string') return combine(string, handler)
    else if (perdictType === 'object') return combine(object, handler)
    else if (perdictType === 'array') return combine(array, handler)
    else return handler
  } else return handler
}
