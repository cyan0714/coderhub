import { connection } from "../app/database.js";

class MomentService {
  async create(userId, content) {
    const statement = `insert into moment (content, user_id) values (?, ?)`
    const result = await connection.execute(statement, [content, userId]);
    console.log('result: ', result);
    
    return result
  }
}

export const momentService = new MomentService()