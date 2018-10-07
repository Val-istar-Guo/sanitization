import type from './type'
export const typeError = string => new TypeError(`[Sanitization Error] ${string}`)
export const abnormalDataError = (expect, value) => new Error(`[Sanitization Fail Abnormal Data] expect ${expect}, but ${value}.`)



const formatInput = input => {
  switch(typeof input) {
    case 'string':
      return `'${input}'`
    case 'array':
      return `[${input.join(', ')}]`
    case 'object':
      return JSON.stringify(input)
    default:
      return input
  }
}


const genErrorMssage = (name, input, rules, prop = '') => `[Unable sanitize]
sanitize: ${name}
input: ${formatInput(input)}
prop: input${prop}
rules: ${rules.join('\n       ')}
`;

export const sanitizeError = (name, input, rules, prop) => {
  const error = new Error(genErrorMssage(name, input, rules, prop))

  error.name = name
  error.input = input
  error.rules = rules
  error.path = prop || ''

  return error
}
