export const identify = value => value;

export const isObject = value =>
  value && typeof value === 'object' && !Array.isArray(value)

export const typeError = string => new TypeError(`[Sanitization Error] ${string}`)
export const appError = string => new Error(`[Sanitization Error] ${string}`)
export const warn = string => console.warn(`[Sanitization Warn] ${string}`)
export const type = value => {
  if (Array.isArray(value)) return 'array'
  else if (value === null) return 'null'
  else if (typeof value === 'number' && isNaN(value)) return 'NaN'

  return typeof value
}

export const once = func => value => func(identify)({ value })
