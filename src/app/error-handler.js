import { errorTypes } from '../constants/error-types.js'

export const errorHandler = (error, ctx) => {
  let status, message

  switch (error.message) {
    case errorTypes.USERNAME_OR_PASSWORD_IS_REQUIRED:
      status = 400 // Bad Request
      message = '用户名或者密码不能为空~'
      break
    case errorTypes.USERNAME_ALREADY_EXISTS:
      status = 409 // conflict
      message = '用户名已存在~'
      break
    default:
      status = 404
      message = 'NOT FOUND'
      break
  }
  
  ctx.status = status
  ctx.body = message
}