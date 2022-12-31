import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { userRouter } from '../router/user.router.js'
import { errorHandler } from './error-handler.js'

const app = new Koa()

app.use(bodyParser())
app.use(userRouter.allowedMethods())
app.use(userRouter.routes())
app.on('error', errorHandler)
export default app