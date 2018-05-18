export const typeError = string => new TypeError(`[Sanitization Error] ${string}`)
export const appError = string => new Error(`[Sanitization Error] ${string}`)
export const abnormalDataError = (expect, value) => new Error(`[Sanitization Fail Abnormal Data] expect ${expect}, but ${value}.`)
