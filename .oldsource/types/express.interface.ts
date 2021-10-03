import express from 'express'
import { Database } from './database.interface'
import { User } from './models.interface'

export type Request = express.Request & {db: Database, user: User}