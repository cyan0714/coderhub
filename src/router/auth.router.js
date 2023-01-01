import Router from 'koa-router'
import { authController } from '../controller/auth.controller.js'
import { verifyLogin, } from '../middleware/auth.middleware.js'
const authRouter = new Router({prefix: '/login'})

authRouter.post('/', verifyLogin, authController.login)


export {authRouter}