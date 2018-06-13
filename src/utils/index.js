export * from './errors'

export const warn = string => console.warn(`[Sanitization Warn] ${string}`)

export const identify = value => value;

export const type = value => {
  // array, object, number, string, boolean, function, null, undefined, NaN
  if (Array.isArray(value)) return 'array'
  else if (value === null) return 'null'
  else if (typeof value === 'number' && isNaN(value)) return 'NaN'

  return typeof value
}

export const once = func => value => {
  const context = { value, origin: value, error: null, whiteList: [] }
  func(identify, context)()
  return context
}

export const serialize = (a, b) => (next, context) => {
  return a(b(next, context), context)
}

export const isRequired = (context, error) => {
  if (context.required) {
    context.error = error
    return true
  }

  return false
}

export const unSetDefaulted = (context, valid) => {
  if ('defaultValue' in context) {
    context.value = context.defaultValue
    if (!valid(context.defaultValue)) warn(`The default value(${context.defaultValue}) is illegal.`)
    return false
  } else if ('whiteList' in context && type(context.whiteList) === 'array') {
    context.whiteList = context.whiteList.filter(valid)
    if (context.whiteList.length) {
      context.value = context.whiteList[0]
      return false
    }
  }

  return true
}
