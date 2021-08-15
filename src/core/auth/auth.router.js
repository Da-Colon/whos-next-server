import { Router } from 'express'
import * as controller from './auth.controller'

const authRouter = Router()

authRouter.post('/', controller.login)
authRouter.get('/', controller.auth)

export const auth = authRouter