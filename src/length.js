import array from './array'
import { identify, appError } from './utils'


export default (min, max) => {
  if (max && max < min)
    throw appError(`length(min, max), max(${max}) should greater than min(${min})`)

  return next => context => {
    context = array(identify)(context)

    const { value } = context;

    if (value.length < min) {
      const filler = new Array(min - value.length).fill(null)
      value.push(...filler)
    }

    if (max && value.length > max) {
      context.value = value.slice(0, max)
    }

    context.pass = true
    return next(context)
  }
}
