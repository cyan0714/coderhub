import jwt from 'jsonwebtoken'
import { userService } from "../service/user.service.js";
import { authService } from '../service/auth.service.js';
import { errorTypes } from "../constants/error-types.js";
import { md5password } from "../utils/password-handle.js";
import { PUBLIC_KEY } from '../app/config.js';

const verifyLogin = async (ctx, next) => {
  // 1. 获取用户名和密码
  const { username, password } = ctx.request.body; 

  // 2. 判断用户名和密码是否为空
  if (!username || !password) {
    const error = new Error(errorTypes.USERNAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }

  // 3. 判断用户是否存在
  const result = await userService.getUserByName(username)
  const user = result[0]
  if (!user) {
    const error = new Error(errorTypes.USERNAME_DOES_NOT_EXIST)
    return ctx.app.emit('error', error, ctx)
  }
    
  // 4. 判断密码是否正确
  if (md5password(password) !== user.password) {
    const error = new Error(errorTypes.PASSWORD_ERROR)
    return ctx.app.emit('error', error, ctx)
  }

  ctx.user = user
  await next()
}

const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization
  if (!authorization) {
    const error = new Error(errorTypes.UNAUTHORIZATION)
    return ctx.app.emit('error', error, ctx)
  }
  const token = authorization.replace('Bearer ', '')

  // 验证 token(id/name/iot/exp)
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"]
    })
    ctx.user = result
    await next()
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION)
    ctx.app.emit('error', error, ctx)
  }
}

const verifyPermission = async (ctx, next) => {
  // 1.获取参数 { commentId: '1' }
  const [resourceKey] = Object.keys(ctx.params);
  const tableName = resourceKey.replace('Id', '');
  const resourceId = ctx.params[resourceKey];
  const { id } = ctx.user;

  // 2.查询是否具备权限
  try {
    const isPermission = await authService.checkResource(tableName, resourceId, id);
    if (!isPermission) throw new Error();
    await next();
  } catch (err) {
    const error = new Error(errorTypes.UNPERMISSION);
    return ctx.app.emit('error', error, ctx);
  }
}

export {verifyLogin, verifyAuth, verifyPermission}