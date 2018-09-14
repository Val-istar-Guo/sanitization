import type from './type'


export default value => type(value) === 'string' && /^\d+(\.\d+)?$/
