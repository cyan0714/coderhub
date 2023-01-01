import Router from 'koa-router'
import { momentController } from '../controller/moment.controller.js'
import { verifyAuth, verifyPermission } from '../middleware/auth.middleware.js'
const momentRouter = new Router({prefix: '/moment'})

momentRouter.post('/', verifyAuth, momentController.create)
momentRouter.get('/', momentController.list)
momentRouter.get('/:momentId', momentController.detail)

momentRouter.patch('/:momentId', verifyAuth, verifyPermission, momentController.update)
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, momentController.remove)

export {momentRouter}