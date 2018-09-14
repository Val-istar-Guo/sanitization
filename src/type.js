import { type, typeError, isNumberLikeString } from './utils'
const validTypes = ['string', 'bool', 'boolean', 'number']

export default (customType) => {
  if (!validTypes.includes(customType)) typeError(`The valid type value contains ${validTypes.join(', ')}`)

  let formatType = customType
  if (customType === 'bool') formatType = 'boolean'

  return (ctx, next) => {
    ctx.format = value => {
      if (formatType === 'string') {
        if (type(value) === 'number') return `${value}`
        else if (type(value) === 'string') return value
        else return ''
      } else if (formatType === 'boolean') {
        return !!value
      } else if (formatType === 'number') {
        if (isNumberLikeString) return Number(value)
        else if (type(value) === 'number') return value
        else return 0
      }
    }
  }
}
