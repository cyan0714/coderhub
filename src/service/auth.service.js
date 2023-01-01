import { connection } from "../app/database.js"

class AuthService {
  async checkMoment(momentId, userId) {
    try {
      const statement = `select * from moment where id = ? and user_id = ?;`
      const [result] = await connection.execute(statement, [momentId, userId])
      return result.length !== 0
    } catch (error) {
      console.log(error);
    }
  }
}

export const authService = new AuthService();