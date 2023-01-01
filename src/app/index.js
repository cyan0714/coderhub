import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { userRouter } from '../router/user.router.js'
import { authRouter } from '../router/auth.router.js'
import { errorHandler } from './error-handler.js'

const app = new Koa()

app.use(bodyParser())
app.use(userRouter.allowedMethods())
app.use(userRouter.routes())
app.use(authRouter.allowedMethods())
app.use(authRouter.routes())
app.on('error', errorHandler)
export default app