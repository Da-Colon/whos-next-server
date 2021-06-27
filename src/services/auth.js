import jwt from "jsonwebtoken"
import handleError, { ERROR_TYPES } from "../errors"
import Token, { deleteToken, findToken, saveToken } from "../models/token"
import User, { lookupUser, getUser, validatePassword } from "../models/users"
import { getExpDate } from "../utils"

export const login = async (db, properties) => {
  const { email, password } = properties
  if(!email) return handleError(ERROR_TYPES.BAD_REQUEST, null, 'Email is required')
  if(!password) return handleError(ERROR_TYPES.BAD_REQUEST, null, 'Password is Required')

  try {
    const userTemplate = User(db)
    const tokenTemplate = Token(db)
    // Find User
    const response = await lookupUser(userTemplate, {email: email})
    if(response.error) {
      return response
    }
    // Check Password
    const isValid = validatePassword(password, response.password)
    if(!isValid) return handleError(ERROR_TYPES.BAD_REQUEST, null, 'Password is not valid')
    
    // Create Token
    const {TOKEN_EXPIRES_NUMBER, TOKEN_EXPIRES_UNIT, JWT_SECRET} = process.env
    const tokenExpiresIn = TOKEN_EXPIRES_NUMBER + " " + TOKEN_EXPIRES_UNIT
    const expirationDate = getExpDate(Number(TOKEN_EXPIRES_NUMBER))

    const token = await jwt.sign({ email }, JWT_SECRET, { expiresIn: tokenExpiresIn})
    
    // Save Token
    const properties = {token: token, response: response.id, expirationDate: expirationDate}
    await saveToken(tokenTemplate, properties)

    // Return token
    return {user: response, token: token, expirationDate: expirationDate}
  } catch (e) {
    console.error(e)
    return {error: e}
  }

}

export const auth = async (db, token) => {
  try {
    if(!token || token.length < 5) return handleError(ERROR_TYPES.BAD_REQUEST, null, "Not logged in")
    const tokenStringArray = token.split(' ')
  
    const userTemplate = User(db)
    const tokenTemplate = Token(db)

    const tokenObj = await findToken(tokenTemplate, tokenStringArray[1])
    if(!tokenObj.id) return handleError(ERROR_TYPES.UNAUTHORIZED, null, 'Invalid authorization')
    
    // reject expired token
    if(new Date().valueOf() >= new Date(tokenObj.expirationDate).valueOf()) {
      const response = await deleteToken(tokenTemplate, tokenObj.id, token)
      if(response.message !== 'ok!') return handleError(ERROR_TYPES.UNAUTHORIZED, null, 'Authorization expired')
    }

    // get and return response
    const response = await getUser(userTemplate, tokenObj.response)
    if(!response.id) return handleError(ERROR_TYPES.UNKNOWN, null, 'There was a database error')
    return response
  
  } catch (e) { 
    console.error(e)
    return {error: e}
  }
}