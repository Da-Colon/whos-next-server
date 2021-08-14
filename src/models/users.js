import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { validate as validEmail } from 'email-validator'
import handleError, { ERROR_TYPES } from '../errors'

export const lookupUser = async ( template, query) => {
  try {
    const response = await template.findOne(query)
    if(!response) return handleError(ERROR_TYPES.NOT_FOUND, 'User')
    return response
  } catch (e) {
    console.error(e)
    return { error: e }
  }
}

export const saveUser = async ( template, properties ) => {
  try {
    const response = await template.create(properties)
    if(!response) handleError(ERROR_TYPES.UNKNOWN, null, 'There was an database error')
    return { message: "User has been registered", user: response }
  } catch (e) {
    console.error(e)
    return { error: e }
  }
}

export const getUsers = async ( template ) => {
  try {
    const res = await template.find()
    if(res.length <= 0) handleError(ERROR_TYPES.NOT_FOUND, 'Users')
    return res
  } catch (e) {
    console.error(e)
    return { error: e }
  }
}

export const getUser = async ( template, userId ) => {
  try {
    const res = await template.findOne( {_id: userId} )
    if(!res) handleError(ERROR_TYPES.NOT_FOUND, 'User')
    return res
  } catch (e) {
    console.error(e)
    return { error: e }
  }
}

export const updateUser = async ( template, id, properties ) => {
  try {
    const res = await template.updateOne({ _id: id }, properties )
    if(!res) handleError(ERROR_TYPES.UNKNOWN, null, 'There was an database error')
    return { message: "User has been updated" }
  } catch (e) {
    console.error(e)
    return { error: e }
  }
}

const permissionSchema = { admin: { type: Boolean, default: false }, instructor: { type: Boolean, default: false }}
const emailSchema = { type: String, required: false, unique: true, set: v => v.toLowerCase(), validate: { validator: v => validEmail(v), message: 'email invalid format' } }
const passwordSchema = { type: String, required: false, set: v => generatePassword(v) }
// generate password hash
const generatePassword = password => {
  const salt = bcrypt.genSaltSync(parseInt(process.env.BCRYPT_COST, 10))
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

// validate password
export const validatePassword = (providedPassword, password) => {
  return bcrypt.compare(providedPassword, password)
}

const UserSchema = new mongoose.Schema(
  {
    permissions: permissionSchema,
    email: emailSchema,
    password: passwordSchema,
  }, {
    toJSON: {
      transform: (_, ret) => {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
        delete ret.password
      }
   }
  }
)

export const User = db => db.model('User', UserSchema)

export default User
