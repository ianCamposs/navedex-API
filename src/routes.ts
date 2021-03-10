import { Router } from 'express'
import UserController from './controllers/UserController'
import SessionController from './controllers/SessionController'
import NaverController from './controllers/NaverController'
import verifyJWT from './middlewares/verifyJWT'

const router = Router()


const userController = new UserController()
const sessionController = new SessionController()
const naverController = new NaverController()

router.post('/users', userController.store)

router.post('/sessions', sessionController.store)

router.post('/navers', verifyJWT, naverController.store)
router.get('/navers', verifyJWT, naverController.index)
router.get('/navers/:id', verifyJWT, naverController.show)





export default router