import { momentService } from "../service/moment.service.js"

class MomentController {
  async create(ctx, next) {
    const userId = ctx.user.id
    const content = ctx.request.body.content

    const result = await momentService.create(userId, content)
    ctx.body = "发表动态成功~"
  }

  async detail(ctx, next) {
    const momentId = ctx.params.momentId;

    const result = await momentService.getMomentById(momentId)
    ctx.body = result
  }

  async list(ctx, next) {
    const {offset, size} = ctx.query

    const result = await momentService.getMomentList(offset, size)
    ctx.body = result
  }
}

export const momentController = new MomentController