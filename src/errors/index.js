const ERROR_STATUS_CODES = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNKNOWN: 500,
}

export const ERROR_TYPES = {
  BAD_REQUEST: 'BAD_REQUEST',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  UNKNOWN: 'UNKNOWN',
}

class CustomError extends Error {
  constructor(code, type, message){
    super()
    this.httpCode = code
    this.name = type
    this.message = message
  }
}

const handleError = (type, name, customMsg) => {
  switch (type) {
    case ERROR_TYPES.BAD_REQUEST:
      throw new CustomError(ERROR_STATUS_CODES[type], ERROR_TYPES[type], customMsg || `There is an error in the request`)
    case ERROR_TYPES.NOT_FOUND:
      throw new CustomError(ERROR_STATUS_CODES[type], ERROR_TYPES[type], `${name || 'Resource'} not found`)
    default:
      throw new CustomError(ERROR_STATUS_CODES.UNKNOWN, ERROR_TYPES.UNKNOWN, customMsg || `There was an unknown server error`)
  }
}

export default handleError