import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { useRoutes } from '../router/index.js'
import { errorHandler } from './error-handler.js'

const app = new Koa()

app.use(bodyParser())
useRoutes(app)
app.on('error', errorHandler)
export default app