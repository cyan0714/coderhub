import { errorTypes } from "../constants/error-types.js";
import { userService } from "../service/user.service.js";

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

export {verifyUser}