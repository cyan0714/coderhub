
class AuthController {
  async login(ctx, next) {
    const {username} = ctx.request.body;

    // 查询数据
    // const result = await userService.create(user)

    ctx.body = `登录成功, 欢迎${username}回来`
  }
}

export const authController = new AuthController();