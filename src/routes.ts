import { Router } from 'express'
import UserController from './controllers/UserController'
import SessionController from './controllers/SessionController'

const router = Router()

const userController = new UserController()
const sessionController = new SessionController()

router.post('/users', userController.create)

router.post('/sessions', sessionController.create)

export default router