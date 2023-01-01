import { connection } from "../app/database.js";

const sqlFragment = `
  select
  m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
  JSON_OBJECT('id', u.id, 'name', u.name) user
  FROM moment m
  LEFT JOIN user u ON m.user_id = u.id
`
class MomentService {
  async create(userId, content) {
    const statement = `insert into moment (content, user_id) values (?, ?);`
    const result = await connection.execute(statement, [content, userId]);
    console.log('result: ', result);
    
    return result
  }

  async getMomentById(id) {
    const statement = `
      ${sqlFragment}
      WHERE m.id = ?;
    `
    const [result] = await connection.execute(statement, [id])

    return result[0]
  }

  async getMomentList(offset, size) {
    const statement = `
      ${sqlFragment}
      LIMIT ?, ?;
    `
    const [result] = await connection.execute(statement, [offset, size])

    return result
  }

  async update(content, momentId) {
    const statement = `update moment set content = ? where id = ?;`
    const [result] = await connection.execute(statement, [content, momentId])

    return result
  }

  async remove(momentId) {
    const statement = `delete from moment where id = ?;`
    const [result] = await connection.execute(statement, [momentId])

    return result
  }
}

export const momentService = new MomentService()