import handleError, { ERROR_TYPES } from "../../errors"
import User, { getUser, getUsers, saveUser, updateUser } from "../../models/users"
import { createUserPreference } from "../userPreference/userPreference.services"

export const create = async ( db, properties ) => {
  try {
    if(!properties.email) handleError(ERROR_TYPES.BAD_REQUEST, 'Email is Required')
    if(!properties.password) handleError(ERROR_TYPES.BAD_REQUEST, 'Password is Required')

    const template = User( db )
    const res = await saveUser( template, properties )
    if(res.user) {
      await createUserPreference(db, res.user)
    }
    return res
  } catch (e) {
    console.error(e)
    return {error: e}
  }
}

export const getAll = async ( db ) => {
  try {
    const template = User( db )
    const res = await getUsers( template )
    if(res) return res
  } catch (e) {
    console.error(e)
    return {error: e}
  }
}

export const getOne = async ( db, id ) => {
  try {
    if(!id || id.length < 5) return handleError(ERROR_TYPES.BAD_REQUEST)
    
    const template = User( db )
    const res = await getUser( template, id )
    return res
  } catch (e) {
    console.error(e)
    return {error: e}
  }
}

export const update = async ( db, id, properties ) => {
  try {
    if(!id || id.length < 5) handleError(ERROR_TYPES.BAD_REQUEST)
    const { email, password, first_name, last_name, permissions } = properties
    const props = {}

    // Add User Authenication
    if(email) props.email = email
    if(first_name) props.first_name = first_name
    if(last_name) props.last_name = last_name
    if(password) props.password = password

    // Add Admin Authenication
    if(permissions) props.permissions = permissions

    // handle no properties
    if(Object.keys(props).length === 0) handleError(ERROR_TYPES.BAD_REQUEST)

    const template = await User( db )
    const res = updateUser( template, id, props )
    return res
  } catch (e) {
    console.error(e)
    return {error: e}
  }
}