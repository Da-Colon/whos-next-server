import {root} from './root'
import {auth} from './auth'
import {users} from './users'

export const router = (app) => {
  app.use('/', root(app))
  app.use('/auth', auth)
  app.use('/users', users)
}