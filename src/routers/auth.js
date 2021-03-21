import { Router } from 'express'
import { login, logout } from '../controllers/auth'
import { authenticate } from '../middleware'

const authRouter = Router()

authRouter.post('/', login)
authRouter.delete('/', authenticate, logout)

export const auth = authRouter