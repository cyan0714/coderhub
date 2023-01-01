import { userService } from "../service/user.service.js";
import { errorTypes } from "../constants/error-types.js";
import { md5password } from "../utils/password-handle.js";

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

  await next()
}

export {verifyLogin}