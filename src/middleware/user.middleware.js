import { errorTypes } from "../constants/error-types.js";
import { userService } from "../service/user.service.js";
import { md5password } from "../utils/password-handle.js";

const verifyUser = async (ctx, next) => {
  const { username, password } = ctx.request.body;

  if (!username || !password) {
    const error = new Error(errorTypes.USERNAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }

  // 判断用户是否被注册过
  const result = await userService.getUserByName(username)
  if (result.length > 0) {
    const error = new Error(errorTypes.USERNAME_ALREADY_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }

  await next()
}

const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body
  // password 必须为 string 类型
  ctx.request.body.password = md5password(password)

  await next()
}

export {verifyUser, handlePassword}