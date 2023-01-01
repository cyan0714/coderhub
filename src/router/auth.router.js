import Router from 'koa-router'
import { authController } from '../controller/auth.controller.js'
import { verifyLogin, verifyAuth } from '../middleware/auth.middleware.js'
const authRouter = new Router()

authRouter.post('/login', verifyLogin, authController.login)
authRouter.get('/test', verifyAuth, authController.success)


export {authRouter}