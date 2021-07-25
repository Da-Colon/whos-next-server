import { create as createUser, getOne as getUser, getAll as getUsers, update as updateUser } from "./users-services"

const create = async ( req, res ) => {
  try {
    const response = await createUser(req.db, req.body)

    if(response.error) return res.status(response.error.httpCode || 500).json({ message: response.error.message })
    return await res.status(200).json( response )
  } catch (e) {
    console.error(e)
    return res.status(e.httpCode || 500).json( e.message || e )
  }
}

const getAll = async ( req, res ) => {
  try {
    const response = await getUsers(req.db, req.body)

    if(response.error) return res.status(response.error.httpCode || 500).json({ message: response.error.message })
    return await res.status(200).json( response )
  } catch (e) {
    console.error(e)
    return res.status(e.httpCode || 500).json( e.message || e )
  }
}

const getOne = async ( req, res ) => {
  try {
    const { query: { id }} = req
    const response = await getUser(req.db, id)
    if(response.error) return res.status(response.error.httpCode || 500).json({ message: response.error.message })
    return res.status(200).json( { user: response } )

  } catch (e) {
    console.error(e)
    return res.status(e.httpCode || 500).json( e.message || e )
  }
}

const update = async ( req, res  ) => {
  try {
    const { query: { id }} = req
    const response = await updateUser(req.db, id, req.body)

    if(response.error) return res.status(response.error.httpCode || 500).json({ message: response.error.message })
    return await res.status(200).json( response )
  } catch (e) {
    console.error(e)
    return res.status(e.httpCode || 500).json( e.message || e )
  }
}

export default { create, getOne, getAll, update }