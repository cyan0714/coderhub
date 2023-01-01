import Router from 'koa-router'
import { momentController } from '../controller/moment.controller.js'
import { verifyAuth } from '../middleware/auth.middleware.js'
const momentRouter = new Router({prefix: '/moment'})

momentRouter.post('/', verifyAuth, momentController.create)


export {momentRouter}