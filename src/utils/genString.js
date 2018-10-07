import type from './type'


const genString = value => {
  switch(type(value)) {
    case 'string':
      return `'${value}'`
    case 'array':
      return formatArray(value)
    case 'object':
      return formatObject(value)
    default:
      return value
  }
}

const formatObject = obj => {
  const props = Object.entries(obj)
    .map(([key, value]) => `${key}: ${genString(value)},`)
    .join('\n')

  return `{\n${props}\n}`
}

const formatArray = arr => arr.map(genString).join(', ')

export default genString;
