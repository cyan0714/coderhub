import { connection } from "../app/database.js";

class MomentService {
  async create(userId, content) {
    const statement = `insert into moment (content, user_id) values (?, ?);`
    const result = await connection.execute(statement, [content, userId]);
    console.log('result: ', result);
    
    return result
  }

  async getMomentById(id) {
    const statement = `
      select
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name) user
      FROM moment m
      LEFT JOIN user u ON m.user_id = u.id
      WHERE m.id = ?;
    `
    const [result] = await connection.execute(statement, [id])

    return result[0]
  }
}

export const momentService = new MomentService()