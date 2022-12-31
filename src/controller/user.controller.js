import { userService } from "../service/user.service.js";

class UserController {
  async create(ctx, next) {
    // 获取用户请求传递的参数
    const user = ctx.request.body;

    // 查询数据
    const result = await userService.create(user)

    ctx.body = result
  }
}

export const userController = new UserController();