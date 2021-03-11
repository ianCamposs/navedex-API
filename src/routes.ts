import { Router } from 'express'
import UserController from './controllers/UserController'
import SessionController from './controllers/SessionController'
import NaverController from './controllers/NaverController'
import ProjectController from './controllers/ProjectController'
import verifyJWT from './middlewares/verifyJWT'

const router = Router()


const userController = new UserController()
const sessionController = new SessionController()
const naverController = new NaverController()
const projectController = new ProjectController()

router.post('/users', userController.store)

router.post('/sessions', sessionController.store)

router.post('/navers', verifyJWT, naverController.store)
router.get('/navers', verifyJWT, naverController.index)
router.get('/navers/:id', verifyJWT, naverController.show)
router.put('/navers', verifyJWT, naverController.update)
router.delete('/navers', verifyJWT, naverController.delete)

router.post('/projects', verifyJWT, projectController.store)

export default router