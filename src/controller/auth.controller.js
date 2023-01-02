import jwt from 'jsonwebtoken'
import { PRIVATE_KEY } from '../app/config.js';
class AuthController {
  async login(ctx, next) {
    const { id, name } = ctx.user;
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256'
    })

    ctx.body = {
      id,
      name,
      token,
    }
  }

  async success(ctx, next) {
    ctx.body = "授权成功~"
  }
}

export const authController = new AuthController();