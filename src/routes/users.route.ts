import { Router } from 'express'
import { authenticate } from './../middlewares/authenticate.middleware'
import * as controller from '../controllers/users.controller'

export const users = Router()

users.get('/', authenticate(['standard']), controller.getUsers)
users.put('/', authenticate(['standard']), controller.updateUser)
// users.delete('/', authenticate(['standard']), controller.removeUser)
