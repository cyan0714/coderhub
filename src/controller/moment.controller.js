import { momentService } from "../service/moment.service.js"

class MomentController {
  async create(ctx, next) {
    const userId = ctx.user.id
    const content = ctx.request.body.content

    const result = await momentService.create(userId, content)
    console.log('result: ', result);
    ctx.body = "发表动态成功~"
    // 将数据插入数据库里

  }
}

export const momentController = new MomentController