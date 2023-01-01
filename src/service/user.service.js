import { connection } from "../app/database.js";

class UserService {
  async create(user) {
    const {username, password} = user
    const statement = `insert into user (name, password) values (?, ?);`
    const result = await connection.execute(statement, [username, password])

    return result
  }

  async getUserByName(name) {
    const statement = `select * from user where name = ?;`
    const result = await connection.execute(statement, [name])

    return result[0]
  }
}

export const userService = new UserService();