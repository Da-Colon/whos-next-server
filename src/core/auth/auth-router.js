import { Router } from 'express'
import { login } from './auth-controller'

const authRouter = Router()

authRouter.post('/', login)

export const auth = authRouter