import Router from 'koa-router'
import { userController } from '../controller/user.controller.js'
import { verifyUser, handlePassword } from '../middleware/user.middleware.js'
const userRouter = new Router({prefix: '/users'})

userRouter.post('/', verifyUser, handlePassword, userController.create)


export {userRouter}