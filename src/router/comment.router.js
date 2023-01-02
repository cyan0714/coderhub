import Router from 'koa-router'
import { verifyAuth, verifyPermission } from '../middleware/auth.middleware.js'

import { commentController } from '../controller/comment.controller.js'

const commentRouter = new Router({ prefix: '/comment' })

// 发表评论
commentRouter.post('/', verifyAuth, commentController.create)
commentRouter.post('/:commentId/reply', verifyAuth, commentController.reply)

// 修改评论
commentRouter.patch('/:commentId', verifyAuth, verifyPermission, commentController.update)
// 删除评论
commentRouter.delete('/:commentId', verifyAuth, verifyPermission, commentController.remove)

// 获取评论列表
commentRouter.get('/', commentController.list)

export { commentRouter }
