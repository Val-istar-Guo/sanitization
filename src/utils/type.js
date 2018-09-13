export default value => {
  // array, object, number, string, boolean, function, null, undefined, NaN
  if (Array.isArray(value)) return 'array'
  else if (value === null) return 'null'
  else if (typeof value === 'number' && isNaN(value)) return 'NaN'

  return typeof value
}
